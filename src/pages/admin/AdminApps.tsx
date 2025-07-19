
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Upload,
  Settings,
  DollarSign,
  Tag,
  Globe
} from "lucide-react";

const AdminApps = () => {
  const [apps] = useState([
    {
      id: 1,
      name: "AI Chat Assistant",
      description: "Advanced AI-powered chat assistant for customer support",
      category: "AI",
      status: "active",
      price: { basic: 19.99, pro: 29.99, enterprise: 49.99 },
      downloads: 3421,
      rating: 4.8,
      image: "/placeholder.svg",
      featured: true,
      customDomain: true
    },
    {
      id: 2,
      name: "Task Manager Pro",
      description: "Professional task and project management solution",
      category: "Productivity",
      status: "active",
      price: { basic: 14.99, pro: 24.99, enterprise: 39.99 },
      downloads: 2890,
      rating: 4.6,
      image: "/placeholder.svg",
      featured: false,
      customDomain: false
    },
    {
      id: 3,
      name: "Analytics Dashboard",
      description: "Comprehensive business analytics and reporting tool",
      category: "Analytics",
      status: "draft",
      price: { basic: 24.99, pro: 39.99, enterprise: 59.99 },
      downloads: 0,
      rating: 0,
      image: "/placeholder.svg",
      featured: false,
      customDomain: true
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-24 pb-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">App Management</h1>
            <p className="text-muted-foreground">
              Create, edit, and manage your SaaS applications
            </p>
          </div>
          <Button onClick={() => setShowAddForm(true)} className="neon-glow">
            <Plus className="mr-2 h-4 w-4" />
            Add New App
          </Button>
        </div>

        {showAddForm && (
          <Card className="glass-card mb-8">
            <CardHeader>
              <CardTitle>Add New SaaS App</CardTitle>
              <CardDescription>Create a new application for your marketplace</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">App Name</label>
                    <Input placeholder="Enter app name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Category</label>
                    <select className="w-full p-2 rounded-md border border-input bg-background">
                      <option>AI</option>
                      <option>Productivity</option>
                      <option>Analytics</option>
                      <option>CRM</option>
                      <option>Marketing</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Description</label>
                    <Textarea placeholder="Describe your app..." rows={3} />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">App Image</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-sm text-gray-500">Click to upload app image</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Demo Link</label>
                    <Input placeholder="https://demo.yourapp.com" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Basic Plan ($)</label>
                  <Input type="number" placeholder="19.99" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Pro Plan ($)</label>
                  <Input type="number" placeholder="29.99" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Enterprise Plan ($)</label>
                  <Input type="number" placeholder="49.99" />
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Switch id="featured" />
                  <label htmlFor="featured" className="text-sm font-medium">Featured App</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="custom-domain" />
                  <label htmlFor="custom-domain" className="text-sm font-medium">Custom Domain Support</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="active" defaultChecked />
                  <label htmlFor="active" className="text-sm font-medium">Active/Listed</label>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
                <Button>Create App</Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-6">
          {apps.map((app) => (
            <Card key={app.id} className="glass-card">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex space-x-4">
                    <img 
                      src={app.image} 
                      alt={app.name}
                      className="w-16 h-16 rounded-lg object-cover bg-gray-200"
                    />
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold">{app.name}</h3>
                        <Badge variant={app.status === 'active' ? 'default' : 'secondary'}>
                          {app.status}
                        </Badge>
                        {app.featured && <Badge variant="outline">Featured</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{app.description}</p>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Tag className="mr-1 h-3 w-3" />
                          {app.category}
                        </span>
                        <span>{app.downloads} downloads</span>
                        {app.rating > 0 && <span>★ {app.rating}</span>}
                        {app.customDomain && (
                          <span className="flex items-center">
                            <Globe className="mr-1 h-3 w-3" />
                            Custom Domain
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="text-right mr-4">
                      <div className="flex items-center space-x-2 text-sm">
                        <DollarSign className="h-3 w-3" />
                        <span>${app.price.basic} - ${app.price.enterprise}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="mr-1 h-3 w-3" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="mr-1 h-3 w-3" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="mr-1 h-3 w-3" />
                      Manage
                    </Button>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminApps;
