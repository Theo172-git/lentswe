import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 blob-shape animate-blob animate-float" />
        <div className="absolute bottom-20 left-0 w-80 h-80 bg-secondary/10 blob-shape-2 animate-blob animation-delay-400" style={{ animationDuration: '10s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary/10 rounded-full border border-primary/20 mb-10 animate-fade-in">
            <span className="w-3 h-3 bg-primary rounded-full animate-pulse" />
            <span className="text-base md:text-lg font-black text-primary tracking-wide uppercase">Sustainable Solutions Provider</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-black text-primary-foreground leading-[1.1] mb-8 animate-fade-in-up tracking-tight">
            Powering Progress with{" "}
            <span className="text-gradient">Sustainable</span>{" "}
            Solutions
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl lg:text-3xl text-primary-foreground/70 max-w-3xl mx-auto mb-12 animate-fade-in-up animation-delay-200 leading-relaxed">
            Your trusted partner in materials handling, heavy machinery, transportation, and energy solutions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20 animate-fade-in-up animation-delay-300">
            <Link to="/services">
              <Button variant="hero" size="xl" className="font-black text-lg px-10 py-6">
                Explore Our Services
                <ArrowRight className="w-6 h-6" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="heroOutline" size="xl" className="font-black text-lg px-10 py-6">
                Contact Us
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-4xl mx-auto animate-fade-in-up animation-delay-400">
            {[
              { value: "10+", label: "Years Experience" },
              { value: "50+", label: "Projects Completed" },
              { value: "4", label: "Service Categories" },
              { value: "100%", label: "Client Satisfaction" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl lg:text-6xl font-black text-primary mb-2">{stat.value}</div>
                <div className="text-base md:text-lg font-bold text-primary-foreground/60 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#services"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-primary-foreground/50 hover:text-primary transition-colors animate-bounce"
      >
        <span className="text-sm uppercase tracking-[0.2em] font-black">Scroll</span>
        <ChevronDown className="w-6 h-6" />
      </a>
    </section>
  );
};

export default HeroSection;
