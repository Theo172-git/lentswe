import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import LentsweLogo from "./LentsweLogo";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Team", href: "#team" },
    { name: "Partners", href: "#partners" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2">
            <svg viewBox="0 0 100 80" className="w-10 h-10" fill="none">
              <path d="M50 5 L90 40 L50 75 L10 40 Z" className="stroke-primary" strokeWidth="4" fill="none" />
              <path d="M50 20 L70 40 L50 60 L30 40 Z" className="fill-secondary" />
            </svg>
            <div className="hidden sm:block">
              <span className="block text-sm font-bold text-primary tracking-wide leading-tight">LENTSWE</span>
              <span className="block text-xs font-semibold text-secondary tracking-widest">HOLDING</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-foreground/80 hover:text-primary font-medium transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Button variant="outline" size="default">
              <Phone className="w-4 h-4" />
              Get in Touch
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 top-20 bg-background z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-8 space-y-6">
          {navLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`text-2xl font-semibold text-foreground hover:text-primary transition-colors animate-fade-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {link.name}
            </a>
          ))}
          <Button variant="default" size="lg" className="mt-8 w-full">
            <Phone className="w-5 h-5" />
            Get in Touch
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
