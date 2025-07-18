
import { Check, Sparkles, Settings, ShoppingCart, Headphones } from "lucide-react";

const USPSection = () => {
  const features = [
    {
      icon: Settings,
      title: "Custom-Built Apps",
      description: "Tailored solutions built specifically for your business needs"
    },
    {
      icon: Sparkles,
      title: "Done-For-You AI Tools",
      description: "Ready-to-launch AI applications that generate revenue from day one"
    },
    {
      icon: ShoppingCart,
      title: "Buy & Own a SaaS Business",
      description: "Purchase pre-built, profitable SaaS applications with full ownership"
    },
    {
      icon: Headphones,
      title: "1-on-1 Strategy Support",
      description: "Personal guidance to ensure your app succeeds in the market"
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            You Bring the <span className="gradient-text">Vision</span>. 
            <br />We Build the <span className="gradient-text">Business</span>.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="glass-card p-8 hover:neon-glow hover:scale-105 transition-all duration-300 group"
            >
              <div className="flex items-start space-x-6">
                <div className="p-3 rounded-xl bg-gradient-to-r from-neon-green to-neon-blue">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <div className="space-y-3 flex-1">
                  <div className="flex items-center space-x-3">
                    <feature.icon className="w-6 h-6 text-neon-green group-hover:text-neon-blue transition-colors" />
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quote Box */}
        <div className="glass-card p-8 border-2 border-neon-green/30 bg-gradient-to-r from-neon-green/10 to-neon-blue/10 text-center animate-glow">
          <blockquote className="text-2xl md:text-3xl font-semibold italic gradient-text">
            "Zero dev headaches. Zero wasted time. 100% ownership."
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default USPSection;
