
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Upload,
  Settings,
  DollarSign,
  Tag,
  Globe,
  Search
} from "lucide-react";

interface App {
  id: string;
  name: string;
  description: string | null;
  category_id: string | null;
  status: string;
  featured: boolean;
  custom_domain: boolean;
  version: string;
  demo_url: string | null;
  github_url: string | null;
  images: any;
  tags: string[];
  downloads: number;
  rating: number;
  rating_count: number;
  created_at: string;
  category_name?: string;
  creator_name?: string;
}

const AdminApps = () => {
  const [apps, setApps] = useState<App[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const { user } = useAuth();

  useEffect(() => {
    fetchApps();
    fetchCategories();
  }, []);

  const fetchApps = async () => {
    try {
      const { data, error } = await supabase
        .from('apps')
        .select(`
          *,
          categories(name),
          profiles(full_name)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const transformedApps = data?.map(app => ({
        ...app,
        category_name: (app.categories as any)?.name || 'Uncategorized',
        creator_name: (app.profiles as any)?.full_name || 'Unknown Creator',
        downloads: 0, // This would come from analytics
        rating: 0, // This would be calculated from reviews
        rating_count: 0
      })) || [];

      setApps(transformedApps);
    } catch (error) {
      console.error('Error fetching apps:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleCreateApp = async (formData: FormData) => {
    try {
      const { data, error } = await supabase
        .from('apps')
        .insert([
          {
            name: formData.get('name') as string,
            description: formData.get('description') as string,
            category_id: formData.get('category_id') as string,
            creator_id: user?.id,
            status: 'draft',
            demo_url: formData.get('demo_url') as string,
            featured: formData.get('featured') === 'on',
            custom_domain: formData.get('custom_domain') === 'on'
          }
        ]);

      if (error) throw error;
      
      setShowAddForm(false);
      fetchApps(); // Refresh the list
    } catch (error) {
      console.error('Error creating app:', error);
    }
  };

  const updateAppStatus = async (appId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('apps')
        .update({ status: newStatus })
        .eq('id', appId);

      if (error) throw error;
      
      setApps(apps.map(app => 
        app.id === appId ? { ...app, status: newStatus } : app
      ));
    } catch (error) {
      console.error('Error updating app status:', error);
    }
  };

  const filteredApps = apps.filter(app => {
    const matchesSearch = searchTerm === "" || 
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (app.description && app.description.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === "all" || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const publishedApps = apps.filter(app => app.status === 'published').length;
  const draftApps = apps.filter(app => app.status === 'draft').length;
  const featuredApps = apps.filter(app => app.featured).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">App Management</h1>
          <p className="text-muted-foreground">
            Create, edit, and manage your SaaS applications
          </p>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New App
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Apps</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{apps.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published Apps</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{publishedApps}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Draft Apps</CardTitle>
            <Edit className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{draftApps}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Featured Apps</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{featuredApps}</div>
          </CardContent>
        </Card>
      </div>

      {/* Add App Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New SaaS App</CardTitle>
            <CardDescription>Create a new application for your marketplace</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleCreateApp(new FormData(e.target as HTMLFormElement));
            }} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">App Name</label>
                    <Input name="name" placeholder="Enter app name" required />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Category</label>
                    <select name="category_id" className="w-full p-2 rounded-md border border-input bg-background">
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Description</label>
                    <Textarea name="description" placeholder="Describe your app..." rows={3} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Demo Link</label>
                    <Input name="demo_url" placeholder="https://demo.yourapp.com" />
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
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" name="featured" id="featured" />
                      <label htmlFor="featured" className="text-sm font-medium">Featured App</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" name="custom_domain" id="custom-domain" />
                      <label htmlFor="custom-domain" className="text-sm font-medium">Custom Domain Support</label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
                <Button type="submit">Create App</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search apps by name or description..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="px-3 py-2 rounded-md border border-input bg-background text-sm"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {/* Apps List */}
      <Card>
        <CardHeader>
          <CardTitle>Apps ({filteredApps.length})</CardTitle>
          <CardDescription>
            All applications in your marketplace
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredApps.map((app) => (
              <div key={app.id} className="flex items-start justify-between p-4 rounded-lg border">
                <div className="flex space-x-4">
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                    {app.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold">{app.name}</h3>
                      <Badge variant={app.status === 'published' ? 'default' : 'secondary'}>
                        {app.status}
                      </Badge>
                      {app.featured && <Badge variant="outline">Featured</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2 max-w-md">
                      {app.description || 'No description available'}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Tag className="mr-1 h-3 w-3" />
                        {app.category_name}
                      </span>
                      <span>{app.creator_name}</span>
                      <span>v{app.version}</span>
                      {app.custom_domain && (
                        <span className="flex items-center">
                          <Globe className="mr-1 h-3 w-3" />
                          Custom Domain
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <select 
                    className="px-2 py-1 rounded-md border border-input bg-background text-xs"
                    value={app.status}
                    onChange={(e) => updateAppStatus(app.id, e.target.value)}
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
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
                </div>
              </div>
            ))}

            {filteredApps.length === 0 && (
              <div className="text-center py-8">
                <Tag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  {searchTerm || statusFilter !== "all" ? "No apps match your filters" : "No apps found"}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminApps;
