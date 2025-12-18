import { Forklift, Truck, Fuel, Construction, ArrowRight, Cog, Wrench, Package, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const services = [
  {
    icon: Forklift,
    title: "Materials Handling Solutions",
    description: "Comprehensive forklift solutions tailored to your specifications, from monthly to long-term rentals.",
    features: ["Forklift of your specifications", "Monthly to long term rentals", "New forklift procurement"],
    gradient: "from-teal to-primary",
    bgGradient: "from-teal/15 via-card to-primary/10",
    borderColor: "border-teal/30 hover:border-teal",
  },
  {
    icon: Construction,
    title: "Heavy & Earth Moving Machinery",
    description: "Based on customer needs and specifications, we provide the right machinery for your construction projects.",
    features: ["Custom machinery solutions", "Project-based rentals", "Operator training available"],
    gradient: "from-secondary to-accent",
    bgGradient: "from-secondary/15 via-card to-accent/10",
    borderColor: "border-secondary/30 hover:border-secondary",
  },
  {
    icon: Truck,
    title: "Materials Transportation",
    description: "Local minerals transportation and logistics solutions designed around your operational requirements.",
    features: ["Local minerals transport", "Logistics management", "Custom specifications"],
    gradient: "from-primary to-teal-light",
    bgGradient: "from-primary/15 via-card to-teal-light/10",
    borderColor: "border-primary/30 hover:border-primary",
  },
  {
    icon: Fuel,
    title: "Energy Solutions",
    description: "Environmentally friendly LPG gas supply for sustainable energy needs.",
    features: ["LPG Gas Supply", "Sustainable energy", "Reliable delivery"],
    gradient: "from-accent to-secondary",
    bgGradient: "from-accent/15 via-card to-secondary/10",
    borderColor: "border-accent/30 hover:border-accent",
  },
];

const Services = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Banner */}
      <section className="pt-32 pb-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 blob-shape animate-blob" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/10 blob-shape-2" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <span className="inline-block text-sm font-bold text-primary uppercase tracking-widest mb-4 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
            What We Offer
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground mb-6">
            Our <span className="text-gradient">Services</span>
          </h1>
          <p className="text-xl text-primary-foreground/70 max-w-3xl mx-auto">
            Comprehensive solutions designed to meet the unique demands of modern industry
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-64 h-64 bg-primary/5 blob-shape translate-x-1/2" />
        <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-secondary/5 blob-shape-2" />

        <div className="container-custom relative z-10">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`group relative bg-gradient-to-br ${service.bgGradient} rounded-3xl p-8 shadow-card hover:shadow-glow transition-all duration-500 border ${service.borderColor} hover:-translate-y-2 overflow-hidden`}
              >
                {/* Decorative corner */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${service.gradient} opacity-20 rounded-bl-full`} />
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-10 h-10 text-primary-foreground" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-extrabold text-foreground mb-3 tracking-tight">{service.title}</h3>
                  <p className="text-lg text-muted-foreground mb-6">{service.description}</p>

                  {/* Features List */}
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center gap-3 text-muted-foreground">
                        <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient}`} />
                        <span className="font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link to="/contact">
                    <Button variant="ghost" className="group/btn p-0 h-auto text-primary hover:text-primary font-bold text-lg">
                      Get Quote
                      <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blob-shape" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-foreground/70 mb-8 max-w-2xl mx-auto">
            Contact us today to discuss your requirements and get a personalized quote
          </p>
          <Link to="/contact">
            <Button variant="hero" size="xl">
              Contact Us Now
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Services;
