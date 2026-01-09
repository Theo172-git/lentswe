import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import ExpandableCard from "@/components/ExpandableCard";
import PartnersSection from "@/components/PartnersSection";
import ForkliftMarketplace from "@/components/ForkliftMarketplace";
import { ArrowRight, Forklift, Truck, Fuel, Construction, Check, Settings, Shield, Clock, Wrench, Pickaxe } from "lucide-react";
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
import driverForklift1 from "@/assets/driver-forklift-1.jpg";
import driverForklift2 from "@/assets/driver-forklift-2.jpg";
import driverForklift3 from "@/assets/driver-forklift-3.jpg";
import machinery3 from "@/assets/machinery-3.jpg";
import machinery11 from "@/assets/machinery-11.jpg";

const portfolioImages = [
  { src: portfolio1, alt: "Lentswe Operations 1" },
  { src: portfolio2, alt: "Lentswe Operations 2" },
  { src: portfolio3, alt: "Lentswe Operations 3" },
  { src: portfolio4, alt: "Lentswe Operations 4" },
  { src: portfolio5, alt: "Lentswe Operations 5" },
  { src: portfolio6, alt: "Lentswe Operations 6" },
  { src: portfolio7, alt: "Lentswe Operations 7" },
];

const forkliftSolutions = [
  {
    title: "Short-Term Rental",
    description: "Flexible daily, weekly, or monthly forklift rentals for seasonal demands or project peaks.",
    icon: Clock,
    cta: "Get Rental Quote",
  },
  {
    title: "Long-Term Lease",
    description: "Cost-effective multi-year agreements with maintenance included. Reduce overhead, maximize uptime.",
    icon: Shield,
    cta: "Explore Lease Options",
  },
  {
    title: "Custom Procurement",
    description: "Need specific specs? We source and deliver forklifts tailored to your exact operational requirements.",
    icon: Settings,
    cta: "Request Specifications",
  },
  {
    title: "Maintenance & Support",
    description: "24/7 breakdown support, scheduled servicing, and operator training to keep your fleet running.",
    icon: Wrench,
    cta: "View Support Plans",
  },
];

const forkliftShowcase = [
  { src: portfolio1, label: "Warehouse Operations" },
  { src: portfolio3, label: "Loading & Unloading" },
  { src: portfolio5, label: "Industrial Handling" },
  { src: driverForklift1, label: "Skilled Operators" },
  { src: driverForklift2, label: "Safety First" },
  { src: portfolio7, label: "Heavy Duty Fleet" },
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
    title: "Mining Equipment",
    subtitle: "Heavy Machinery",
    description: "Specialized mining equipment solutions based on customer needs. Earth moving, drilling, and extraction machinery.",
    gradient: "from-teal to-emerald-500",
    image: machineryImg,
    features: ["Mining-grade equipment", "Operator training", "Maintenance included"],
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
    subtitle: "Power & Fuel",
    description: "Comprehensive energy solutions including LPG gas supply, generator rentals, and electric vehicle charging infrastructure.",
    gradient: "from-amber-500 to-orange-600",
    image: energyImg,
    features: ["LPG Gas Supply", "Generator Rentals", "EV Charging Stations"],
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
      
      {/* Forklift Rental Marketplace */}
      <ForkliftMarketplace />

      {/* Image Divider - Clean, full-width, no crop */}
      <section className="py-6">
        <div className="container-custom">
          <div className="rounded-2xl overflow-hidden shadow-xl border border-border/50 bg-muted/30">
            <img 
              src={machinery3} 
              alt="Lentswe Heavy Equipment" 
              className="w-full h-auto object-contain will-change-transform"
              style={{ 
                maxHeight: '500px',
                imageRendering: 'crisp-edges',
                transform: 'translateZ(0)',
              }}
              loading="lazy"
            />
          </div>
        </div>
      </section>

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
                className="group relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 aspect-square"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform"
                  style={{ 
                    imageRendering: 'crisp-edges',
                    transform: 'translateZ(0)',
                  }}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Forklift Solutions Section */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute top-20 left-0 w-72 h-72 bg-primary/5 blob-shape-2 pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-96 h-96 bg-secondary/5 blob-shape pointer-events-none" />
        
        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <span className="section-subtitle">Core Expertise</span>
            <h2 className="section-title mb-6">
              Forklift <span className="text-gradient">Solutions</span>
            </h2>
            <p className="section-description max-w-3xl mx-auto">
              From short-term rentals to full fleet management — we deliver the right forklift solution for your business needs
            </p>
          </div>

          {/* Solutions Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {forkliftSolutions.map((solution, index) => (
              <div
                key={index}
                className="group bg-card border border-border rounded-2xl p-6 hover:shadow-glow hover:border-primary/30 transition-all duration-300 hover-lift"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <solution.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{solution.title}</h3>
                <p className="text-muted-foreground mb-5 leading-relaxed">{solution.description}</p>
                <Link to="/contact">
                  <Button variant="ghost" className="p-0 h-auto font-semibold text-primary hover:text-primary/80 group/btn">
                    {solution.cta}
                    <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          {/* Showcase Gallery */}
          <div className="bg-muted/30 rounded-3xl p-6 md:p-10 border border-border">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8 gap-4">
              <div>
                <h3 className="text-xl md:text-2xl font-black text-foreground mb-2">Serving Key Industries</h3>
                <p className="text-muted-foreground text-sm md:text-base">Our equipment and operators delivering excellence across sectors</p>
              </div>
              <Link to="/products">
                <Button variant="default" className="font-bold w-full md:w-auto">
                  View Full Fleet
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {forkliftShowcase.map((item, index) => (
                <div
                  key={index}
                  className="group relative rounded-xl overflow-hidden aspect-[4/3] shadow-lg hover:shadow-xl transition-all duration-500"
                >
                  <img
                    src={item.src}
                    alt={item.label}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 will-change-transform"
                    style={{ 
                      imageRendering: 'crisp-edges',
                      transform: 'translateZ(0)',
                    }}
                    loading="lazy"
                  />
                  {/* Subtle gradient - less aggressive overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4">
                    <span className="inline-block px-2 md:px-3 py-1 bg-primary text-primary-foreground text-xs md:text-sm font-semibold rounded-full shadow-md">
                      {item.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "50+", label: "Forklifts Available" },
              { value: "24/7", label: "Support Coverage" },
              { value: "3+", label: "Years Experience" },
              { value: "100%", label: "Client Satisfaction" },
            ].map((stat, index) => (
              <div key={index} className="text-center p-6 bg-card rounded-2xl border border-border hover-lift transition-all duration-300">
                <div className="text-3xl md:text-4xl font-black text-gradient mb-2">{stat.value}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Services Section with Expandable Cards */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blob-shape pointer-events-none" />
        
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

          <div className="grid md:grid-cols-2 gap-8 mb-12">
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

          {/* Image Divider - Clean, full view */}
          <div className="rounded-2xl overflow-hidden shadow-xl border border-border/50 mb-12 bg-muted/30">
            <img 
              src={machinery11} 
              alt="Lentswe Fleet" 
              className="w-full h-auto object-contain will-change-transform"
              style={{ 
                maxHeight: '500px',
                imageRendering: 'crisp-edges',
                transform: 'translateZ(0)',
              }}
              loading="lazy"
            />
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
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 blob-shape-2 pointer-events-none" />
        
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
      <section className="py-20 md:py-28 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
