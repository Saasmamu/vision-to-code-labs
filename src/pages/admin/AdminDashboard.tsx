import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { 
  Users, 
  Package, 
  TrendingUp, 
  DollarSign, 
  Activity,
  Eye,
  Download,
  Star
} from "lucide-react";

interface DashboardStats {
  totalUsers: number;
  totalApps: number;
  monthlyRevenue: number;
  activeSubscriptions: number;
  totalDownloads: number;
  avgRating: number;
}

interface RecentSale {
  id: string;
  app_name: string;
  user_email: string;
  amount: number;
  plan_name: string;
  created_at: string;
}

interface TopApp {
  name: string;
  downloads: number;
  revenue: number;
  rating: number;
}

const AdminDashboard = () => {
  const { profile } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalApps: 0,
    monthlyRevenue: 0,
    activeSubscriptions: 0,
    totalDownloads: 0,
    avgRating: 0
  });
  const [recentSales, setRecentSales] = useState<RecentSale[]>([]);
  const [topApps, setTopApps] = useState<TopApp[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (profile?.role === 'admin') {
      fetchDashboardData();
    }
  }, [profile]);

  const fetchDashboardData = async () => {
    try {
      // Fetch stats
      const [usersCount, appsCount, ordersData, userAppsCount] = await Promise.all([
        supabase.from('profiles').select('id', { count: 'exact' }),
        supabase.from('apps').select('id, downloads, rating', { count: 'exact' }),
        supabase.from('orders').select('amount, created_at').eq('status', 'paid'),
        supabase.from('user_apps').select('id', { count: 'exact' }).eq('status', 'active')
      ]);

      const totalUsers = usersCount.count || 0;
      const totalApps = appsCount.count || 0;
      const activeSubscriptions = userAppsCount.count || 0;
      
      const currentMonth = new Date();
      currentMonth.setDate(1);
      const monthlyOrders = ordersData.data?.filter(order => 
        new Date(order.created_at) >= currentMonth
      ) || [];
      const monthlyRevenue = monthlyOrders.reduce((sum, order) => sum + order.amount, 0);
      
      const totalDownloads = appsCount.data?.reduce((sum, app) => sum + (app.downloads || 0), 0) || 0;
      const avgRating = appsCount.data?.length ? 
        appsCount.data.reduce((sum, app) => sum + (app.rating || 0), 0) / appsCount.data.length : 0;

      setStats({
        totalUsers,
        totalApps,
        monthlyRevenue,
        activeSubscriptions,
        totalDownloads,
        avgRating: Number(avgRating.toFixed(1))
      });

      // Fetch recent sales - Fixed the data access
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

      setRecentSales(salesData?.map(sale => ({
        id: sale.id,
        app_name: sale.apps?.name || 'Unknown App',
        user_email: sale.profiles?.full_name || 'Unknown User',
        amount: sale.amount,
        plan_name: sale.pricing_plans?.name || 'Unknown Plan',
        created_at: sale.created_at
      })) || []);

      // Fetch top apps
      const { data: topAppsData } = await supabase
        .from('apps')
        .select('name, downloads, rating')
        .eq('status', 'active')
        .order('downloads', { ascending: false })
        .limit(4);

      setTopApps(topAppsData?.map(app => ({
        name: app.name,
        downloads: app.downloads || 0,
        rating: app.rating || 0,
        revenue: 0 // This would need to be calculated from orders
      })) || []);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (profile?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-6 pt-24 pb-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
            <p className="text-muted-foreground">You don't have permission to access this page.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-6 pt-24 pb-12">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your SaaS marketplace and monitor performance
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-neon-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Apps</CardTitle>
              <Package className="h-4 w-4 text-neon-green" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalApps}</div>
              <p className="text-xs text-muted-foreground">+3 new this month</p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.monthlyRevenue.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+25% from last month</p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
              <Activity className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeSubscriptions}</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
              <Download className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalDownloads.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+18% from last month</p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
              <Star className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgRating}</div>
              <p className="text-xs text-muted-foreground">+0.2 from last month</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="sales" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="sales">Recent Sales</TabsTrigger>
            <TabsTrigger value="apps">Top Apps</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="sales">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>
                  Latest purchases from your SaaS marketplace
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSales.map((sale) => (
                    <div key={sale.id} className="flex items-center justify-between p-4 border border-white/10 rounded-lg">
                      <div>
                        <p className="font-medium">{sale.app_name}</p>
                        <p className="text-sm text-muted-foreground">{sale.user_email}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(sale.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${sale.amount.toFixed(2)}</p>
                        <Badge variant="secondary">{sale.plan_name}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="apps">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Top Performing Apps</CardTitle>
                <CardDescription>
                  Your best performing SaaS applications this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topApps.map((app, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-white/10 rounded-lg">
                      <div>
                        <p className="font-medium">{app.name}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{app.downloads} downloads</span>
                          <span>★ {app.rating}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-neon-green">${app.revenue.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">revenue</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>User Growth</CardTitle>
                  <CardDescription>Monthly user acquisition</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <p className="text-muted-foreground">Chart will be implemented with Recharts</p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Revenue Trends</CardTitle>
                  <CardDescription>Monthly revenue growth</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <p className="text-muted-foreground">Chart will be implemented with Recharts</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8 flex justify-center space-x-4">
          <Button asChild>
            <a href="/admin/apps">Manage Apps</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/admin/users">Manage Users</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/admin/updates">Push Updates</a>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
