import { Forklift, Truck, Fuel, Construction, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Forklift,
    title: "Materials Handling Solutions",
    description: "Comprehensive forklift solutions tailored to your specifications, from monthly to long-term rentals.",
    features: ["Forklift of your specifications", "Monthly to long term rentals", "New forklift procurement"],
    color: "primary",
  },
  {
    icon: Construction,
    title: "Heavy & Earth Moving Machinery",
    description: "Based on customer needs and specifications, we provide the right machinery for your construction projects.",
    features: ["Custom machinery solutions", "Project-based rentals", "Operator training available"],
    color: "secondary",
  },
  {
    icon: Truck,
    title: "Materials Transportation",
    description: "Local minerals transportation and logistics solutions designed around your operational requirements.",
    features: ["Local minerals transport", "Logistics management", "Custom specifications"],
    color: "primary",
  },
  {
    icon: Fuel,
    title: "Energy Solutions",
    description: "Environmentally friendly LPG gas supply for sustainable energy needs.",
    features: ["LPG Gas Supply", "Sustainable energy", "Reliable delivery"],
    color: "secondary",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="section-padding bg-muted/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-primary/5 blob-shape translate-x-1/2" />
      <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-secondary/5 blob-shape-2" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">
            What We Offer
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive solutions designed to meet the unique demands of modern industry
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-card rounded-3xl p-8 shadow-card hover:shadow-glow transition-all duration-500 border border-border hover:border-primary/30 hover:-translate-y-2"
            >
              {/* Icon */}
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${
                  service.color === "primary"
                    ? "bg-primary/10 group-hover:bg-primary"
                    : "bg-secondary/10 group-hover:bg-secondary"
                }`}
              >
                <service.icon
                  className={`w-8 h-8 transition-colors ${
                    service.color === "primary"
                      ? "text-primary group-hover:text-primary-foreground"
                      : "text-secondary group-hover:text-secondary-foreground"
                  }`}
                />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>
              <p className="text-muted-foreground mb-6">{service.description}</p>

              {/* Features List */}
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className={`w-1.5 h-1.5 rounded-full ${service.color === "primary" ? "bg-primary" : "bg-secondary"}`} />
                    {feature}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button variant="ghost" className="group/btn p-0 h-auto text-primary hover:text-primary font-semibold">
                Learn More
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
