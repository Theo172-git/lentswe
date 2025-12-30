import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import ExpandableCard from "@/components/ExpandableCard";
import PartnersSection from "@/components/PartnersSection";
import { ArrowRight, Forklift, Truck, Fuel, Construction, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import forkliftImg from "@/assets/forklift-warehouse.jpg";
import machineryImg from "@/assets/heavy-machinery.jpg";
import transportImg from "@/assets/transport-truck.jpg";
import energyImg from "@/assets/energy-lpg.jpg";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import portfolio4 from "@/assets/portfolio-4.jpg";
import portfolio5 from "@/assets/portfolio-5.jpg";
import portfolio6 from "@/assets/portfolio-6.jpg";
import portfolio7 from "@/assets/portfolio-7.jpg";

const portfolioImages = [
  { src: portfolio1, alt: "Lentswe Operations 1" },
  { src: portfolio2, alt: "Lentswe Operations 2" },
  { src: portfolio3, alt: "Lentswe Operations 3" },
  { src: portfolio4, alt: "Lentswe Operations 4" },
  { src: portfolio5, alt: "Lentswe Operations 5" },
  { src: portfolio6, alt: "Lentswe Operations 6" },
  { src: portfolio7, alt: "Lentswe Operations 7" },
];

const services = [
  {
    title: "Materials Handling",
    subtitle: "Forklift Solutions",
    description: "Comprehensive forklift solutions tailored to your specifications. From monthly to long-term rentals, we provide the equipment you need.",
    gradient: "from-rose-500 to-pink-600",
    image: forkliftImg,
    features: ["Custom specifications", "Long-term rentals", "New procurement"],
  },
  {
    title: "Heavy Machinery",
    subtitle: "Earth Moving",
    description: "Custom machinery solutions for your construction projects. Based on customer needs and specifications.",
    gradient: "from-teal to-emerald-500",
    image: machineryImg,
    features: ["Project-based rentals", "Operator training", "Maintenance included"],
  },
  {
    title: "Transportation",
    subtitle: "Logistics Solutions",
    description: "Local minerals transportation and logistics solutions designed around your operational requirements.",
    gradient: "from-violet-500 to-purple-600",
    image: transportImg,
    features: ["Minerals transport", "Fleet management", "Custom logistics"],
  },
  {
    title: "Energy Solutions",
    subtitle: "LPG Supply",
    description: "Environmentally friendly LPG gas supply for sustainable energy needs with reliable delivery.",
    gradient: "from-amber-500 to-orange-600",
    image: energyImg,
    features: ["Sustainable energy", "Reliable delivery", "Competitive pricing"],
  },
];

const faqs = [
  {
    question: "What areas do you service?",
    answer: "We primarily service the North West Province of South Africa, with our headquarters in Rustenburg. We can accommodate projects across Southern Africa.",
  },
  {
    question: "How do I request a quote?",
    answer: "You can request a quote by contacting us via phone, email, or through our contact form. We'll respond within 24 business hours with a personalized quote.",
  },
  {
    question: "Do you offer long-term rental agreements?",
    answer: "Yes, we offer flexible rental agreements ranging from monthly to multi-year contracts, tailored to your project requirements.",
  },
  {
    question: "What types of forklifts do you provide?",
    answer: "We provide a wide range of forklifts including electric, diesel, and LPG models, from compact warehouse units to heavy-duty industrial equipment.",
  },
];

const Index = () => {
  return (
    <main id="main-content" className="min-h-screen">
      <Navbar />
      <HeroSection />

      {/* Portfolio Gallery Section */}
      <section className="section-padding bg-muted/20 relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="text-center mb-12">
            <span className="section-subtitle">Our Work</span>
            <h2 className="section-title mb-6">
              Project <span className="text-gradient">Portfolio</span>
            </h2>
            <p className="section-description">
              Excellence in action across our operations
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {portfolioImages.map((image, index) => (
              <div
                key={index}
                className="group relative rounded-2xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-500 aspect-square"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Services Section with Expandable Cards */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blob-shape" />
        
        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <span className="section-subtitle">What We Offer</span>
            <h2 className="section-title mb-6">
              Our <span className="text-gradient">Services</span>
            </h2>
            <p className="section-description">
              Comprehensive solutions designed for modern industry
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {services.map((service, index) => (
              <ExpandableCard
                key={index}
                title={service.title}
                subtitle={service.subtitle}
                description={service.description}
                gradient={service.gradient}
                image={service.image}
              >
                <ul className="space-y-3">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="flex items-center gap-3 text-white/90 text-lg font-medium">
                      <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                        <Check className="w-4 h-4" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to="/services" className="inline-block mt-6">
                  <Button variant="secondary" size="lg" className="font-bold bg-white/20 hover:bg-white/30 text-white border-0">
                    Learn More
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </ExpandableCard>
            ))}
          </div>

          <div className="text-center">
            <Link to="/services">
              <Button variant="default" size="xl" className="font-black text-lg">
                View All Services
                <ArrowRight className="w-6 h-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview with Accordion */}
      <section className="section-padding bg-muted/30 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 blob-shape-2" />
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-subtitle">About Us</span>
              <h2 className="section-title mb-8">
                Building <span className="text-gradient">Sustainable</span> Futures
              </h2>
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                Lentswe Holding envisions a future where our personalized approach to materials handling 
                is both safe and sustainable for the community, suppliers and the employees we interact with.
              </p>
              <Link to="/about">
                <Button variant="default" size="xl" className="font-black text-lg">
                  Learn More About Us
                  <ArrowRight className="w-6 h-6" />
                </Button>
              </Link>
            </div>
            
            {/* FAQ Accordion */}
            <div className="bg-card rounded-3xl p-8 shadow-card border border-border">
              <h3 className="text-2xl font-black text-foreground mb-6">Frequently Asked Questions</h3>
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`faq-${index}`}
                    className="border border-border rounded-2xl px-6 overflow-hidden bg-background/50"
                  >
                    <AccordionTrigger className="text-lg font-bold text-foreground hover:no-underline py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-base pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <PartnersSection />

      {/* CTA Section */}
      <section className="py-28 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 blob-shape animate-blob" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 blob-shape-2" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary-foreground mb-8">
            Ready to Get <span className="text-gradient">Started?</span>
          </h2>
          <p className="text-xl md:text-2xl text-primary-foreground/70 mb-12 max-w-2xl mx-auto">
            Contact us today to discuss your requirements and get a personalized quote
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/contact">
              <Button variant="hero" size="xl" className="font-black text-lg">
                Contact Us Now
                <ArrowRight className="w-6 h-6" />
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="heroOutline" size="xl" className="font-black text-lg">
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
