
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { 
  Send, 
  Bell, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Users,
  Package
} from "lucide-react";

const AdminUpdates = () => {
  const [updates] = useState([
    {
      id: 1,
      title: "AI Chat Assistant v2.1.0",
      content: "New features: Multi-language support, improved response accuracy",
      app: "AI Chat Assistant",
      targetUsers: "All Users",
      status: "sent",
      sentDate: "2024-01-18",
      recipients: 1247
    },
    {
      id: 2,
      title: "Task Manager Pro Security Update",
      content: "Critical security patches and performance improvements",
      app: "Task Manager Pro", 
      targetUsers: "Pro & Enterprise",
      status: "scheduled",
      sentDate: "2024-01-20",
      recipients: 456
    }
  ]);

  const [showCreateForm, setShowCreateForm] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-24 pb-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">Update Management</h1>
            <p className="text-muted-foreground">
              Push updates, notifications, and announcements to users
            </p>
          </div>
          <Button onClick={() => setShowCreateForm(true)} className="neon-glow">
            <Send className="mr-2 h-4 w-4" />
            Create Update
          </Button>
        </div>

        {showCreateForm && (
          <Card className="glass-card mb-8">
            <CardHeader>
              <CardTitle>Create New Update</CardTitle>
              <CardDescription>Send updates and notifications to your users</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Update Title</label>
                  <Input placeholder="e.g., App v2.0.0 - New Features" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Target App</label>
                  <select className="w-full p-2 rounded-md border border-input bg-background">
                    <option value="">All Apps</option>
                    <option>AI Chat Assistant</option>
                    <option>Task Manager Pro</option>
                    <option>Analytics Dashboard</option>
                    <option>Email Automation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Update Content</label>
                <Textarea 
                  placeholder="Describe the update, new features, bug fixes, etc..."
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Target Users</label>
                  <select className="w-full p-2 rounded-md border border-input bg-background">
                    <option>All Users</option>
                    <option>Basic Plan Users</option>
                    <option>Pro Plan Users</option>
                    <option>Enterprise Users</option>
                    <option>Pro & Enterprise Users</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Send Date/Time</label>
                  <Input type="datetime-local" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="email-notification" />
                  <label htmlFor="email-notification" className="text-sm font-medium">
                    Send Email Notification
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="in-app-notification" defaultChecked />
                  <label htmlFor="in-app-notification" className="text-sm font-medium">
                    Show In-App Notification
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="force-update" />
                  <label htmlFor="force-update" className="text-sm font-medium">
                    Force Update (Critical)
                  </label>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
                <Button variant="outline">
                  Save Draft
                </Button>
                <Button>
                  Send Now
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Recent Updates
              </CardTitle>
              <CardDescription>
                Updates and notifications sent to users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {updates.map((update) => (
                  <div key={update.id} className="border border-white/10 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold">{update.title}</h3>
                          <Badge variant={update.status === 'sent' ? 'default' : 'secondary'}>
                            {update.status === 'sent' ? (
                              <><CheckCircle className="mr-1 h-3 w-3" /> Sent</>
                            ) : (
                              <><Clock className="mr-1 h-3 w-3" /> Scheduled</>
                            )}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{update.content}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span className="flex items-center">
                            <Package className="mr-1 h-3 w-3" />
                            {update.app}
                          </span>
                          <span className="flex items-center">
                            <Users className="mr-1 h-3 w-3" />
                            {update.targetUsers}
                          </span>
                          <span>{update.recipients} recipients</span>
                          <span>{update.sentDate}</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Send Critical Alert
                </Button>
                <Button className="w-full" variant="outline">
                  <Bell className="mr-2 h-4 w-4" />
                  Maintenance Notice
                </Button>
                <Button className="w-full" variant="outline">
                  <Package className="mr-2 h-4 w-4" />
                  New Feature Announce
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">Update Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Updates Sent</span>
                    <span className="font-medium">24</span>
                  </div>
                  <div className="flex justify-between">
                    <span>This Month</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Scheduled</span>
                    <span className="font-medium">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Open Rate</span>
                    <span className="font-medium">87%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg">Templates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline" size="sm">
                  Bug Fix Update
                </Button>
                <Button className="w-full" variant="outline" size="sm">
                  New Feature Release
                </Button>
                <Button className="w-full" variant="outline" size="sm">
                  Security Update
                </Button>
                <Button className="w-full" variant="outline" size="sm">
                  Maintenance Notice
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminUpdates;
