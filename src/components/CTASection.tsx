
import { Button } from "@/components/ui/button";
import { Phone, FileText, Eye, ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 relative">
      {/* Bright background with contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-neon-green/20 via-neon-blue/20 to-neon-purple/20 animate-gradient"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold">
            Ready to Turn Your Idea Into an App
            <br />
            <span className="gradient-text">(or Buy One That's Ready)?</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Take the first step towards building your tech empire. Choose the path that fits your timeline and goals.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
            <Button 
              size="lg" 
              className="glass-card neon-glow hover:scale-105 transition-all duration-300 text-lg px-8 py-6 bg-gradient-to-r from-neon-green to-neon-blue border-0 min-w-[200px]"
            >
              <Phone className="mr-2 w-5 h-5" />
              Book a Free Call
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="glass-card hover:neon-glow hover:scale-105 transition-all duration-300 text-lg px-8 py-6 border-white/20 min-w-[200px]"
            >
              <FileText className="mr-2 w-5 h-5" />
              Request a Quote
            </Button>

            <Button 
              size="lg" 
              variant="outline" 
              className="glass-card hover:neon-glow hover:scale-105 transition-all duration-300 text-lg px-8 py-6 border-neon-purple/30 hover:border-neon-purple/50 min-w-[200px]"
            >
              <Eye className="mr-2 w-5 h-5" />
              See Available Apps
            </Button>
          </div>

          {/* Urgency Element */}
          <div className="glass-card p-6 max-w-md mx-auto border border-neon-green/30 bg-neon-green/5 mt-12">
            <div className="flex items-center justify-center space-x-2 text-neon-green">
              <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse"></div>
              <span className="font-semibold">Limited spots available this month</span>
              <ArrowRight className="w-4 h-4 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
