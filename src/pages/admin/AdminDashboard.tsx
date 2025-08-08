import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Package, 
  DollarSign, 
  TrendingUp,
  Calendar,
  Clock,
  CheckCircle,
  XCircle 
} from 'lucide-react';

interface DashboardStats {
  totalUsers: number;
  totalApps: number;
  totalRevenue: number;
  monthlyGrowth: number;
}

interface RecentSale {
  id: string;
  app_name: string;
  user_email: string;
  amount: number;
  plan_name: string;
  created_at: string;
}

const AdminDashboard = () => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalApps: 0,
    totalRevenue: 0,
    monthlyGrowth: 0
  });
  const [recentSales, setRecentSales] = useState<RecentSale[]>([]);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    if (!loading && (!user || profile?.role !== 'admin')) {
      navigate('/');
      return;
    }

    if (user && profile?.role === 'admin') {
      fetchDashboardData();
    }
  }, [user, profile, loading, navigate]);

  const fetchDashboardData = async () => {
    try {
      // Fetch user count
      const { count: userCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Fetch app count
      const { count: appCount } = await supabase
        .from('apps')
        .select('*', { count: 'exact', head: true });

      // Fetch total revenue
      const { data: revenueData } = await supabase
        .from('orders')
        .select('amount')
        .eq('status', 'paid');

      const totalRevenue = revenueData?.reduce((sum, order) => sum + (order.amount || 0), 0) || 0;

      // Fetch recent sales with proper joins - fix the type issue
      const { data: salesData } = await supabase
        .from('orders')
        .select(`
          id,
          amount,
          created_at,
          apps(name),
          pricing_plans(name),
          profiles(full_name)
        `)
        .eq('status', 'paid')
        .order('created_at', { ascending: false })
        .limit(5);

      // Transform the data properly
      const transformedSales = salesData?.map(sale => ({
        id: sale.id,
        app_name: (sale.apps as any)?.name || 'Unknown App',
        user_email: (sale.profiles as any)?.full_name || 'Unknown User',
        amount: sale.amount,
        plan_name: (sale.pricing_plans as any)?.name || 'Unknown Plan',
        created_at: sale.created_at
      })) || [];

      setRecentSales(transformedSales);

      setStats({
        totalUsers: userCount || 0,
        totalApps: appCount || 0,
        totalRevenue,
        monthlyGrowth: 12.5
      });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoadingStats(false);
    }
  };

  if (loading || loadingStats) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user || profile?.role !== 'admin') {
    return null;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {profile?.full_name || user.email}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              Registered users
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Apps</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalApps}</div>
            <p className="text-xs text-muted-foreground">
              Published applications
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              All-time revenue
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{stats.monthlyGrowth}%</div>
            <p className="text-xs text-muted-foreground">
              vs last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions and Recent Sales */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              onClick={() => navigate('/admin/apps')} 
              className="w-full justify-start"
              variant="outline"
            >
              <Package className="mr-2 h-4 w-4" />
              Manage Apps
            </Button>
            <Button 
              onClick={() => navigate('/admin/users')} 
              className="w-full justify-start"
              variant="outline"
            >
              <Users className="mr-2 h-4 w-4" />
              Manage Users
            </Button>
            <Button 
              onClick={() => navigate('/admin/updates')} 
              className="w-full justify-start"
              variant="outline"
            >
              <Clock className="mr-2 h-4 w-4" />
              Send Updates
            </Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>Latest purchases and subscriptions</CardDescription>
          </CardHeader>
          <CardContent>
            {recentSales.length > 0 ? (
              <div className="space-y-3">
                {recentSales.map((sale) => (
                  <div key={sale.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="space-y-1">
                      <p className="font-medium">{sale.app_name}</p>
                      <p className="text-sm text-muted-foreground">
                        {sale.user_email} • {sale.plan_name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">${sale.amount}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(sale.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-4">No recent sales</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
