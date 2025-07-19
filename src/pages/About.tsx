
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Target, 
  Award, 
  Heart,
  Code2,
  Rocket,
  Globe
} from "lucide-react";

const About = () => {
  const stats = [
    { label: "Projects Completed", value: "200+" },
    { label: "Happy Clients", value: "150+" },
    { label: "Years Experience", value: "8+" },
    { label: "Team Members", value: "25+" }
  ];

  const values = [
    {
      icon: Code2,
      title: "Quality First",
      description: "We never compromise on code quality and always follow best practices."
    },
    {
      icon: Users,
      title: "Client-Focused",
      description: "Your success is our success. We work closely with you every step of the way."
    },
    {
      icon: Rocket,
      title: "Innovation",
      description: "We stay ahead of technology trends to deliver cutting-edge solutions."
    },
    {
      icon: Heart,
      title: "Passion",
      description: "We love what we do and it shows in every project we deliver."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-24 pb-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About <span className="gradient-text">Us</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We're a passionate team of developers, designers, and strategists dedicated to building exceptional digital experiences.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="glass-card text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Our Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Founded in 2016, we started as a small team of passionate developers who believed that great software could change the world. What began as a side project in a garage has grown into a full-service development agency serving clients globally.
              </p>
              <p>
                Our journey has been marked by continuous learning, adaptation, and an unwavering commitment to excellence. We've helped startups launch their first products, assisted enterprises in digital transformation, and everything in between.
              </p>
              <p>
                Today, we're proud to be a trusted partner for businesses looking to leverage technology for growth and innovation.
              </p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Card className="glass-card p-8">
              <div className="text-center">
                <Globe className="h-16 w-16 text-primary mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Global Impact</h3>
                <p className="text-muted-foreground">
                  Serving clients across 15+ countries with innovative solutions that make a difference.
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="glass-card text-center">
                <CardHeader>
                  <value.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mission */}
        <Card className="glass-card">
          <CardContent className="p-12 text-center">
            <Target className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              To empower businesses with innovative technology solutions that drive growth, improve efficiency, and create meaningful connections with their customers.
            </p>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default About;
