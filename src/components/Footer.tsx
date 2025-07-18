
import { Mail, MapPin, Twitter, Linkedin, Github } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" }, 
    { icon: Github, href: "#", label: "GitHub" }
  ];

  const quickLinks = [
    { name: "About Us", href: "#" },
    { name: "Services", href: "#" },
    { name: "Portfolio", href: "#" },
    { name: "Contact", href: "#" }
  ];

  const services = [
    { name: "Custom Apps", href: "#" },
    { name: "AI Solutions", href: "#" },
    { name: "SaaS Platforms", href: "#" },
    { name: "Mobile Apps", href: "#" }
  ];

  return (
    <footer className="relative py-20 mt-20">
      {/* Glassmorphic glow and soft blur background */}
      <div className="absolute inset-0 bg-gradient-to-t from-neon-green/10 via-neon-blue/5 to-transparent backdrop-blur-sm"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold gradient-text">AI App Builders</h3>
              <p className="text-muted-foreground leading-relaxed">
                Empowering non-technical entrepreneurs to build and scale AI-powered businesses 
                without the complexity of coding.
              </p>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-neon-green" />
                <span>hello@aiappbuilders.com</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-neon-blue" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-neon-green transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a 
                    href={service.href}
                    className="text-muted-foreground hover:text-neon-blue transition-colors duration-300"
                  >
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold mb-6">Stay Connected</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="glass-card p-3 hover:neon-glow hover:scale-110 transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5 text-neon-green hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-muted-foreground text-sm">
              © 2024 AI App Builders. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-muted-foreground hover:text-neon-green transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-muted-foreground hover:text-neon-green transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-muted-foreground hover:text-neon-green transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
