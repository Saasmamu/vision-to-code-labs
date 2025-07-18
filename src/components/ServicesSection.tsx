
import { Brain, ShoppingBag, Smartphone, Database, Zap, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const ServicesSection = () => {
  const services = [
    {
      title: "AI-Powered Apps",
      description: "Machine learning solutions that automate and optimize your business processes",
      icon: <Brain className="w-8 h-8" />,
      gradient: "from-neon-green to-neon-blue"
    },
    {
      title: "E-Commerce Platforms",
      description: "Complete online stores with payment processing and inventory management",
      icon: <ShoppingBag className="w-8 h-8" />,
      gradient: "from-neon-blue to-neon-purple"
    },
    {
      title: "Mobile Apps",
      description: "Native iOS and Android applications that engage your customers",
      icon: <Smartphone className="w-8 h-8" />,
      gradient: "from-neon-purple to-neon-green"
    },
    {
      title: "Custom SaaS Platforms",
      description: "Scalable software solutions tailored to your industry requirements",
      icon: <Database className="w-8 h-8" />,
      gradient: "from-neon-green to-neon-purple"
    },
    {
      title: "Ready-Made Micro-SaaS",
      description: "Pre-built, profitable SaaS tools you can buy and start earning from immediately",
      icon: <Zap className="w-8 h-8" />,
      gradient: "from-neon-blue to-neon-green"
    },
    {
      title: "Web Apps",
      description: "Progressive web applications that work seamlessly across all devices",
      icon: <Globe className="w-8 h-8" />,
      gradient: "from-neon-purple to-neon-blue"
    }
  ];

  const ServiceCard = ({ service, index }: { service: typeof services[0], index: number }) => {
    return (
      <div
        className={cn(
          "flex flex-col py-10 relative group/feature dark:border-neutral-800 border border-border/10 rounded-lg",
          "hover:border-primary/20 transition-all duration-300"
        )}
      >
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-primary/5 to-transparent pointer-events-none rounded-lg" />
        
        <div className="mb-4 relative z-10 px-8">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} p-4 group-hover/feature:scale-110 transition-transform duration-300`}>
            {service.icon}
          </div>
        </div>
        
        <div className="text-lg font-bold mb-2 relative z-10 px-8">
          <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-primary transition-all duration-200 origin-center" />
          <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-foreground">
            {service.title}
          </span>
        </div>
        
        <p className="text-sm text-muted-foreground max-w-xs relative z-10 px-8">
          {service.description}
        </p>
      </div>
    );
  };

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
