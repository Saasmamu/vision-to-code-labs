
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Rocket } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 hero-gradient animate-gradient">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.03\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"1\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      </div>

      {/* Floating Tech Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 animate-float opacity-30">
          <Sparkles className="w-8 h-8 text-neon-green" />
        </div>
        <div className="absolute top-40 right-32 animate-float opacity-20" style={{ animationDelay: '2s' }}>
          <Zap className="w-12 h-12 text-neon-blue" />
        </div>
        <div className="absolute bottom-32 left-32 animate-float opacity-25" style={{ animationDelay: '4s' }}>
          <Rocket className="w-10 h-10 text-neon-purple" />
        </div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                We Build & Sell{" "}
                <span className="gradient-text neon-text">Ready-to-Launch</span>{" "}
                AI & SaaS Apps—So You Can{" "}
                <span className="gradient-text">Focus on Scaling</span>, Not Coding
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                Whether you want to launch your own AI tool, custom web or mobile app, 
                or buy a pre-built SaaS business — we do the hard tech work so you don't have to.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="glass-card neon-glow hover:scale-105 transition-all duration-300 text-lg px-8 py-6 bg-gradient-to-r from-neon-green to-neon-blue border-0"
              >
                Get a Free Demo or Proposal
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="glass-card hover:neon-glow hover:scale-105 transition-all duration-300 text-lg px-8 py-6 border-white/20"
              >
                Browse Ready-Made Apps
              </Button>
            </div>

            {/* Trust Indicator */}
            <div className="glass-card p-6 border border-neon-green/20 bg-neon-green/5">
              <p className="text-center text-lg font-medium text-neon-green">
                "Zero dev headaches. Zero wasted time. 100% ownership."
              </p>
            </div>
          </div>

          {/* Right Side - App Mockups */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-6 items-center">
              {/* Phone Mockup */}
              <div className="glass-card p-4 hover:scale-105 transition-all duration-500 animate-float">
                <div className="bg-gradient-to-b from-neon-green/20 to-neon-blue/20 rounded-xl p-6 h-80 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="w-full h-4 bg-white/20 rounded"></div>
                    <div className="w-3/4 h-4 bg-white/15 rounded"></div>
                    <div className="w-1/2 h-4 bg-white/10 rounded"></div>
                  </div>
                  <div className="w-full h-12 bg-gradient-to-r from-neon-green to-neon-blue rounded-lg flex items-center justify-center">
                    <span className="text-white font-semibold">AI App</span>
                  </div>
                </div>
              </div>

              {/* Laptop Mockup */}
              <div className="glass-card p-4 hover:scale-105 transition-all duration-500 animate-float" style={{ animationDelay: '1s' }}>
                <div className="bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-xl p-6 h-48 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="w-full h-3 bg-white/20 rounded"></div>
                      <div className="w-2/3 h-3 bg-white/15 rounded"></div>
                      <div className="w-4/5 h-3 bg-white/10 rounded"></div>
                    </div>
                  </div>
                  <div className="w-full h-8 bg-gradient-to-r from-neon-blue to-neon-purple rounded flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">SaaS Dashboard</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
