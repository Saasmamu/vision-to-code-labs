
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Target, Mail } from "lucide-react";

const LeadMagnetSection = () => {
  const [email, setEmail] = useState("");

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email capture here
    console.log("Email captured:", email);
    setEmail("");
  };

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Glowing border card design */}
          <div className="glass-card p-12 border-2 border-neon-green/30 bg-gradient-to-br from-neon-green/10 via-neon-blue/10 to-neon-purple/10 animate-glow">
            <div className="text-center space-y-8">
              <div className="flex items-center justify-center space-x-3">
                <Target className="w-8 h-8 text-neon-green" />
                <h2 className="text-3xl md:text-4xl font-bold">
                  Not Ready Yet? <span className="gradient-text">Download Our Free Guide</span>
                </h2>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl md:text-2xl font-semibold">
                  "10 Profitable AI & SaaS App Ideas You Can Launch Without Code"
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Discover proven app concepts that are generating $1K-$50K+ monthly revenue. 
                  Complete with market analysis, monetization strategies, and implementation roadmaps.
                </p>
              </div>

              {/* Email Form */}
              <form onSubmit={handleDownload} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="glass-card border-white/20 bg-white/5 text-white placeholder:text-white/50 h-12"
                    />
                  </div>
                  <Button 
                    type="submit"
                    size="lg"
                    className="glass-card neon-glow hover:scale-105 transition-all duration-300 bg-gradient-to-r from-neon-green to-neon-blue border-0 px-8 h-12"
                  >
                    <Download className="mr-2 w-5 h-5" />
                    Download Now
                  </Button>
                </div>
              </form>

              {/* Benefits */}
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-neon-green/20 flex items-center justify-center">
                    <span className="text-neon-green font-bold text-sm">1</span>
                  </div>
                  <span className="text-sm">Market-validated ideas</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-neon-blue/20 flex items-center justify-center">
                    <span className="text-neon-blue font-bold text-sm">2</span>
                  </div>
                  <span className="text-sm">Revenue projections</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-neon-purple/20 flex items-center justify-center">
                    <span className="text-neon-purple font-bold text-sm">3</span>
                  </div>
                  <span className="text-sm">Step-by-step roadmaps</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground flex items-center justify-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>No spam, just actionable insights. Unsubscribe anytime.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadMagnetSection;
