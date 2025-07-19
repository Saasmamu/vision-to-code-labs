
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  User, 
  Mail,
  Calendar,
  CreditCard,
  Activity
} from "lucide-react";

const AdminUsers = () => {
  const [users] = useState([
    {
      id: 1,
      name: "John Smith",
      email: "john@example.com",
      joinDate: "2024-01-15",
      subscription: "Pro",
      status: "active",
      totalSpent: 299.97,
      appsOwned: 3,
      lastLogin: "2024-01-18"
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@example.com",
      joinDate: "2024-01-10",
      subscription: "Basic",
      status: "active",
      totalSpent: 59.99,
      appsOwned: 1,
      lastLogin: "2024-01-17"
    },
    {
      id: 3,
      name: "Mike Davis",
      email: "mike@example.com",
      joinDate: "2024-01-05",
      subscription: "Enterprise",
      status: "inactive",
      totalSpent: 599.99,
      appsOwned: 5,
      lastLogin: "2024-01-12"
    }
  ]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-24 pb-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">User Management</h1>
          <p className="text-muted-foreground">
            Manage user accounts, subscriptions, and purchases
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search users..." 
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Users ({users.length})</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
            <TabsTrigger value="premium">Premium</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="space-y-4">
              {users.map((user) => (
                <Card key={user.id} className="glass-card">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-neon-blue to-neon-green rounded-full flex items-center justify-center">
                          <User className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-semibold">{user.name}</h3>
                            <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                              {user.status}
                            </Badge>
                            <Badge variant="outline">{user.subscription}</Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <span className="flex items-center">
                              <Mail className="mr-1 h-3 w-3" />
                              {user.email}
                            </span>
                            <span className="flex items-center">
                              <Calendar className="mr-1 h-3 w-3" />
                              Joined {user.joinDate}
                            </span>
                            <span className="flex items-center">
                              <Activity className="mr-1 h-3 w-3" />
                              Last login {user.lastLogin}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <div className="flex items-center text-sm font-medium">
                            <CreditCard className="mr-1 h-3 w-3" />
                            ${user.totalSpent}
                          </div>
                          <p className="text-xs text-muted-foreground">{user.appsOwned} apps owned</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="active">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Active Users</CardTitle>
                <CardDescription>Users with active subscriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Active users list will be filtered here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inactive">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Inactive Users</CardTitle>
                <CardDescription>Users with expired or cancelled subscriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Inactive users list will be filtered here</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="premium">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Premium Users</CardTitle>
                <CardDescription>Users with Pro or Enterprise subscriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Premium users list will be filtered here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default AdminUsers;
