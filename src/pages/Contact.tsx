
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  MessageSquare,
  Calendar
} from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: "hello@company.com",
      description: "Send us an email anytime!"
    },
    {
      icon: Phone,
      title: "Phone",
      details: "+1 (555) 123-4567",
      description: "Mon-Fri from 8am to 6pm"
    },
    {
      icon: MapPin,
      title: "Office",
      details: "123 Tech Street, Silicon Valley, CA 94000",
      description: "Come say hello at our office!"
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: "Mon-Fri: 8am-6pm PST",
      description: "We're here to help during business hours"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-6 pt-24 pb-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Get In <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to start your project? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Send us a message
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">First Name</label>
                  <Input placeholder="John" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Last Name</label>
                  <Input placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Email</label>
                <Input type="email" placeholder="john@example.com" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Company</label>
                <Input placeholder="Your Company (Optional)" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Project Type</label>
                <select className="w-full p-3 rounded-md border border-input bg-background text-foreground">
                  <option>Web Development</option>
                  <option>Mobile App</option>
                  <option>SaaS Development</option>
                  <option>API Development</option>
                  <option>Consulting</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Message</label>
                <Textarea 
                  placeholder="Tell us about your project..."
                  className="min-h-[120px]"
                />
              </div>
              <Button className="w-full neon-glow">
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="glass-card">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <info.icon className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold mb-1">{info.title}</h3>
                      <p className="text-foreground mb-1">{info.details}</p>
                      <p className="text-sm text-muted-foreground">{info.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule a Call
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Prefer to talk? Schedule a free 30-minute consultation call with our team.
                </p>
                <Button variant="outline" className="w-full">
                  Book a Call
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-center">Frequently Asked Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">How long does a typical project take?</h4>
                <p className="text-sm text-muted-foreground">
                  Project timelines vary based on complexity. Simple websites take 2-4 weeks, while complex applications can take 3-6 months.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Do you provide ongoing support?</h4>
                <p className="text-sm text-muted-foreground">
                  Yes! We offer maintenance packages and ongoing support for all our projects.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">What's your development process?</h4>
                <p className="text-sm text-muted-foreground">
                  We follow an agile approach with regular updates and client feedback throughout the development process.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Do you work with startups?</h4>
                <p className="text-sm text-muted-foreground">
                  Absolutely! We love working with startups and offer flexible packages to fit different budgets.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
