import { ArrowUp } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-12 relative">
      <div className="container-custom">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <svg viewBox="0 0 100 80" className="w-10 h-10" fill="none">
                <path d="M50 5 L90 40 L50 75 L10 40 Z" className="stroke-primary" strokeWidth="4" fill="none" />
                <path d="M50 20 L70 40 L50 60 L30 40 Z" className="fill-secondary" />
              </svg>
              <div>
                <span className="block text-sm font-bold text-primary tracking-wide leading-tight">LENTSWE</span>
                <span className="block text-xs font-semibold text-secondary tracking-widest">HOLDING</span>
              </div>
            </div>
            <p className="text-background/60 max-w-md">
              Your trusted partner in materials handling, heavy machinery, transportation, and energy solutions. 
              Building a safer, sustainable future together.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-background mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "About", "Services", "Team", "Contact"].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-background/60 hover:text-primary transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-background mb-4">Services</h4>
            <ul className="space-y-2">
              {[
                "Materials Handling",
                "Heavy Machinery",
                "Transportation",
                "Energy Solutions",
              ].map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="text-background/60 hover:text-primary transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-background/10">
          <p className="text-background/60 text-sm">
            © {currentYear} Lentswe Holding. All rights reserved.
          </p>
          <a
            href="#home"
            className="flex items-center gap-2 text-background/60 hover:text-primary transition-colors mt-4 md:mt-0"
          >
            Back to top
            <ArrowUp className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
