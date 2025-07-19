import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { 
  Star, 
  Download, 
  Eye, 
  Check,
  Globe,
  Shield,
  Zap,
  Users,
  Clock,
  MessageSquare,
  ChevronLeft
} from "lucide-react";

const AppDetail = () => {
  const { slug } = useParams();
  const [selectedPlan, setSelectedPlan] = useState("pro");

  // Mock data - in real app, fetch based on slug
  const app = {
    id: 1,
    name: "AI Chat Assistant Pro",
    slug: "ai-chat-assistant-pro",
    description: "Advanced AI-powered customer support assistant with multi-language support, sentiment analysis, and intelligent routing.",
    longDescription: "Transform your customer support with our state-of-the-art AI Chat Assistant. Built with the latest machine learning technologies, it provides human-like conversations while reducing support costs by up to 70%. Perfect for businesses of all sizes looking to scale their customer service operations.",
    category: "AI & Machine Learning",
    rating: 4.8,
    downloads: 3421,
    reviews: 287,
    image: "/placeholder.svg",
    screenshots: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    tags: ["AI", "Customer Support", "Multilingual", "Analytics"],
    customDomain: true,
    lastUpdated: "2024-01-15",
    version: "2.1.0",
    plans: {
      basic: {
        name: "Basic",
        price: 19.99,
        popular: false,
        features: [
          "Up to 1,000 conversations/month",
          "5 languages supported",
          "Basic analytics",
          "Email support",
          "Standard response time"
        ]
      },
      pro: {
        name: "Pro",
        price: 29.99,
        popular: true,
        features: [
          "Up to 10,000 conversations/month",
          "15 languages supported",
          "Advanced analytics & reporting",
          "Priority support",
          "Custom branding",
          "API access",
          "Sentiment analysis"
        ]
      },
      enterprise: {
        name: "Enterprise",
        price: 49.99,
        popular: false,
        features: [
          "Unlimited conversations",
          "25+ languages supported",
          "Full analytics suite",
          "24/7 dedicated support",
          "White-label solution",
          "Custom integrations",
          "Advanced AI training",
          "Multi-tenant support"
        ]
      }
    },
    features: [
      "AI-powered conversations with 95% accuracy",
      "Multi-language support (25+ languages)",
      "Sentiment analysis and emotion detection",
      "Intelligent conversation routing",
      "Real-time analytics dashboard",
      "Custom branding and theming",
      "API for third-party integrations",
      "GDPR compliant data handling"
    ],
    techSpecs: {
      "Response Time": "< 200ms average",
      "Uptime": "99.9% SLA",
      "Languages": "25+ supported",
      "Integrations": "50+ platforms",
      "Security": "SOC 2 Type II certified",
      "Deployment": "Cloud-hosted or on-premise"
    }
  };

  const reviews = [
    {
      id: 1,
      user: "Sarah M.",
      rating: 5,
      date: "2024-01-10",
      comment: "Incredible AI assistant! Cut our response time by 80% and customers love it."
    },
    {
      id: 2,
      user: "Mike D.",
      rating: 5,
      date: "2024-01-08",
      comment: "Easy setup, great features. The multilingual support is exactly what we needed."
    },
    {
      id: 3,
      user: "Lisa K.",
      rating: 4,
      date: "2024-01-05",
      comment: "Very good overall. Would like more customization options but works great."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-24 pb-12">
        {/* Back Button */}
        <Button variant="outline" className="mb-6" asChild>
          <a href="/buysaas">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Marketplace
          </a>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* App Header */}
            <Card className="glass-card">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-6">
                  <img 
                    src={app.image} 
                    alt={app.name}
                    className="w-full md:w-32 h-32 object-cover rounded-lg bg-gradient-to-r from-neon-blue/20 to-neon-green/20"
                  />
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h1 className="text-3xl font-bold gradient-text mb-2">{app.name}</h1>
                        <p className="text-muted-foreground">{app.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <div className="flex items-center">
                        <Star className="mr-1 h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-medium">{app.rating}</span>
                        <span className="text-muted-foreground ml-1">({app.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Download className="mr-1 h-4 w-4" />
                        {app.downloads} downloads
                      </div>
                      <Badge variant="outline">{app.category}</Badge>
                      {app.customDomain && (
                        <Badge variant="outline">
                          <Globe className="mr-1 h-3 w-3" />
                          Custom Domain
                        </Badge>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {app.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Version {app.version}</span>
                      <span>Updated {app.lastUpdated}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Screenshots */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Screenshots</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {app.screenshots.map((screenshot, index) => (
                    <img 
                      key={index}
                      src={screenshot} 
                      alt={`Screenshot ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg bg-gradient-to-r from-blue-500/20 to-green-500/20 cursor-pointer hover:opacity-80 transition-opacity"
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="specs">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>About This App</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {app.longDescription}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-5 w-5 text-neon-green" />
                        <span className="text-sm">Enterprise Security</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Zap className="h-5 w-5 text-neon-blue" />
                        <span className="text-sm">Instant Deployment</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-5 w-5 text-purple-500" />
                        <span className="text-sm">24/7 Support</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="features">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Key Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {app.features.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <Check className="h-5 w-5 text-neon-green mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="specs">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Technical Specifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(app.techSpecs).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-white/10">
                          <span className="font-medium">{key}</span>
                          <span className="text-muted-foreground">{value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Customer Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b border-white/10 pb-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{review.user}</span>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`h-3 w-3 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Pricing Sidebar */}
          <div className="lg:col-span-1">
            <Card className="glass-card sticky top-24">
              <CardHeader>
                <CardTitle>Choose Your Plan</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries(app.plans).map(([key, plan]) => (
                  <div 
                    key={key}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      selectedPlan === key 
                        ? 'border-primary bg-primary/5' 
                        : 'border-white/10 hover:border-white/20'
                    }`}
                    onClick={() => setSelectedPlan(key)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{plan.name}</h3>
                      {plan.popular && (
                        <Badge variant="default" className="text-xs">Popular</Badge>
                      )}
                    </div>
                    <div className="text-2xl font-bold mb-3">
                      ${plan.price}
                      <span className="text-sm font-normal text-muted-foreground">/month</span>
                    </div>
                    <ul className="space-y-1">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <Check className="h-3 w-3 text-neon-green mr-2 mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                <div className="space-y-3">
                  <Button className="w-full neon-glow">
                    Start Free Trial
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Eye className="mr-2 h-4 w-4" />
                    Live Demo
                  </Button>
                </div>

                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-2">
                    30-day money-back guarantee
                  </p>
                  <div className="flex justify-center space-x-4 text-xs text-muted-foreground">
                    <span className="flex items-center">
                      <Shield className="mr-1 h-3 w-3" />
                      Secure
                    </span>
                    <span className="flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      Instant Setup
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support Card */}
            <Card className="glass-card mt-6">
              <CardHeader>
                <CardTitle className="text-lg">Need Help?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Our team is here to help you get started with your new application.
                </p>
                <Button variant="outline" className="w-full">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Contact Support
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

export default AppDetail;
