import { ArrowUp, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-16 relative">
      <div className="container-custom">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <svg viewBox="0 0 100 80" className="w-12 h-12" fill="none">
                <path d="M50 5 L90 40 L50 75 L10 40 Z" className="stroke-primary" strokeWidth="4" fill="none" />
                <path d="M50 20 L70 40 L50 60 L30 40 Z" className="fill-secondary" />
              </svg>
              <div>
                <span className="block text-lg font-extrabold text-primary tracking-wide leading-tight">LENTSWE</span>
                <span className="block text-xs font-bold text-secondary tracking-[0.3em]">HOLDING</span>
              </div>
            </Link>
            <p className="text-background/60 text-sm leading-relaxed">
              Your trusted partner in materials handling, heavy machinery, transportation, and energy solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-background text-lg mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: "Home", href: "/" },
                { name: "About", href: "/about" },
                { name: "Services", href: "/services" },
                { name: "Team", href: "/team" },
                { name: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-background/60 hover:text-primary transition-colors font-medium"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-background text-lg mb-5">Services</h4>
            <ul className="space-y-3">
              {[
                "Materials Handling",
                "Heavy Machinery",
                "Transportation",
                "Energy Solutions",
              ].map((service) => (
                <li key={service}>
                  <Link
                    to="/services"
                    className="text-background/60 hover:text-primary transition-colors font-medium"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-background text-lg mb-5">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-background/60 text-sm">
                  30 President Mbeki Drive<br />
                  Rustenburg, 0300
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:+27145921561" className="text-background/60 hover:text-primary transition-colors text-sm">
                  +27 (0) 14 592 1561
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="mailto:info@lentsweholding.co.za" className="text-background/60 hover:text-primary transition-colors text-sm">
                  info@lentsweholding.co.za
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-background/10">
          <p className="text-background/60 text-sm font-medium">
            © {currentYear} Lentswe Holding. All rights reserved.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-background/60 hover:text-primary transition-colors mt-4 md:mt-0 font-medium"
          >
            Back to top
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
