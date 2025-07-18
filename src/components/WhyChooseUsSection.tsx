
import { Clock, Shield, Headphones, TrendingUp, DollarSign, CheckCircle } from "lucide-react";

const WhyChooseUsSection = () => {
  const benefits = [
    {
      icon: Clock,
      title: "Fast Turnaround (MVP in 2–4 weeks)",
      description: "Get your minimum viable product launched quickly to capture market opportunities"
    },
    {
      icon: Shield,
      title: "Full Source Code Ownership",
      description: "You own 100% of your application with complete control over your digital assets"
    },
    {
      icon: Headphones,
      title: "Ongoing Support & Upgrades",
      description: "Continuous maintenance and feature updates to keep your app competitive"
    },
    {
      icon: TrendingUp,
      title: "Business-Minded Development",
      description: "We build with revenue generation and scalability as core priorities"
    },
    {
      icon: DollarSign,
      title: "Transparent Pricing",
      description: "No hidden fees or surprise costs - you know exactly what you're paying for"
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Why <span className="gradient-text">100+ Entrepreneurs</span> Chose Us 
            <br />Over Freelancers or Agencies
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="glass-card p-6 hover:neon-glow hover:scale-105 transition-all duration-300 group"
            >
              <div className="flex items-start space-x-4">
                <div className="p-2 rounded-lg bg-gradient-to-r from-neon-green to-neon-blue group-hover:scale-110 transition-transform">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex items-center space-x-2">
                    <benefit.icon className="w-5 h-5 text-neon-green group-hover:text-neon-blue transition-colors" />
                    <h3 className="font-semibold text-sm">{benefit.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="glass-card p-8 border-2 border-neon-blue/30 bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 max-w-4xl mx-auto">
          <div className="text-center space-y-6">
            <blockquote className="text-xl md:text-2xl font-medium italic">
              "I had an idea and zero coding knowledge. Within a month, I launched my own AI SaaS app."
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-neon-green to-neon-blue flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <p className="font-semibold text-neon-green">Amaka</p>
                <p className="text-muted-foreground text-sm">Digital Entrepreneur</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
