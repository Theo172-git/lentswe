import { Award, Users, Target, Briefcase } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExpandableCard from "@/components/ExpandableCard";
import PartnersSection from "@/components/PartnersSection";
import mpapiImg from "@/assets/mpapi-tsomele.png";
import reabetsweImg from "@/assets/reabetswe-liale.png";
import teamPhoto from "@/assets/team-photo.jpg";

const teamMembers = [
  {
    name: "Reabetswe Llale",
    role: "Director",
    position: "Managing Director & CEO",
    bio: "A visionary leader with over a decade of experience in the materials handling industry, driving sustainable growth and innovation.",
    image: reabetsweImg,
    gradient: "from-teal to-emerald-500",
  },
  {
    name: "Mpapi Tsomele",
    role: "Director",
    position: "Chief of Engineering & Technology",
    bio: "Technical expert overseeing all engineering operations and ensuring the highest standards of equipment performance and safety.",
    image: mpapiImg,
    gradient: "from-violet-500 to-purple-600",
  },
];

const Team = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Banner */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-24 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 blob-shape animate-blob" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/10 blob-shape-2" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <span className="inline-block text-base font-black text-primary uppercase tracking-[0.2em] mb-6 px-6 py-3 bg-primary/10 rounded-full border border-primary/20">
            Leadership
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-primary-foreground mb-8">
            Meet The <span className="text-gradient">Team</span>
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Experienced professionals driving innovation and excellence
          </p>
        </div>
      </section>

      {/* Team Photo Section */}
      <section className="py-12 bg-background">
        <div className="container-custom">
          <div className="rounded-3xl overflow-hidden shadow-card border border-border">
            <img 
              src={teamPhoto} 
              alt="Lentswe Team" 
              className="w-full h-64 md:h-80 lg:h-96 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Team Section with Expandable Cards */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 blob-shape animate-blob pointer-events-none" />

        <div className="container-custom relative z-10">
          {/* Team Grid */}
          <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto mb-24">
          {teamMembers.map((member, index) => (
              <ExpandableCard
                key={index}
                title={member.name}
                subtitle={member.role}
                description={member.position}
                gradient={member.gradient}
                defaultOpen={true}
              >
                <div className="flex items-start gap-6">
                  <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-white/30 flex-shrink-0">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-white/90 text-lg leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              </ExpandableCard>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { icon: Award, value: "3+", label: "Years Experience", gradient: "from-teal to-emerald-500" },
              { icon: Users, value: "100%", label: "Black Owned", gradient: "from-rose-500 to-pink-600" },
              { icon: Target, value: "98%", label: "Breakdowns Resolved within SLA", gradient: "from-violet-500 to-purple-600" },
              { icon: Briefcase, value: "24/7", label: "Breakdown Support", gradient: "from-amber-500 to-orange-600" },
            ].map((stat, index) => (
              <div
                key={index}
                className="group text-center p-4 md:p-8 rounded-3xl bg-card border-2 border-border hover:border-primary/30 hover:shadow-glow transition-all duration-300"
              >
                <div className={`w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-5 rounded-2xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                </div>
                <div className="text-3xl md:text-5xl font-black text-foreground mb-1 md:mb-2">{stat.value}</div>
                <div className="text-xs md:text-base text-muted-foreground font-bold uppercase tracking-wide leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <PartnersSection />

      <Footer />
    </main>
  );
};

export default Team;
