import { Target, Eye, Shield, Users, Lightbulb, Heart, Award, TrendingUp, Plus } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExpandableCard from "@/components/ExpandableCard";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const About = () => {
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
            About Us
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-primary-foreground mb-8">
            Building <span className="text-gradient">Sustainable</span> Futures
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Your trusted partner in materials handling, heavy machinery, transportation, and energy solutions
          </p>
        </div>
      </section>

      {/* Vision & Mission with Expandable Cards */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blob-shape" />
        
        <div className="container-custom relative z-10">
          <div className="grid md:grid-cols-2 gap-10 mb-24">
            {/* Vision Card */}
            <ExpandableCard
              title="Our Vision"
              subtitle="Looking Forward"
              gradient="from-teal to-emerald-500"
              defaultOpen={true}
            >
              <p className="text-white/90 text-xl leading-relaxed">
                Lentswe Holding envisions a future where our personalized approach to materials handling 
                is both safe and sustainable for the community, suppliers and the employees we interact with. 
                We are at the forefront of the industry but also reflects our deep commitment to 
                tailor-made, client-centric excellence.
              </p>
            </ExpandableCard>

            {/* Mission Card */}
            <ExpandableCard
              title="Our Mission"
              subtitle="What Drives Us"
              gradient="from-violet-500 to-purple-600"
            >
              <p className="text-white/90 text-xl leading-relaxed">
                Our mission at Lentswe Holding is to provide sustainable and safe, materials handling solutions, 
                Environmentally friendly energy solutions i.e. LPG gas and plant and machinery solutions that 
                echo the distinctive needs of our clients.
              </p>
            </ExpandableCard>
          </div>

          {/* Core Values with Accordion */}
          <div className="text-center mb-12">
            <span className="section-subtitle">Our Principles</span>
            <h2 className="section-title mb-4">
              Core <span className="text-gradient">Values</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  icon: Shield,
                  title: "Safety First",
                  description: "We prioritize the wellbeing and safety of our employees, clients, and communities in every operation we undertake. Safety is not just a policy—it's our core commitment.",
                  gradient: "from-teal to-primary",
                },
                {
                  icon: Award,
                  title: "Excellence",
                  description: "We strive to deliver exceptional quality in every service, exceeding expectations and setting new standards in the materials handling industry.",
                  gradient: "from-rose-500 to-pink-600",
                },
                {
                  icon: Heart,
                  title: "Partnership",
                  description: "We build lasting relationships with our clients, suppliers, and employees based on trust, respect, and mutual growth. Your success is our success.",
                  gradient: "from-violet-500 to-purple-600",
                },
                {
                  icon: Lightbulb,
                  title: "Innovation",
                  description: "We embrace sustainable technologies and forward-thinking solutions to drive efficiency and reduce environmental impact in all our operations.",
                  gradient: "from-amber-500 to-orange-600",
                },
              ].map((value, index) => (
                <AccordionItem 
                  key={index} 
                  value={`value-${index}`}
                  className="border-2 border-border rounded-2xl px-8 overflow-hidden bg-card shadow-card hover:shadow-glow transition-shadow"
                >
                  <AccordionTrigger className="hover:no-underline py-6">
                    <div className="flex items-center gap-5">
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${value.gradient} flex items-center justify-center shadow-lg`}>
                        <value.icon className="w-7 h-7 text-white" />
                      </div>
                      <span className="text-xl md:text-2xl font-bold text-foreground">{value.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-lg pb-6 pl-20 leading-relaxed">
                    {value.description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default About;
