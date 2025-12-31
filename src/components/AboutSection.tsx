import { Target, Eye, Shield, Users, Leaf, Recycle } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="section-padding bg-background relative overflow-hidden">
      {/* Decorative shapes */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 blob-shape" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 blob-shape-2" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">
            About Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Vision & <span className="text-gradient">Mission</span>
          </h2>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {/* Vision Card */}
          <div className="group bg-card rounded-3xl p-8 md:p-10 shadow-card hover:shadow-glow transition-all duration-500 border border-border hover:border-primary/30">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:shadow-glow transition-all duration-300">
                <Eye className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Vision</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Lentswe Holding envisions a future where our personalized approach to materials handling 
              is both safe and sustainable for the community, suppliers and the employees we interact with. 
              We are at the forefront of the industry but also reflects our deep commitment to 
              tailor-made, client-centric excellence.
            </p>
          </div>

          {/* Mission Card */}
          <div className="group bg-card rounded-3xl p-8 md:p-10 shadow-card hover:shadow-glow transition-all duration-500 border border-border hover:border-primary/30">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary group-hover:shadow-glow transition-all duration-300">
                <Target className="w-7 h-7 text-secondary group-hover:text-secondary-foreground transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Mission</h3>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Our mission at Lentswe Holding is to provide sustainable and safe, materials handling solutions, 
              Environmentally friendly energy solutions i.e. LPG gas and plant and machinery solutions that 
              echo the distinctive needs of our clients. By infusing a personalized touch into every aspect 
              of our work, we aim to create an enduring impact that goes beyond industry norms, fostering 
              mutual growth and success.
            </p>
          </div>
        </div>

        {/* Environmental Commitment */}
        <div className="mb-20 bg-gradient-to-br from-emerald-500/10 via-teal/5 to-primary/10 rounded-3xl p-8 md:p-12 border border-emerald-500/20">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-500 to-teal flex items-center justify-center shadow-lg">
                <Leaf className="w-12 h-12 text-white" />
              </div>
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                Our <span className="text-emerald-500">Environmental</span> Commitment
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                At Lentswe Holding, sustainability isn't just a goal—it's our core operating principle. 
                We prioritize environmentally friendly machinery, including electric and LPG-powered forklifts 
                that significantly reduce carbon emissions compared to traditional diesel equipment.
              </p>
              <ul className="grid sm:grid-cols-2 gap-3">
                {[
                  "Electric forklift fleet reducing emissions",
                  "LPG energy solutions for cleaner operations",
                  "Carbon footprint tracking & reduction",
                  "Sustainable equipment maintenance practices",
                  "Eco-conscious supply chain partnerships",
                  "Green technology investments",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Our Core Values</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Shield,
              title: "Safety First",
              description: "Prioritizing the wellbeing of our team and clients in every operation",
            },
            {
              icon: Leaf,
              title: "Sustainability",
              description: "Committed to eco-friendly solutions that protect our environment",
            },
            {
              icon: Users,
              title: "Partnership",
              description: "Building lasting relationships through trust and collaboration",
            },
            {
              icon: Recycle,
              title: "Green Innovation",
              description: "Embracing clean technologies for a sustainable tomorrow",
            },
          ].map((value, index) => (
            <div
              key={index}
              className="group text-center p-6 rounded-2xl bg-muted/50 hover:bg-primary hover:shadow-glow transition-all duration-300"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary-foreground/20 transition-colors">
                <value.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
              </div>
              <h4 className="font-semibold text-foreground group-hover:text-primary-foreground mb-2 transition-colors">
                {value.title}
              </h4>
              <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/80 transition-colors">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
