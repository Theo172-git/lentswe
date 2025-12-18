import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import { ArrowRight, Forklift, Truck, Fuel, Construction, Eye, Target, Shield, Award, Heart, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const services = [
  {
    icon: Forklift,
    title: "Materials Handling",
    description: "Comprehensive forklift solutions tailored to your specifications",
    gradient: "from-teal to-primary",
    bgGradient: "from-teal/15 via-card to-primary/10",
  },
  {
    icon: Construction,
    title: "Heavy Machinery",
    description: "Custom machinery solutions for your construction projects",
    gradient: "from-secondary to-accent",
    bgGradient: "from-secondary/15 via-card to-accent/10",
  },
  {
    icon: Truck,
    title: "Transportation",
    description: "Local minerals transportation and logistics solutions",
    gradient: "from-primary to-teal-light",
    bgGradient: "from-primary/15 via-card to-teal-light/10",
  },
  {
    icon: Fuel,
    title: "Energy Solutions",
    description: "Environmentally friendly LPG gas supply",
    gradient: "from-accent to-secondary",
    bgGradient: "from-accent/15 via-card to-secondary/10",
  },
];

const Index = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      
      {/* Services Preview */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 blob-shape" />
        
        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <span className="text-sm font-bold text-primary uppercase tracking-widest mb-4 block">
              What We Offer
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4">
              Our <span className="text-gradient">Services</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive solutions designed for modern industry
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {services.map((service, index) => (
              <div
                key={index}
                className={`group relative bg-gradient-to-br ${service.bgGradient} rounded-3xl p-6 shadow-card hover:shadow-glow transition-all duration-500 border border-border hover:border-primary/30 hover:-translate-y-2 overflow-hidden`}
              >
                <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${service.gradient} opacity-20 rounded-bl-full`} />
                
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-extrabold text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/services">
              <Button variant="default" size="lg" className="font-bold">
                View All Services
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="section-padding bg-muted/30 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 blob-shape-2" />
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm font-bold text-primary uppercase tracking-widest mb-4 block">
                About Us
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
                Building <span className="text-gradient">Sustainable</span> Futures
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Lentswe Holding envisions a future where our personalized approach to materials handling 
                is both safe and sustainable for the community, suppliers and the employees we interact with.
              </p>
              <Link to="/about">
                <Button variant="default" size="lg" className="font-bold">
                  Learn More About Us
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Eye, title: "Vision", gradient: "from-teal to-primary" },
                { icon: Target, title: "Mission", gradient: "from-secondary to-accent" },
                { icon: Shield, title: "Safety", gradient: "from-primary to-teal-light" },
                { icon: Award, title: "Excellence", gradient: "from-accent to-secondary" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group p-6 rounded-2xl bg-gradient-to-br from-card to-muted/50 border border-border hover:border-primary/30 hover:shadow-glow transition-all duration-300 text-center"
                >
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg`}>
                    <item.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <h4 className="font-bold text-foreground">{item.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blob-shape animate-blob" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/10 blob-shape-2" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-6">
            Ready to Get <span className="text-gradient">Started?</span>
          </h2>
          <p className="text-xl text-primary-foreground/70 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your requirements and get a personalized quote
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="hero" size="xl" className="font-bold">
                Contact Us Now
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="heroOutline" size="xl" className="font-bold">
                View Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Index;
