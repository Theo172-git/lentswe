import { ArrowRight, Shield, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroBgImg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden" aria-label="Hero section">
      {/* Background Image - Clean, no blur */}
      <div className="absolute inset-0" aria-hidden="true">
        <img 
          src={heroBgImg} 
          alt="" 
          className="w-full h-full object-cover object-center"
        />
        {/* Subtle gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      <div className="container-custom relative z-10 pt-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary/20 backdrop-blur-sm rounded-full border border-primary/30 mb-10 animate-fade-in">
            <span className="w-3 h-3 bg-primary rounded-full animate-pulse" />
            <span className="text-base md:text-lg font-black text-primary tracking-wide uppercase">Sustainable Solutions Provider</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-black text-white leading-[1.1] mb-8 animate-fade-in-up tracking-tight drop-shadow-lg">
            Powering Progress with{" "}
            <span className="text-gradient">Sustainable</span>{" "}
            Solutions
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl lg:text-3xl text-white/90 max-w-3xl mx-auto mb-12 animate-fade-in-up animation-delay-200 leading-relaxed drop-shadow-md">
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

          {/* Safety & Quality Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12 animate-fade-in-up animation-delay-350">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-secondary/30 backdrop-blur-sm rounded-full border border-secondary/40">
              <Shield className="w-5 h-5 text-secondary" />
              <span className="font-bold text-white text-sm">Safety Compliance Priority</span>
            </div>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/30 backdrop-blur-sm rounded-full border border-primary/40">
              <Award className="w-5 h-5 text-primary" />
              <span className="font-bold text-white text-sm">Quality Machinery</span>
            </div>
          </div>

          {/* Stats - Lifted up from boundary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto animate-fade-in-up animation-delay-400 pb-8">
            {[
              { value: "3+", label: "Years Experience" },
              { value: "100%", label: "Black Owned" },
              { value: "98%", label: "Breakdowns Resolved within SLA" },
              { value: "24/7", label: "Breakdown Support" },
            ].map((stat, index) => (
              <div key={index} className="text-center p-4 md:p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl">
                <div className="text-3xl md:text-5xl lg:text-6xl font-black text-primary mb-1 md:mb-2 drop-shadow-lg">{stat.value}</div>
                <div className="text-xs md:text-sm font-bold text-white/80 uppercase tracking-wide leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
