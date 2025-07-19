
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { 
  Search, 
  Filter, 
  Star, 
  Download, 
  Eye,
  ArrowRight,
  Zap,
  Shield,
  Globe
} from "lucide-react";

const BuySaaS = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Categories", count: 23 },
    { id: "ai", name: "AI & Machine Learning", count: 8 },
    { id: "productivity", name: "Productivity", count: 6 },
    { id: "analytics", name: "Analytics", count: 4 },
    { id: "crm", name: "CRM", count: 3 },
    { id: "marketing", name: "Marketing", count: 2 }
  ];

  const apps = [
    {
      id: 1,
      name: "AI Chat Assistant Pro",
      slug: "ai-chat-assistant-pro",
      description: "Advanced AI-powered customer support assistant with multi-language support and sentiment analysis.",
      category: "ai",
      price: { basic: 19.99, pro: 29.99, enterprise: 49.99 },
      rating: 4.8,
      downloads: 3421,
      image: "/placeholder.svg",
      featured: true,
      tags: ["AI", "Customer Support", "Multilingual"],
      customDomain: true
    },
    {
      id: 2,
      name: "TaskFlow Manager",
      slug: "taskflow-manager",
      description: "Professional project and task management solution with team collaboration features.",
      category: "productivity",
      price: { basic: 14.99, pro: 24.99, enterprise: 39.99 },
      rating: 4.6,
      downloads: 2890,
      image: "/placeholder.svg",
      featured: false,
      tags: ["Productivity", "Project Management", "Collaboration"],
      customDomain: false
    },
    {
      id: 3,
      name: "Analytics Dashboard Plus",
      slug: "analytics-dashboard-plus",
      description: "Comprehensive business analytics with real-time reporting and custom visualizations.",
      category: "analytics",
      price: { basic: 24.99, pro: 39.99, enterprise: 59.99 },
      rating: 4.9,
      downloads: 2156,
      image: "/placeholder.svg",
      featured: true,
      tags: ["Analytics", "Reporting", "Visualization"],
      customDomain: true
    },
    {
      id: 4,
      name: "Email Automation Suite",
      slug: "email-automation-suite",
      description: "Powerful email marketing automation with advanced segmentation and A/B testing.",
      category: "marketing",
      price: { basic: 22.99, pro: 35.99, enterprise: 55.99 },
      rating: 4.5,
      downloads: 1834,
      image: "/placeholder.svg",
      featured: false,
      tags: ["Email Marketing", "Automation", "A/B Testing"],
      customDomain: true
    },
    {
      id: 5,
      name: "CRM Connect",
      slug: "crm-connect",
      description: "Modern CRM solution with sales pipeline management and customer insights.",
      category: "crm",
      price: { basic: 18.99, pro: 32.99, enterprise: 48.99 },
      rating: 4.7,
      downloads: 1567,
      image: "/placeholder.svg",
      featured: false,
      tags: ["CRM", "Sales", "Customer Management"],
      customDomain: false
    },
    {
      id: 6,
      name: "Smart Inventory",
      slug: "smart-inventory",
      description: "AI-powered inventory management with predictive restocking and analytics.",
      category: "ai",
      price: { basic: 26.99, pro: 42.99, enterprise: 65.99 },
      rating: 4.4,
      downloads: 1203,
      image: "/placeholder.svg",
      featured: false,
      tags: ["AI", "Inventory", "Predictive Analytics"],
      customDomain: true
    }
  ];

  const filteredApps = apps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredApps = apps.filter(app => app.featured);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-24 pb-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold gradient-text mb-4">
            Ready-Made SaaS Applications
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Launch your business instantly with our collection of professionally built, 
            ready-to-deploy SaaS applications. No coding required.
          </p>
          <div className="flex justify-center space-x-4">
            <Badge variant="outline" className="px-4 py-2">
              <Zap className="mr-2 h-4 w-4" />
              Instant Deployment
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              <Shield className="mr-2 h-4 w-4" />
              Enterprise Ready
            </Badge>
            <Badge variant="outline" className="px-4 py-2">
              <Globe className="mr-2 h-4 w-4" />
              Custom Domains
            </Badge>
          </div>
        </div>

        {/* Featured Apps */}
        {featuredApps.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Featured Applications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredApps.map((app) => (
                <Card key={app.id} className="glass-card group hover:neon-glow transition-all duration-300">
                  <CardHeader className="p-0">
                    <div className="relative">
                      <img 
                        src={app.image} 
                        alt={app.name}
                        className="w-full h-48 object-cover rounded-t-lg bg-gradient-to-r from-neon-blue/20 to-neon-green/20"
                      />
                      <Badge className="absolute top-4 left-4 bg-yellow-500 text-black">
                        Featured
                      </Badge>
                      {app.customDomain && (
                        <Badge variant="outline" className="absolute top-4 right-4">
                          <Globe className="mr-1 h-3 w-3" />
                          Custom Domain
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-lg">{app.name}</CardTitle>
                      <div className="flex items-center text-sm text-yellow-400">
                        <Star className="mr-1 h-3 w-3 fill-current" />
                        {app.rating}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {app.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {app.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm text-muted-foreground">
                        <Download className="inline mr-1 h-3 w-3" />
                        {app.downloads} downloads
                      </div>
                      <div className="font-semibold text-neon-green">
                        From ${app.price.basic}/mo
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="mr-1 h-3 w-3" />
                        Preview
                      </Button>
                      <Button size="sm" className="flex-1" asChild>
                        <a href={`/buysaas/${app.slug}`}>
                          View Details
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search applications..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{category.name}</span>
                        <Badge variant="secondary" className="text-xs">
                          {category.count}
                        </Badge>
                      </div>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Apps Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredApps.map((app) => (
                <Card key={app.id} className="glass-card group hover:neon-glow transition-all duration-300">
                  <CardHeader className="p-0">
                    <div className="relative">
                      <img 
                        src={app.image} 
                        alt={app.name}
                        className="w-full h-40 object-cover rounded-t-lg bg-gradient-to-r from-blue-500/20 to-green-500/20"
                      />
                      {app.customDomain && (
                        <Badge variant="outline" className="absolute top-2 right-2 text-xs">
                          <Globe className="mr-1 h-2 w-2" />
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-base leading-tight">{app.name}</CardTitle>
                      <div className="flex items-center text-xs text-yellow-400">
                        <Star className="mr-1 h-2 w-2 fill-current" />
                        {app.rating}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                      {app.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {app.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {app.tags.length > 2 && (
                        <Badge variant="secondary" className="text-xs">
                          +{app.tags.length - 2}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-xs text-muted-foreground">
                        <Download className="inline mr-1 h-2 w-2" />
                        {app.downloads}
                      </div>
                      <div className="font-semibold text-sm text-neon-green">
                        ${app.price.basic}/mo
                      </div>
                    </div>
                    <Button size="sm" className="w-full" asChild>
                      <a href={`/buysaas/${app.slug}`}>
                        View Details
                        <ArrowRight className="ml-1 h-3 w-3" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredApps.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No applications found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BuySaaS;
