
import { Brain, ShoppingBag, Smartphone, Database, Zap, Globe } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: Brain,
      title: "AI-Powered Apps",
      description: "Machine learning solutions that automate and optimize your business processes",
      gradient: "from-neon-green to-neon-blue"
    },
    {
      icon: ShoppingBag,
      title: "E-Commerce Platforms",
      description: "Complete online stores with payment processing and inventory management",
      gradient: "from-neon-blue to-neon-purple"
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description: "Native iOS and Android applications that engage your customers",
      gradient: "from-neon-purple to-neon-green"
    },
    {
      icon: Database,
      title: "Custom SaaS Platforms",
      description: "Scalable software solutions tailored to your industry requirements",
      gradient: "from-neon-green to-neon-purple"
    },
    {
      icon: Zap,
      title: "Ready-Made Micro-SaaS",
      description: "Pre-built, profitable SaaS tools you can buy and start earning from immediately",
      gradient: "from-neon-blue to-neon-green"
    },
    {
      icon: Globe,
      title: "Web Apps",
      description: "Progressive web applications that work seamlessly across all devices",
      gradient: "from-neon-purple to-neon-blue"
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            What Can We <span className="gradient-text">Build for You</span>?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From AI-powered solutions to complete SaaS platforms, we create technology that drives your business forward
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="glass-card p-8 hover:scale-105 hover:neon-glow transition-all duration-500 group cursor-pointer"
            >
              <div className="space-y-6">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} p-4 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold group-hover:gradient-text transition-all duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
