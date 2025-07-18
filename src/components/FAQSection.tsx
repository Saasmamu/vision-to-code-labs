
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "How long does it take to build a custom app?",
      answer: "Most MVPs are delivered within 2-4 weeks. Complex enterprise applications may take 6-12 weeks. We provide detailed timelines during our initial consultation and keep you updated throughout the development process."
    },
    {
      question: "Do I really own 100% of the source code?",
      answer: "Absolutely. Once final payment is complete, you receive full ownership of all source code, designs, and assets. There are no licensing fees, ongoing royalties, or restrictions on how you use your application."
    },
    {
      question: "What's included in your ongoing support?",
      answer: "Our support includes bug fixes, security updates, minor feature additions, hosting management, and technical consultations. We offer flexible support packages ranging from basic maintenance to full-service management."
    },
    {
      question: "Can I buy a pre-built app and customize it?",
      answer: "Yes! We have a portfolio of ready-made SaaS applications that you can purchase and customize. This is often 50-70% faster and more cost-effective than building from scratch while still meeting your specific needs."
    },
    {
      question: "What technologies do you use?",
      answer: "We use modern, scalable technologies including React, Node.js, Python, PostgreSQL, AWS, and various AI/ML frameworks. All applications are built with best practices for performance, security, and scalability."
    }
  ];

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to know about working with us
            </p>
          </div>

          <div className="glass-card p-8">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="glass-card p-6 border border-white/10 rounded-xl hover:border-neon-green/30 transition-all duration-300"
                >
                  <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline hover:text-neon-green transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pt-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
