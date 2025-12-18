import { Target, Eye, Shield, Users, Lightbulb, Heart, Award, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => {
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
            About Us
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground mb-6">
            Building <span className="text-gradient">Sustainable</span> Futures
          </h1>
          <p className="text-xl text-primary-foreground/70 max-w-3xl mx-auto">
            Your trusted partner in materials handling, heavy machinery, transportation, and energy solutions
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 blob-shape" />
        
        <div className="container-custom relative z-10">
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {/* Vision Card */}
            <div className="group relative bg-gradient-to-br from-teal/10 via-card to-primary/5 rounded-3xl p-8 md:p-10 shadow-card hover:shadow-glow transition-all duration-500 border border-teal/30 hover:border-primary overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-teal flex items-center justify-center shadow-glow">
                    <Eye className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-3xl font-extrabold text-foreground tracking-tight">Vision</h3>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Lentswe Holding envisions a future where our personalized approach to materials handling 
                  is both safe and sustainable for the community, suppliers and the employees we interact with. 
                  We are at the forefront of the industry but also reflects our deep commitment to 
                  tailor-made, client-centric excellence.
                </p>
              </div>
            </div>

            {/* Mission Card */}
            <div className="group relative bg-gradient-to-br from-secondary/10 via-card to-accent/5 rounded-3xl p-8 md:p-10 shadow-card hover:shadow-glow transition-all duration-500 border border-secondary/30 hover:border-secondary overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-secondary/20 to-transparent rounded-bl-full" />
              <div className="relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center shadow-glow">
                    <Target className="w-8 h-8 text-secondary-foreground" />
                  </div>
                  <h3 className="text-3xl font-extrabold text-foreground tracking-tight">Mission</h3>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our mission at Lentswe Holding is to provide sustainable and safe, materials handling solutions, 
                  Environmentally friendly energy solutions i.e. LPG gas and plant and machinery solutions that 
                  echo the distinctive needs of our clients.
                </p>
              </div>
            </div>
          </div>

          {/* Core Values */}
          <div className="text-center mb-12">
            <span className="text-sm font-bold text-primary uppercase tracking-widest mb-4 block">
              Our Principles
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
              Core <span className="text-gradient">Values</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "Safety First",
                description: "Prioritizing wellbeing in every operation",
                gradient: "from-teal to-primary",
                bgGradient: "from-teal/10 to-primary/5",
              },
              {
                icon: Award,
                title: "Excellence",
                description: "Delivering exceptional quality always",
                gradient: "from-secondary to-accent",
                bgGradient: "from-secondary/10 to-accent/5",
              },
              {
                icon: Heart,
                title: "Partnership",
                description: "Building lasting relationships",
                gradient: "from-primary to-teal-light",
                bgGradient: "from-primary/10 to-teal-light/5",
              },
              {
                icon: Lightbulb,
                title: "Innovation",
                description: "Embracing sustainable technologies",
                gradient: "from-accent to-secondary",
                bgGradient: "from-accent/10 to-secondary/5",
              },
            ].map((value, index) => (
              <div
                key={index}
                className={`group text-center p-8 rounded-3xl bg-gradient-to-br ${value.bgGradient} border border-border hover:border-primary/30 hover:shadow-glow transition-all duration-500 hover:-translate-y-2`}
              >
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${value.gradient} flex items-center justify-center shadow-lg`}>
                  <value.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h4 className="font-bold text-xl text-foreground mb-3">
                  {value.title}
                </h4>
                <p className="text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;
