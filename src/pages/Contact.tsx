import { MapPin, Phone, Mail, Clock, ArrowRight, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
      <section className="pt-32 pb-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 blob-shape animate-blob" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/10 blob-shape-2" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <span className="inline-block text-sm font-bold text-primary uppercase tracking-widest mb-4 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground mb-6">
            Let's Work <span className="text-gradient">Together</span>
          </h1>
          <p className="text-xl text-primary-foreground/70 max-w-3xl mx-auto">
            Ready to elevate your operations? Contact us for personalized solutions
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 blob-shape" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-secondary/5 blob-shape-2" />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-extrabold text-foreground mb-4">
                  Contact <span className="text-gradient">Information</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  We'd love to hear from you. Get in touch with us using any of the methods below.
                </p>
              </div>

              <div className="space-y-6">
                <div className="group flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-br from-teal/10 via-card to-primary/5 border border-teal/20 hover:border-teal hover:shadow-glow transition-all duration-300">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal to-primary flex items-center justify-center flex-shrink-0 shadow-lg">
                    <MapPin className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground mb-2">Our Location</h3>
                    <p className="text-muted-foreground">
                      30 President Mbeki Drive<br />
                      Rustenburg, 0300<br />
                      North West Province, South Africa
                    </p>
                  </div>
                </div>

                <div className="group flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-br from-secondary/10 via-card to-accent/5 border border-secondary/20 hover:border-secondary hover:shadow-glow transition-all duration-300">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Phone className="w-7 h-7 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground mb-2">Phone</h3>
                    <p className="text-muted-foreground">
                      <a href="tel:+27145921561" className="hover:text-primary transition-colors">+27 (0) 14 592 1561</a>
                    </p>
                    <p className="text-muted-foreground">
                      <a href="tel:+27832350909" className="hover:text-primary transition-colors">+27 (0) 83 235 0909</a>
                    </p>
                  </div>
                </div>

                <div className="group flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-br from-primary/10 via-card to-teal-light/5 border border-primary/20 hover:border-primary hover:shadow-glow transition-all duration-300">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-teal-light flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Mail className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground mb-2">Email</h3>
                    <p className="text-muted-foreground">
                      <a href="mailto:info@lentsweholding.co.za" className="hover:text-primary transition-colors">info@lentsweholding.co.za</a>
                    </p>
                    <p className="text-muted-foreground">
                      <a href="mailto:reabetswe@lentsweholding.co.za" className="hover:text-primary transition-colors">reabetswe@lentsweholding.co.za</a>
                    </p>
                  </div>
                </div>

                <div className="group flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-br from-accent/10 via-card to-secondary/5 border border-accent/20 hover:border-accent hover:shadow-glow transition-all duration-300">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-secondary flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Clock className="w-7 h-7 text-secondary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground mb-2">Business Hours</h3>
                    <p className="text-muted-foreground">
                      Monday - Friday: 8:00 AM - 5:00 PM<br />
                      Saturday - Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gradient-to-br from-card via-muted/30 to-card rounded-3xl p-8 border border-border shadow-card">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-teal flex items-center justify-center shadow-lg">
                  <MessageCircle className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-2xl font-extrabold text-foreground">Send us a message</h3>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-5 py-4 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-5 py-4 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  required
                  className="w-full px-5 py-4 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                />
                <textarea
                  rows={5}
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="w-full px-5 py-4 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none font-medium"
                />
                <Button type="submit" variant="hero" size="lg" className="w-full">
                  Send Message
                  <Send className="w-5 h-5" />
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
