const partners = [
  { name: "TD Dimati Projects", type: "partner" },
  { name: "The Gas Box", type: "partner" },
  { name: "Kempston Group", type: "partner" },
  { name: "Clark", type: "partner" },
];

const clients = [
  { name: "Implats", subtitle: "Excellence in PGMs", type: "client" },
];

const PartnersSection = () => {
  return (
    <section id="partners" className="section-padding bg-muted/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-primary/5 blob-shape-2" />

      <div className="container-custom relative z-10">
        {/* Partners */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">
              Working Together
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Our Strategic <span className="text-gradient">Partners</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Trusted by some of the most innovative brands in the industry
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="group bg-card rounded-2xl p-8 flex items-center justify-center shadow-card hover:shadow-glow transition-all duration-300 border border-border hover:border-primary/30"
              >
                <span className="text-lg font-bold text-foreground/70 group-hover:text-primary transition-colors text-center">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Clients */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Our <span className="text-gradient">Clients</span>
            </h3>
            <p className="text-muted-foreground">
              Proud to serve industry leaders
            </p>
          </div>

          <div className="flex justify-center">
            {clients.map((client, index) => (
              <div
                key={index}
                className="group bg-card rounded-2xl p-10 flex flex-col items-center justify-center shadow-card hover:shadow-glow transition-all duration-300 border border-border hover:border-primary/30"
              >
                <span className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {client.name}
                </span>
                {client.subtitle && (
                  <span className="text-sm text-muted-foreground mt-1">
                    {client.subtitle}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
