
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
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

const AdminDashboard = () => {
  const [stats] = useState({
    totalUsers: 1247,
    totalApps: 23,
    monthlyRevenue: 45670,
    activeSubscriptions: 892,
    totalDownloads: 15420,
    avgRating: 4.7
  });

  const recentSales = [
    { id: 1, app: "AI Chat Assistant", user: "john@example.com", amount: 29.99, plan: "Pro" },
    { id: 2, app: "Task Manager Pro", user: "sarah@example.com", amount: 19.99, plan: "Basic" },
    { id: 3, app: "Analytics Dashboard", user: "mike@example.com", amount: 49.99, plan: "Enterprise" },
    { id: 4, app: "Email Automation", user: "lisa@example.com", amount: 39.99, plan: "Pro" },
  ];

  const topApps = [
    { name: "AI Chat Assistant", downloads: 3421, revenue: 8420, rating: 4.8 },
    { name: "Task Manager Pro", downloads: 2890, revenue: 6730, rating: 4.6 },
    { name: "Analytics Dashboard", downloads: 2156, revenue: 12450, rating: 4.9 },
    { name: "Email Automation", downloads: 1834, revenue: 5620, rating: 4.5 },
  ];

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
                        <p className="font-medium">{sale.app}</p>
                        <p className="text-sm text-muted-foreground">{sale.user}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${sale.amount}</p>
                        <Badge variant="secondary">{sale.plan}</Badge>
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
