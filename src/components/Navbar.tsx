import { useState } from "react";
import { Menu, X, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import logoImg from "@/assets/lentswe-logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Team", href: "/team" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Skip link for accessibility */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      
      <nav className="fixed top-0 left-0 right-0 z-50 glass shadow-sm animate-fade-in-down" role="navigation" aria-label="Main navigation">
        <div className="container-custom">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
          <Link to="/" className="flex items-center gap-3 hover-scale">
              <img src={logoImg} alt="Lentswe Holding - Home" className="h-14 w-auto mix-blend-multiply dark:mix-blend-screen" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`relative px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ${
                    isActive(link.href)
                      ? "text-primary bg-primary/10"
                      : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                  }`}
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  {link.name}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center gap-4">
              <Link to="/contact">
                <Button variant="default" size="default" className="font-bold group">
                  <Phone className="w-4 h-4 transition-transform group-hover:rotate-12" />
                  Get in Touch
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-foreground hover:text-primary transition-all duration-200 rounded-lg hover:bg-primary/10 active:scale-95"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">{isOpen ? "Close" : "Open"} navigation menu</span>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          id="mobile-menu"
          className={`lg:hidden absolute top-20 left-0 right-0 bg-background border-b border-border shadow-xl transition-all duration-300 ease-out ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
          aria-hidden={!isOpen}
        >
          <div className="container-custom py-6 space-y-2">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl font-semibold text-lg transition-all duration-200 ${
                  isActive(link.href)
                    ? "text-primary bg-primary/10"
                    : "text-foreground hover:text-primary hover:bg-primary/5"
                } animate-fade-in`}
                style={{ animationDelay: `${index * 50}ms` }}
                aria-current={isActive(link.href) ? "page" : undefined}
                tabIndex={isOpen ? 0 : -1}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-border animate-fade-in animation-delay-300">
              <Link to="/contact" onClick={() => setIsOpen(false)} tabIndex={isOpen ? 0 : -1}>
                <Button variant="default" size="lg" className="w-full font-bold group">
                  <Phone className="w-5 h-5 transition-transform group-hover:rotate-12" />
                  Get in Touch
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
