import partnersClientsImg from "@/assets/partners-clients.png";

const PartnersSection = () => {
  return (
    <section id="partners" className="section-padding bg-muted/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-primary/5 blob-shape-2" />

      <div className="container-custom relative z-10">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">
            Working Together
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our <span className="text-gradient">Partners & Clients</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
            Trusted by industry leaders across Southern Africa
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
            <span className="text-sm font-bold text-primary">3+ Years of Trusted Partnerships</span>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="bg-card rounded-3xl p-8 shadow-card border border-border max-w-4xl w-full">
            <img 
              src={partnersClientsImg} 
              alt="Our Partners and Clients" 
              className="w-full h-auto rounded-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
