import { TestimonialsSection as TestimonialsWithMarquee } from "@/components/ui/testimonials-with-marquee";

const TestimonialsSection = () => {
  const testimonials = [
    {
      author: {
        name: "Marcus Chen",
        handle: "@marcustech",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      text: "They delivered a fully functional AI-powered marketplace in just 3 weeks. Revenue hit $10k in the first month!",
      href: "https://twitter.com/marcustech"
    },
    {
      author: {
        name: "Sarah Johnson",
        handle: "@sarahedtech",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
      },
      text: "The learning management system they built handles thousands of students seamlessly. Best investment I've made."
    },
    {
      author: {
        name: "David Rodriguez",
        handle: "@davidfintech",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
      },
      text: "From concept to launch in 4 weeks. The mobile app they created is now processing $50k+ monthly transactions.",
      href: "https://twitter.com/davidfintech"
    },
    {
      author: {
        name: "Lisa Park",
        handle: "@lisasaas",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
      },
      text: "I bought a pre-built CRM system and customized it for my niche. Now serving 200+ clients with recurring revenue."
    },
    {
      author: {
        name: "Alex Thompson",
        handle: "@alexai",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      },
      text: "Amazing AI tools that actually work. Our productivity increased by 200% after implementation."
    }
  ];

  return (
    <TestimonialsWithMarquee 
      title="What Our Clients Say"
      description="Real results from real entrepreneurs who chose to focus on growth, not code"
      testimonials={testimonials}
    />
  );
};

export default TestimonialsSection;