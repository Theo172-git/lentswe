import { Forklift, Truck, Fuel, Construction, ArrowRight, Check, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExpandableCard from "@/components/ExpandableCard";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import forkliftImg from "@/assets/forklift-warehouse.jpg";
import machineryImg from "@/assets/heavy-machinery.jpg";
import transportImg from "@/assets/transport-truck.jpg";
import energyImg from "@/assets/energy-lpg.jpg";

const services = [
  {
    icon: Forklift,
    title: "Materials Handling Solutions",
    subtitle: "Forklift Rentals",
    description: "Comprehensive forklift solutions tailored to your specifications, from monthly to long-term rentals.",
    features: ["Forklift of your specifications", "Monthly to long term rentals", "New forklift procurement", "Maintenance included"],
    gradient: "from-rose-500 to-pink-600",
    image: forkliftImg,
  },
  {
    icon: Construction,
    title: "Heavy & Earth Moving Machinery",
    subtitle: "Construction Equipment",
    description: "Based on customer needs and specifications, we provide the right machinery for your construction projects.",
    features: ["Custom machinery solutions", "Project-based rentals", "Operator training available", "Safety compliance"],
    gradient: "from-teal to-emerald-500",
    image: machineryImg,
  },
  {
    icon: Truck,
    title: "Materials Transportation",
    subtitle: "Logistics Solutions",
    description: "Local minerals transportation and logistics solutions designed around your operational requirements.",
    features: ["Local minerals transport", "Logistics management", "Custom specifications", "Fleet tracking"],
    gradient: "from-violet-500 to-purple-600",
    image: transportImg,
  },
  {
    icon: Fuel,
    title: "Energy Solutions",
    subtitle: "LPG Gas Supply",
    description: "Environmentally friendly LPG gas supply for sustainable energy needs.",
    features: ["LPG Gas Supply", "Sustainable energy", "Reliable delivery", "Competitive pricing"],
    gradient: "from-amber-500 to-orange-600",
    image: energyImg,
  },
];

const additionalInfo = [
  {
    question: "Equipment Maintenance",
    answer: "All our equipment comes with comprehensive maintenance packages. Our skilled technicians ensure minimal downtime and maximum productivity for your operations.",
  },
  {
    question: "Safety Standards",
    answer: "We adhere to the highest safety standards in the industry. All operators are certified and equipment is regularly inspected to meet OHSA requirements.",
  },
  {
    question: "Flexible Contracts",
    answer: "Whether you need equipment for a day, month, or year, we offer flexible rental agreements tailored to your project timeline and budget.",
  },
  {
    question: "24/7 Support",
    answer: "Our dedicated support team is available around the clock to assist with any equipment issues or emergency requirements.",
  },
];

const Services = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Banner */}
      <section className="pt-40 pb-24 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 blob-shape animate-blob" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/10 blob-shape-2" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <span className="inline-block text-base font-black text-primary uppercase tracking-[0.2em] mb-6 px-6 py-3 bg-primary/10 rounded-full border border-primary/20">
            What We Offer
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-primary-foreground mb-8">
            Our <span className="text-gradient">Services</span>
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Comprehensive solutions designed to meet the unique demands of modern industry
          </p>
        </div>
      </section>

      {/* Services Grid with Expandable Cards */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute top-1/2 right-0 w-80 h-80 bg-primary/5 blob-shape translate-x-1/2" />
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-secondary/5 blob-shape-2" />

        <div className="container-custom relative z-10">
          <div className="grid md:grid-cols-2 gap-10 mb-20">
            {services.map((service, index) => (
              <ExpandableCard
                key={index}
                title={service.title}
                subtitle={service.subtitle}
                description={service.description}
                gradient={service.gradient}
                image={service.image}
                defaultOpen={index === 0}
              >
                <ul className="space-y-4 mb-6">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-4 text-white/90 text-lg font-semibold">
                      <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to="/contact">
                  <Button variant="secondary" size="lg" className="font-bold bg-white/20 hover:bg-white/30 text-white border-0 text-lg">
                    Get Quote
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </ExpandableCard>
            ))}
          </div>

          {/* Additional Info Accordion */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-foreground text-center mb-10">
              More <span className="text-gradient">Information</span>
            </h2>
            <Accordion type="single" collapsible className="space-y-4">
              {additionalInfo.map((item, index) => (
                <AccordionItem 
                  key={index} 
                  value={`info-${index}`}
                  className="border-2 border-border rounded-2xl px-8 overflow-hidden bg-card shadow-card"
                >
                  <AccordionTrigger className="text-xl font-bold text-foreground hover:no-underline py-6">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-lg pb-6 leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 blob-shape" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary-foreground mb-8">
            Ready to Get Started?
          </h2>
          <p className="text-xl md:text-2xl text-primary-foreground/70 mb-12 max-w-2xl mx-auto">
            Contact us today to discuss your requirements and get a personalized quote
          </p>
          <Link to="/contact">
            <Button variant="hero" size="xl" className="font-black text-lg">
              Contact Us Now
              <ArrowRight className="w-6 h-6" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Services;
