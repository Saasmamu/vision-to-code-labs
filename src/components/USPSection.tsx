
import { Check, Sparkles, Settings, ShoppingCart, Headphones } from "lucide-react";
import { FeaturesSectionWithHoverEffects } from "@/components/ui/feature-section-with-hover-effects";

const USPSection = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            You Bring the <span className="gradient-text">Vision</span>. 
            <br />We Build the <span className="gradient-text">Business</span>.
          </h2>
        </div>

        <FeaturesSectionWithHoverEffects />

        {/* Quote Box */}
        <div className="glass-card p-8 border-2 border-neon-green/30 bg-gradient-to-r from-neon-green/10 to-neon-blue/10 text-center animate-glow mt-16">
          <blockquote className="text-2xl md:text-3xl font-semibold italic gradient-text">
            "Zero dev headaches. Zero wasted time. 100% ownership."
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default USPSection;
