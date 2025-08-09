
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Settings, 
  Database,
  Users,
  Shield,
  Mail,
  Bell,
  Globe,
  Server,
  Activity,
  AlertTriangle,
  CheckCircle,
  Save
} from "lucide-react";

interface SystemSettings {
  site_name: string;
  site_description: string;
  allow_registrations: boolean;
  email_notifications: boolean;
  maintenance_mode: boolean;
  analytics_enabled: boolean;
}

const AdminSettings = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState<SystemSettings>({
    site_name: "SaaS Marketplace",
    site_description: "Your premium SaaS marketplace",
    allow_registrations: true,
    email_notifications: true,
    maintenance_mode: false,
    analytics_enabled: true
  });
  const [loading, setLoading] = useState(false);
  const [systemStats, setSystemStats] = useState({
    totalUsers: 0,
    totalApps: 0,
    totalOrders: 0,
    systemHealth: 'good'
  });

  useEffect(() => {
    fetchSystemStats();
  }, []);

  const fetchSystemStats = async () => {
    try {
      // Fetch basic system statistics
      const [usersCount, appsCount, ordersCount] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('apps').select('*', { count: 'exact', head: true }),
        supabase.from('orders').select('*', { count: 'exact', head: true })
      ]);

      setSystemStats({
        totalUsers: usersCount.count || 0,
        totalApps: appsCount.count || 0,
        totalOrders: ordersCount.count || 0,
        systemHealth: 'good'
      });
    } catch (error) {
      console.error('Error fetching system stats:', error);
    }
  };

  const handleSaveSettings = async () => {
    setLoading(true);
    try {
      // In a real app, you'd save these to a settings table
      console.log('Saving settings:', settings);
      // Simulate save delay
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateSetting = (key: keyof SystemSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">System Settings</h1>
          <p className="text-muted-foreground">
            Configure system-wide settings and preferences
          </p>
        </div>
        <Button onClick={handleSaveSettings} disabled={loading}>
          <Save className="mr-2 h-4 w-4" />
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      {/* System Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Status</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Operational</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Database</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Connected</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Email Service</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Active</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Available</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Basic site configuration and branding</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Site Name</label>
                  <Input 
                    value={settings.site_name}
                    onChange={(e) => updateSetting('site_name', e.target.value)}
                    placeholder="Enter site name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Site URL</label>
                  <Input 
                    value="https://yourdomain.com"
                    disabled
                    className="bg-muted"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Site Description</label>
                <Textarea 
                  value={settings.site_description}
                  onChange={(e) => updateSetting('site_description', e.target.value)}
                  placeholder="Describe your marketplace"
                  rows={3}
                />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Maintenance Mode</label>
                    <p className="text-sm text-muted-foreground">
                      Enable to show maintenance page to users
                    </p>
                  </div>
                  <Switch
                    checked={settings.maintenance_mode}
                    onCheckedChange={(checked) => updateSetting('maintenance_mode', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Analytics Tracking</label>
                    <p className="text-sm text-muted-foreground">
                      Enable user behavior tracking and analytics
                    </p>
                  </div>
                  <Switch
                    checked={settings.analytics_enabled}
                    onCheckedChange={(checked) => updateSetting('analytics_enabled', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management Settings</CardTitle>
              <CardDescription>Control user registration and permissions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Allow New Registrations</label>
                  <p className="text-sm text-muted-foreground">
                    Allow new users to register for accounts
                  </p>
                </div>
                <Switch
                  checked={settings.allow_registrations}
                  onCheckedChange={(checked) => updateSetting('allow_registrations', checked)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Total Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{systemStats.totalUsers}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Admin Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Active Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{Math.floor(systemStats.totalUsers * 0.8)}</div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure email and system notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <label className="text-sm font-medium">Email Notifications</label>
                  <p className="text-sm text-muted-foreground">
                    Enable email notifications to users
                  </p>
                </div>
                <Switch
                  checked={settings.email_notifications}
                  onCheckedChange={(checked) => updateSetting('email_notifications', checked)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">SMTP Server</label>
                  <Input placeholder="smtp.gmail.com" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">SMTP Port</label>
                  <Input placeholder="587" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">From Email</label>
                  <Input placeholder="noreply@yourdomain.com" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">From Name</label>
                  <Input placeholder="SaaS Marketplace" />
                </div>
              </div>

              <Button variant="outline">
                <Mail className="mr-2 h-4 w-4" />
                Test Email Configuration
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure security policies and access controls</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Password Min Length</label>
                  <Input type="number" min="6" max="20" defaultValue="8" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Session Timeout (hours)</label>
                  <Input type="number" min="1" max="168" defaultValue="24" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Require Email Verification</label>
                    <p className="text-sm text-muted-foreground">
                      New users must verify their email address
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Two-Factor Authentication</label>
                    <p className="text-sm text-muted-foreground">
                      Enable 2FA for admin accounts
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">Login Rate Limiting</label>
                    <p className="text-sm text-muted-foreground">
                      Limit failed login attempts
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
              <CardDescription>System status and configuration details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-medium">Database Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Database Type:</span>
                      <span>PostgreSQL</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tables:</span>
                      <span>8</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Connection:</span>
                      <Badge variant="outline" className="text-green-600">Connected</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium">Application Info</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Version:</span>
                      <span>1.0.0</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Environment:</span>
                      <span>Production</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Deploy:</span>
                      <span>{new Date().toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium">System Actions</h3>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline">
                    <Database className="mr-2 h-4 w-4" />
                    Backup Database
                  </Button>
                  <Button variant="outline">
                    <Activity className="mr-2 h-4 w-4" />
                    View Logs
                  </Button>
                  <Button variant="outline">
                    <Server className="mr-2 h-4 w-4" />
                    Clear Cache
                  </Button>
                  <Button variant="outline" className="text-orange-600">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Restart Services
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
