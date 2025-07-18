
import HeroSection from "@/components/HeroSection";
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
      <HeroSection />
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
