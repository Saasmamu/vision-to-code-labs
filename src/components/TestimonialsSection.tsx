
import { Star, Building2, GraduationCap, Banknote, ShoppingCart } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Marcus Chen",
      role: "E-commerce Entrepreneur",
      industry: "E-commerce",
      icon: ShoppingCart,
      avatar: "M",
      content: "They delivered a fully functional AI-powered marketplace in just 3 weeks. Revenue hit $10k in the first month!",
      rating: 5
    },
    {
      name: "Sarah Johnson",
      role: "EdTech Founder",
      industry: "Education",
      icon: GraduationCap,
      avatar: "S",
      content: "The learning management system they built handles thousands of students seamlessly. Best investment I've made.",
      rating: 5
    },
    {
      name: "David Rodriguez",
      role: "FinTech Startup",
      industry: "Finance",
      icon: Banknote,
      avatar: "D",
      content: "From concept to launch in 4 weeks. The mobile app they created is now processing $50k+ monthly transactions.",
      rating: 5
    },
    {
      name: "Lisa Park",
      role: "SaaS Business Owner",
      industry: "B2B Software",
      icon: Building2,
      avatar: "L",
      content: "I bought a pre-built CRM system and customized it for my niche. Now serving 200+ clients with recurring revenue.",
      rating: 5
    }
  ];

  const industries = [
    "E-commerce", "Education", "Finance", "Healthcare", "Real Estate", "SaaS"
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            What Our <span className="gradient-text">Clients Say</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Real results from real entrepreneurs who chose to focus on growth, not code
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="glass-card p-8 hover:neon-glow hover:scale-105 transition-all duration-300"
            >
              <div className="space-y-6">
                {/* Rating */}
                <div className="flex space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-neon-green text-neon-green" />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-lg leading-relaxed">
                  "{testimonial.content}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-neon-green to-neon-blue flex items-center justify-center">
                    <span className="text-white font-bold">{testimonial.avatar}</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-neon-green">{testimonial.name}</p>
                    <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                  </div>
                  <testimonial.icon className="w-6 h-6 text-neon-blue" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Industries Served */}
        <div className="text-center space-y-8">
          <h3 className="text-2xl font-semibold">Industries We Serve</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {industries.map((industry, index) => (
              <div 
                key={index}
                className="glass-card px-6 py-3 hover:neon-glow transition-all duration-300"
              >
                <span className="text-sm font-medium">{industry}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
