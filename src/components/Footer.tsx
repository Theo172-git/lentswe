import { ArrowUp, MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import logoImg from "@/assets/lentswe-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background py-16 relative">
      <div className="container-custom">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img src={logoImg} alt="Lentswe Holding" className="h-16 w-auto" />
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
                  4 Kuerboom Street<br />
                  Geelhoutpark, Rustenburg, 0300
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a href="tel:+27658795912" className="text-background/60 hover:text-primary transition-colors text-sm">
                  +27 65 879 5912
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="flex flex-col">
                  <a href="mailto:Info@Lentsweholding.com" className="text-background/60 hover:text-primary transition-colors text-sm">
                    Info@Lentsweholding.com
                  </a>
                  <a href="mailto:Accounts@Lentsweholding.com" className="text-background/60 hover:text-primary transition-colors text-sm">
                    Accounts@Lentsweholding.com
                  </a>
                </div>
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
