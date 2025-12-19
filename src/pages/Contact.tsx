import { MapPin, Phone, Mail, Clock, ArrowRight, Send, MessageCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ExpandableCard from "@/components/ExpandableCard";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const contactInfo = [
  {
    icon: MapPin,
    title: "Our Location",
    gradient: "from-teal to-emerald-500",
    details: ["30 President Mbeki Drive", "Rustenburg, 0300", "North West Province, South Africa"],
  },
  {
    icon: Phone,
    title: "Phone Numbers",
    gradient: "from-rose-500 to-pink-600",
    details: ["+27 (0) 14 592 1561", "+27 (0) 83 235 0909"],
    links: ["tel:+27145921561", "tel:+27832350909"],
  },
  {
    icon: Mail,
    title: "Email Addresses",
    gradient: "from-violet-500 to-purple-600",
    details: ["info@lentsweholding.co.za", "reabetswe@lentsweholding.co.za"],
    links: ["mailto:info@lentsweholding.co.za", "mailto:reabetswe@lentsweholding.co.za"],
  },
  {
    icon: Clock,
    title: "Business Hours",
    gradient: "from-amber-500 to-orange-600",
    details: ["Monday - Friday: 8:00 AM - 5:00 PM", "Saturday - Sunday: Closed"],
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully! We'll get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

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
            Get In Touch
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-primary-foreground mb-8">
            Let's Work <span className="text-gradient">Together</span>
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Ready to elevate your operations? Contact us for personalized solutions
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 blob-shape" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/5 blob-shape-2" />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info with Accordion */}
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-foreground mb-8">
                Contact <span className="text-gradient">Information</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                We'd love to hear from you. Get in touch with us using any of the methods below.
              </p>

              <Accordion type="multiple" defaultValue={["item-0", "item-1"]} className="space-y-4">
                {contactInfo.map((item, index) => (
                  <AccordionItem 
                    key={index} 
                    value={`item-${index}`}
                    className="border-2 border-border rounded-2xl px-6 overflow-hidden bg-card shadow-card hover:shadow-glow transition-shadow"
                  >
                    <AccordionTrigger className="hover:no-underline py-5">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg`}>
                          <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold text-foreground">{item.title}</span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 pl-16">
                      <div className="space-y-2">
                        {item.details.map((detail, dIndex) => (
                          item.links ? (
                            <a
                              key={dIndex}
                              href={item.links[dIndex]}
                              className="block text-lg text-muted-foreground hover:text-primary transition-colors font-medium"
                            >
                              {detail}
                            </a>
                          ) : (
                            <p key={dIndex} className="text-lg text-muted-foreground font-medium">
                              {detail}
                            </p>
                          )
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Contact Form */}
            <div className="bg-card rounded-3xl p-10 border-2 border-border shadow-card">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-teal flex items-center justify-center shadow-lg">
                  <MessageCircle className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-foreground">Send us a message</h3>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-5">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-6 py-5 rounded-xl bg-background border-2 border-border text-foreground text-lg placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-6 py-5 rounded-xl bg-background border-2 border-border text-foreground text-lg placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="w-full px-6 py-5 rounded-xl bg-background border-2 border-border text-foreground text-lg placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                />
                <textarea
                  rows={5}
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="w-full px-6 py-5 rounded-xl bg-background border-2 border-border text-foreground text-lg placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none font-medium"
                />
                <Button type="submit" variant="hero" size="xl" className="w-full font-black text-lg">
                  Send Message
                  <Send className="w-6 h-6" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Contact;
