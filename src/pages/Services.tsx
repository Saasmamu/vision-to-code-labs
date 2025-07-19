
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Code, 
  Smartphone, 
  Globe, 
  Database, 
  Shield, 
  Zap,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Code,
      title: "Custom Web Development",
      description: "Full-stack web applications built with modern technologies like React, Node.js, and TypeScript.",
      features: ["Responsive Design", "API Integration", "Database Design", "Performance Optimization"],
      price: "From $2,999"
    },
    {
      icon: Smartphone,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android using React Native.",
      features: ["Cross-platform", "Native Performance", "App Store Deployment", "Push Notifications"],
      price: "From $4,999"
    },
    {
      icon: Globe,
      title: "SaaS Development",
      description: "Complete Software-as-a-Service solutions with subscription management and multi-tenancy.",
      features: ["Multi-tenant Architecture", "Payment Integration", "Admin Dashboard", "Analytics"],
      price: "From $7,999"
    },
    {
      icon: Database,
      title: "API Development",
      description: "RESTful and GraphQL APIs with comprehensive documentation and security best practices.",
      features: ["RESTful APIs", "GraphQL", "Authentication", "Rate Limiting"],
      price: "From $1,999"
    },
    {
      icon: Shield,
      title: "Security Audits",
      description: "Comprehensive security assessments and penetration testing for your applications.",
      features: ["Vulnerability Assessment", "Code Review", "Security Reports", "Remediation Guide"],
      price: "From $1,499"
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description: "Optimize your existing applications for better speed, scalability, and user experience.",
      features: ["Performance Analysis", "Code Optimization", "Caching Strategies", "Load Testing"],
      price: "From $999"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-24 pb-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Our <span className="gradient-text">Services</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We provide comprehensive software development services to help your business thrive in the digital world.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card key={index} className="glass-card hover:scale-105 transition-transform duration-200">
              <CardHeader>
                <div className="flex items-center space-x-3 mb-4">
                  <service.icon className="h-8 w-8 text-primary" />
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </div>
                <p className="text-muted-foreground">{service.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">{service.price}</span>
                  <Button>
                    Get Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="glass-card max-w-4xl mx-auto">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold mb-6">Ready to Start Your Project?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Let's discuss your requirements and create something amazing together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="neon-glow">
                  Start a Project
                </Button>
                <Button size="lg" variant="outline">
                  Schedule Consultation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Services;
