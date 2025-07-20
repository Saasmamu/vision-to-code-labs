
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { 
  Package, 
  Download, 
  Star, 
  Calendar,
  ExternalLink,
  Settings,
  CreditCard,
  User,
  Activity
} from 'lucide-react';

interface UserApp {
  id: string;
  app: {
    id: string;
    name: string;
    description: string;
    images: string[];
    demo_url: string;
    rating: number;
    version: string;
  };
  plan: {
    name: string;
    price: number;
  };
  status: string;
  expires_at: string;
  created_at: string;
}

interface Order {
  id: string;
  amount: number;
  currency: string;
  status: string;
  created_at: string;
  app: {
    name: string;
  };
  plan: {
    name: string;
  };
}

const Dashboard = () => {
  const { user, profile } = useAuth();
  const [userApps, setUserApps] = useState<UserApp[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalApps: 0,
    totalSpent: 0,
    activeSubscriptions: 0
  });

  useEffect(() => {
    if (user) {
      fetchUserData();
    }
  }, [user]);

  const fetchUserData = async () => {
    try {
      // Fetch user apps
      const { data: appsData, error: appsError } = await supabase
        .from('user_apps')
        .select(`
          *,
          app:apps(*),
          plan:pricing_plans(*)
        `)
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });

      if (appsError) throw appsError;
      setUserApps(appsData || []);

      // Fetch orders
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select(`
          *,
          app:apps(name),
          plan:pricing_plans(name)
        `)
        .eq('user_id', user!.id)
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;
      setOrders(ordersData || []);

      // Calculate stats
      const totalApps = appsData?.length || 0;
      const totalSpent = ordersData?.reduce((sum, order) => sum + order.amount, 0) || 0;
      const activeSubscriptions = appsData?.filter(app => app.status === 'active').length || 0;

      setStats({ totalApps, totalSpent, activeSubscriptions });
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

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
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Welcome back, {profile?.full_name || user?.email}
          </h1>
          <p className="text-muted-foreground">
            Manage your apps, subscriptions, and account settings
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">My Apps</CardTitle>
              <Package className="h-4 w-4 text-neon-blue" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalApps}</div>
              <p className="text-xs text-muted-foreground">
                {stats.activeSubscriptions} active subscriptions
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <CreditCard className="h-4 w-4 text-neon-green" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.totalSpent.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                Across all purchases
              </p>
            </CardContent>
          </Card>

          <Card className="glass-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Account Status</CardTitle>
              <Activity className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Active</div>
              <p className="text-xs text-muted-foreground">
                Member since {new Date(user?.created_at || '').getFullYear()}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="apps" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="apps">My Apps</TabsTrigger>
            <TabsTrigger value="orders">Order History</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="apps">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">My Applications</h2>
                <Button asChild>
                  <a href="/buysaas">Browse More Apps</a>
                </Button>
              </div>

              {userApps.length === 0 ? (
                <Card className="glass-card">
                  <CardContent className="text-center py-12">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No apps yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Start building your toolkit by purchasing your first app
                    </p>
                    <Button asChild>
                      <a href="/buysaas">Browse Apps</a>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userApps.map((userApp) => (
                    <Card key={userApp.id} className="glass-card group hover:neon-glow transition-all duration-300">
                      <CardHeader className="p-0">
                        <div className="relative">
                          <img 
                            src={userApp.app.images?.[0] || '/placeholder.svg'} 
                            alt={userApp.app.name}
                            className="w-full h-40 object-cover rounded-t-lg"
                          />
                          <Badge 
                            variant={userApp.status === 'active' ? 'default' : 'secondary'}
                            className="absolute top-2 right-2"
                          >
                            {userApp.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-2">
                          <CardTitle className="text-lg">{userApp.app.name}</CardTitle>
                          <div className="flex items-center text-sm text-yellow-400">
                            <Star className="mr-1 h-3 w-3 fill-current" />
                            {userApp.app.rating}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {userApp.app.description}
                        </p>
                        <div className="flex items-center justify-between mb-3">
                          <Badge variant="outline">{userApp.plan.name}</Badge>
                          <span className="text-sm text-muted-foreground">
                            v{userApp.app.version}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            size="sm" 
                            className="flex-1"
                            onClick={() => window.open(userApp.app.demo_url, '_blank')}
                          >
                            <ExternalLink className="mr-1 h-3 w-3" />
                            Launch
                          </Button>
                          <Button variant="outline" size="sm">
                            <Settings className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">Order History</h2>
              
              {orders.length === 0 ? (
                <Card className="glass-card">
                  <CardContent className="text-center py-12">
                    <CreditCard className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
                    <p className="text-muted-foreground">Your purchase history will appear here</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card key={order.id} className="glass-card">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold">{order.app.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {order.plan.name} Plan
                            </p>
                            <div className="flex items-center mt-1 text-xs text-muted-foreground">
                              <Calendar className="mr-1 h-3 w-3" />
                              {new Date(order.created_at).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">
                              ${order.amount.toFixed(2)} {order.currency}
                            </div>
                            <Badge 
                              variant={order.status === 'paid' ? 'default' : 'secondary'}
                            >
                              {order.status}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account information</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Settings panel coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Billing & Subscriptions</CardTitle>
                <CardDescription>Manage your billing information and subscriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Billing management coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
