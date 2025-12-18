import { Linkedin, Mail } from "lucide-react";

const teamMembers = [
  {
    name: "Reabetswe Llale",
    role: "Director",
    position: "Managing Director & CEO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  },
  {
    name: "Mpapi Tsomele",
    role: "Director",
    position: "Chief of Engineering & Technology",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
  },
];

const TeamSection = () => {
  return (
    <section id="team" className="section-padding bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-muted/30 to-transparent" />
      <div className="absolute top-20 right-10 w-48 h-48 bg-primary/5 blob-shape animate-blob" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-widest mb-4 block">
            Leadership
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Meet The <span className="text-gradient">Team</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experienced professionals driving innovation and excellence
          </p>
        </div>

        {/* Team Grid */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-16">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group text-center"
            >
              {/* Image Container */}
              <div className="relative mb-6">
                <div className="w-48 h-48 md:w-56 md:h-56 mx-auto rounded-full overflow-hidden border-4 border-primary/20 group-hover:border-primary transition-colors duration-300 shadow-card">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex gap-3">
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary-glow transition-colors shadow-glow"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground hover:bg-primary-glow transition-colors shadow-glow"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Info */}
              <h3 className="text-xl font-bold text-primary mb-1">{member.name}</h3>
              <p className="font-semibold text-foreground mb-1">{member.role}</p>
              <p className="text-sm text-muted-foreground italic">{member.position}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
