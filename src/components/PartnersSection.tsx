import { Handshake } from "lucide-react";
import machinery7 from "@/assets/machinery-7.jpg";

const partners = [
  { name: "TD Dimati Projects", logo: "TD" },
  { name: "Kempston Group", logo: "KG" },
];

const PartnersSection = () => {
  return (
    <section id="partners" className="section-padding bg-muted/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-primary/5 blob-shape-2 pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">
            Working Together
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our Strategic <span className="text-gradient">Partners</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
            Trusted by industry leaders across Southern Africa
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
            <Handshake className="w-4 h-4 text-primary" />
            <span className="text-sm font-bold text-primary">3+ Years of Trusted Partnerships</span>
          </div>
        </div>

        {/* Partners Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
          {partners.map((partner, index) => (
            <div 
              key={index}
              className="bg-card rounded-2xl p-8 shadow-card border border-border hover:shadow-glow hover:border-primary/30 transition-all duration-300 text-center"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mx-auto mb-4 text-2xl font-black text-white">
                {partner.logo}
              </div>
              <h3 className="text-xl font-bold text-foreground">{partner.name}</h3>
            </div>
          ))}
        </div>

        {/* Image Divider */}
        <div className="rounded-3xl overflow-hidden shadow-card border border-border">
          <img 
            src={machinery7} 
            alt="Lentswe Operations Partnership" 
            className="w-full h-64 md:h-80 object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
