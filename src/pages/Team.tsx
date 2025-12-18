import { Linkedin, Mail, Phone, Award, Users, Target } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const teamMembers = [
  {
    name: "Reabetswe Llale",
    role: "Director",
    position: "Managing Director & CEO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    gradient: "from-teal to-primary",
  },
  {
    name: "Mpapi Tsomele",
    role: "Director",
    position: "Chief of Engineering & Technology",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    gradient: "from-secondary to-accent",
  },
];

const Team = () => {
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
            Leadership
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground mb-6">
            Meet The <span className="text-gradient">Team</span>
          </h1>
          <p className="text-xl text-primary-foreground/70 max-w-3xl mx-auto">
            Experienced professionals driving innovation and excellence
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute top-20 right-10 w-48 h-48 bg-primary/5 blob-shape animate-blob" />

        <div className="container-custom relative z-10">
          {/* Team Grid */}
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-12 md:gap-16 mb-20">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className={`group relative bg-gradient-to-br from-card via-muted/30 to-card rounded-3xl p-8 text-center shadow-card hover:shadow-glow transition-all duration-500 border border-border hover:border-primary/30 hover:-translate-y-2 max-w-sm`}
              >
                {/* Decorative corner */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${member.gradient} opacity-20 rounded-bl-full rounded-tr-3xl`} />
                
                {/* Image Container */}
                <div className="relative mb-6 z-10">
                  <div className={`w-48 h-48 md:w-56 md:h-56 mx-auto rounded-full overflow-hidden border-4 border-transparent bg-gradient-to-br ${member.gradient} p-1 group-hover:scale-105 transition-transform duration-500`}>
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <h3 className="text-2xl font-extrabold text-foreground mb-2 tracking-tight">{member.name}</h3>
                <p className={`font-bold text-lg bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent mb-2`}>{member.role}</p>
                <p className="text-muted-foreground mb-6">{member.position}</p>

                {/* Social Links */}
                <div className="flex justify-center gap-3">
                  <a
                    href="#"
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-primary-foreground hover:scale-110 transition-transform shadow-lg`}
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-primary-foreground hover:scale-110 transition-transform shadow-lg`}
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Award, value: "10+", label: "Years Experience", gradient: "from-teal to-primary" },
              { icon: Users, value: "50+", label: "Happy Clients", gradient: "from-secondary to-accent" },
              { icon: Target, value: "100+", label: "Projects Completed", gradient: "from-primary to-teal-light" },
              { icon: Award, value: "100%", label: "Client Satisfaction", gradient: "from-accent to-secondary" },
            ].map((stat, index) => (
              <div
                key={index}
                className="group text-center p-6 rounded-2xl bg-gradient-to-br from-muted/50 to-card border border-border hover:border-primary/30 hover:shadow-glow transition-all duration-300"
              >
                <div className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <div className="text-3xl font-extrabold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Team;
