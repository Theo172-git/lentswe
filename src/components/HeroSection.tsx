import { ArrowRight, Shield, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroBgImg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-end overflow-hidden" aria-label="Hero section">
      {/* Background Image - Full quality, crisp, no blur */}
      <div className="absolute inset-0" aria-hidden="true">
        <img 
          src={heroBgImg} 
          alt="" 
          className="w-full h-full object-cover"
          style={{ 
            objectPosition: 'center 40%',
            imageRendering: 'auto',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden'
          }}
        />
        {/* Subtle gradient for text readability - less aggressive */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10" />
      </div>

      <div className="container-custom relative z-10 pb-16 md:pb-24 pt-32">
        <div className="max-w-4xl">
          {/* Badge - clean, no blur */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary rounded-full mb-6 animate-fade-in">
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span className="text-xs md:text-sm font-bold text-white tracking-wide uppercase">Sustainable Solutions Provider</span>
          </div>

          {/* Main Heading - reduced size */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] mb-6 animate-fade-in-up tracking-tight">
            Powering Progress with{" "}
            <span className="text-gradient">Sustainable</span>{" "}
            Solutions
          </h1>

          {/* Subheading - smaller */}
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-10 animate-fade-in-up animation-delay-200 leading-relaxed">
            Your trusted partner in materials handling, heavy machinery, transportation, and energy solutions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-start gap-4 mb-12 animate-fade-in-up animation-delay-300">
            <Link to="/services">
              <Button variant="hero" size="lg" className="font-bold text-base px-8 py-5">
                Explore Our Services
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="heroOutline" size="lg" className="font-bold text-base px-8 py-5">
                Contact Us
              </Button>
            </Link>
          </div>

          {/* Safety & Quality Badges */}
          <div className="flex flex-wrap items-center gap-3 mb-10 animate-fade-in-up animation-delay-350">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 backdrop-blur-sm rounded-full border border-secondary/30">
              <Shield className="w-4 h-4 text-secondary" />
              <span className="font-semibold text-white text-xs">Safety Compliance Priority</span>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30">
              <Award className="w-4 h-4 text-primary" />
              <span className="font-semibold text-white text-xs">Quality Machinery</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-3xl animate-fade-in-up animation-delay-400">
            {[
              { value: "3+", label: "Years Experience" },
              { value: "100%", label: "Black Owned" },
              { value: "98%", label: "Breakdowns Resolved within SLA" },
              { value: "24/7", label: "Breakdown Support" },
            ].map((stat, index) => (
              <div key={index} className="text-center p-3 md:p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="text-2xl md:text-3xl lg:text-4xl font-black text-primary mb-1">{stat.value}</div>
                <div className="text-[10px] md:text-xs font-semibold text-white/80 uppercase tracking-wide leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
