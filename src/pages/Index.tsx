
import { HeroSection } from "@/components/ui/hero-section";
import { Icons } from "@/components/ui/icons";
import USPSection from "@/components/USPSection";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import CTASection from "@/components/CTASection";
import TestimonialsSection from "@/components/TestimonialsSection";
import LeadMagnetSection from "@/components/LeadMagnetSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection
        badge={{
          text: "Trusted by 100+ Entrepreneurs",
          action: {
            text: "See Success Stories",
            href: "#testimonials",
          },
        }}
        title="We Build & Sell Ready-to-Launch AI & SaaS Apps—So You Can Focus on Scaling, Not Coding"
        description="Whether you want to launch your own AI tool, custom web or mobile app, or buy a pre-built SaaS business — we do the hard tech work so you don't have to."
        actions={[
          {
            text: "Get a Free Demo or Proposal",
            href: "#contact",
            variant: "glow",
          },
          {
            text: "Browse Ready-Made Apps",
            href: "#services",
            variant: "default",
            icon: <Icons.gitHub className="h-5 w-5" />,
          },
        ]}
        image={{
          light: "/lovable-uploads/952920fc-3468-45b0-b1a0-34dc30782c9f.png",
          dark: "/lovable-uploads/952920fc-3468-45b0-b1a0-34dc30782c9f.png",
          alt: "AI Sales Dashboard Preview",
        }}
      />
      <USPSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <CTASection />
      <TestimonialsSection />
      <LeadMagnetSection />
      <FAQSection />
      <Footer />
    </main>
  );
};

export default Index;
