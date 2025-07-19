
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ExternalLink, 
  Github, 
  Star,
  Users,
  TrendingUp,
  Zap
} from "lucide-react";

const Portfolio = () => {
  const apps = [
    {
      id: 1,
      name: "TaskFlow Pro",
      description: "A comprehensive project management and team collaboration platform with real-time updates.",
      image: "/placeholder.svg",
      category: "Productivity",
      tags: ["React", "Node.js", "WebSocket", "MongoDB"],
      stats: { users: "5K+", rating: 4.8, downloads: "12K+" },
      demoUrl: "#",
      codeUrl: "#",
      featured: true
    },
    {
      id: 2,
      name: "AI Content Generator",
      description: "Advanced AI-powered content creation tool for bloggers, marketers, and content creators.",
      image: "/placeholder.svg",
      category: "AI & ML",
      tags: ["Python", "OpenAI", "React", "FastAPI"],
      stats: { users: "8K+", rating: 4.9, downloads: "15K+" },
      demoUrl: "#",
      codeUrl: "#",
      featured: true
    },
    {
      id: 3,
      name: "EcoTracker",
      description: "Environmental impact tracking app helping users reduce their carbon footprint.",
      image: "/placeholder.svg",
      category: "Sustainability",
      tags: ["React Native", "Firebase", "Charts.js"],
      stats: { users: "3K+", rating: 4.7, downloads: "8K+" },
      demoUrl: "#",
      codeUrl: "#",
      featured: false
    },
    {
      id: 4,
      name: "CryptoPortfolio",
      description: "Real-time cryptocurrency portfolio tracker with advanced analytics and alerts.",
      image: "/placeholder.svg",
      category: "Finance",
      tags: ["Vue.js", "Express", "WebSocket", "Redis"],
      stats: { users: "10K+", rating: 4.6, downloads: "25K+" },
      demoUrl: "#",
      codeUrl: "#",
      featured: false
    },
    {
      id: 5,
      name: "FitnessPal AI",
      description: "AI-powered fitness and nutrition tracking app with personalized workout plans.",
      image: "/placeholder.svg",
      category: "Health & Fitness",
      tags: ["Flutter", "TensorFlow", "Firebase"],
      stats: { users: "7K+", rating: 4.8, downloads: "18K+" },
      demoUrl: "#",
      codeUrl: "#",
      featured: false
    },
    {
      id: 6,
      name: "StudyBuddy",
      description: "Collaborative learning platform connecting students and tutors worldwide.",
      image: "/placeholder.svg",
      category: "Education",
      tags: ["Next.js", "PostgreSQL", "WebRTC"],
      stats: { users: "4K+", rating: 4.9, downloads: "11K+" },
      demoUrl: "#",
      codeUrl: "#",
      featured: false
    }
  ];

  const categories = ["All", "Productivity", "AI & ML", "Finance", "Health & Fitness", "Education", "Sustainability"];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-24 pb-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Our <span className="gradient-text">Portfolio</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our collection of ready-made SaaS applications, each crafted with precision and designed for success.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card className="glass-card text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Apps Built</div>
            </CardContent>
          </Card>
          <Card className="glass-card text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">100K+</div>
              <div className="text-sm text-muted-foreground">Total Users</div>
            </CardContent>
          </Card>
          <Card className="glass-card text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">4.8</div>
              <div className="text-sm text-muted-foreground">Avg Rating</div>
            </CardContent>
          </Card>
          <Card className="glass-card text-center">
            <CardContent className="p-6">
              <div className="text-3xl font-bold text-primary mb-2">250K+</div>
              <div className="text-sm text-muted-foreground">Downloads</div>
            </CardContent>
          </Card>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button key={category} variant="outline" size="sm">
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Apps */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Apps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {apps.filter(app => app.featured).map((app) => (
              <Card key={app.id} className="glass-card hover:scale-105 transition-transform duration-200">
                <div className="relative">
                  <img 
                    src={app.image} 
                    alt={app.name}
                    className="w-full h-48 object-cover rounded-t-lg bg-gradient-to-r from-primary/20 to-secondary/20"
                  />
                  <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                    Featured
                  </Badge>
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2">{app.name}</CardTitle>
                      <Badge variant="outline" className="mb-2">{app.category}</Badge>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{app.stats.rating}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{app.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {app.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {app.stats.users} users
                    </span>
                    <span className="flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      {app.stats.downloads} downloads
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button className="flex-1" asChild>
                      <a href={`/buysaas/${app.name.toLowerCase().replace(/\s+/g, '-')}`}>
                        <Zap className="mr-2 h-4 w-4" />
                        Get App
                      </a>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={app.demoUrl}>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Apps */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">All Apps</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {apps.map((app) => (
              <Card key={app.id} className="glass-card hover:scale-105 transition-transform duration-200">
                <div className="relative">
                  <img 
                    src={app.image} 
                    alt={app.name}
                    className="w-full h-32 object-cover rounded-t-lg bg-gradient-to-r from-blue-500/20 to-green-500/20"
                  />
                  {app.featured && (
                    <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs">
                      Featured
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg">{app.name}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="text-xs">{app.stats.rating}</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="mb-2 text-xs">{app.category}</Badge>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{app.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span>{app.stats.users} users</span>
                    <span>{app.stats.downloads} downloads</span>
                  </div>
                  <Button size="sm" className="w-full" asChild>
                    <a href={`/buysaas/${app.name.toLowerCase().replace(/\s+/g, '-')}`}>
                      View Details
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Card className="glass-card">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Launch Your SaaS?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Browse our marketplace of ready-made applications and start your business today.
            </p>
            <Button size="lg" className="neon-glow" asChild>
              <a href="/buysaas">
                Explore Marketplace
              </a>
            </Button>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Portfolio;
