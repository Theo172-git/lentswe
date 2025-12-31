import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  LogOut, Package, AlertTriangle, MessageSquare, User as UserIcon, 
  Plus, Phone, Loader2, Shield, Settings, Clock, CheckCircle, XCircle
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import logoImg from "@/assets/lentswe-logo.png";

interface Profile {
  full_name: string | null;
  company_name: string | null;
  phone: string | null;
}

interface Rental {
  id: string;
  forklift_name: string;
  forklift_type: string;
  capacity: string;
  rental_period: string;
  quantity: number;
  price_per_period: number;
  status: string;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
}

interface BreakdownReport {
  id: string;
  forklift_name: string;
  description: string;
  urgency: string;
  status: string;
  created_at: string;
}

interface SupportRequest {
  id: string;
  subject: string;
  message: string;
  category: string;
  status: string;
  admin_response: string | null;
  created_at: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [breakdowns, setBreakdowns] = useState<BreakdownReport[]>([]);
  const [supportRequests, setSupportRequests] = useState<SupportRequest[]>([]);
  const [activeTab, setActiveTab] = useState<"rentals" | "breakdowns" | "support">("rentals");
  const navigate = useNavigate();

  // Breakdown form state
  const [showBreakdownForm, setShowBreakdownForm] = useState(false);
  const [breakdownForm, setBreakdownForm] = useState({
    forklift_name: "",
    description: "",
    urgency: "medium",
    location: "",
    contact_phone: "",
  });

  // Support form state
  const [showSupportForm, setShowSupportForm] = useState(false);
  const [supportForm, setSupportForm] = useState({
    subject: "",
    message: "",
    category: "general",
  });

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session?.user) {
        navigate("/auth");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session?.user) {
        navigate("/auth");
      } else {
        fetchData(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchData = async (userId: string) => {
    setLoading(true);
    try {
      // Check if admin
      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .single();
      
      setIsAdmin(roleData?.role === "admin");

      // Fetch profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("full_name, company_name, phone")
        .eq("user_id", userId)
        .single();
      
      setProfile(profileData);

      // Fetch rentals
      const { data: rentalsData } = await supabase
        .from("rentals")
        .select("*")
        .order("created_at", { ascending: false });
      
      setRentals(rentalsData || []);

      // Fetch breakdown reports
      const { data: breakdownsData } = await supabase
        .from("breakdown_reports")
        .select("*")
        .order("created_at", { ascending: false });
      
      setBreakdowns(breakdownsData || []);

      // Fetch support requests
      const { data: supportData } = await supabase
        .from("support_requests")
        .select("*")
        .order("created_at", { ascending: false });
      
      setSupportRequests(supportData || []);

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast.success("Signed out successfully");
    navigate("/");
  };

  const submitBreakdownReport = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const { error } = await supabase.from("breakdown_reports").insert({
        user_id: user.id,
        forklift_name: breakdownForm.forklift_name,
        description: breakdownForm.description,
        urgency: breakdownForm.urgency,
        location: breakdownForm.location,
        contact_phone: breakdownForm.contact_phone,
      });

      if (error) throw error;

      // Send WhatsApp notification
      const message = encodeURIComponent(
        `🚨 BREAKDOWN REPORT\n\nForklift: ${breakdownForm.forklift_name}\nUrgency: ${breakdownForm.urgency.toUpperCase()}\nLocation: ${breakdownForm.location}\nContact: ${breakdownForm.contact_phone}\n\nDescription: ${breakdownForm.description}`
      );
      window.open(`https://wa.me/27658795912?text=${message}`, "_blank");

      toast.success("Breakdown reported and WhatsApp notification sent!");
      setShowBreakdownForm(false);
      setBreakdownForm({ forklift_name: "", description: "", urgency: "medium", location: "", contact_phone: "" });
      fetchData(user.id);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const submitSupportRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      const { error } = await supabase.from("support_requests").insert({
        user_id: user.id,
        subject: supportForm.subject,
        message: supportForm.message,
        category: supportForm.category,
      });

      if (error) throw error;

      toast.success("Support request submitted!");
      setShowSupportForm(false);
      setSupportForm({ subject: "", message: "", category: "general" });
      fetchData(user.id);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
      case "resolved":
      case "closed":
        return "bg-emerald-500/10 text-emerald-600 border-emerald-500/30";
      case "pending":
      case "reported":
      case "open":
        return "bg-amber-500/10 text-amber-600 border-amber-500/30";
      case "cancelled":
        return "bg-red-500/10 text-red-600 border-red-500/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-28 pb-20">
        <div className="container-custom">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Welcome, {profile?.full_name || user?.email?.split("@")[0]}
              </h1>
              <p className="text-muted-foreground">
                {profile?.company_name && `${profile.company_name} • `}
                {isAdmin ? "Administrator" : "Client Portal"}
              </p>
            </div>
            <div className="flex gap-3">
              {isAdmin && (
                <Link to="/admin">
                  <Button variant="outline" className="gap-2">
                    <Shield className="w-4 h-4" />
                    Admin Panel
                  </Button>
                </Link>
              )}
              <Button variant="outline" onClick={handleSignOut} className="gap-2">
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Package, label: "Active Rentals", value: rentals.filter(r => r.status === "active").length, color: "primary" },
              { icon: AlertTriangle, label: "Open Breakdowns", value: breakdowns.filter(b => b.status !== "resolved").length, color: "amber" },
              { icon: MessageSquare, label: "Support Tickets", value: supportRequests.filter(s => s.status === "open").length, color: "teal" },
              { icon: Clock, label: "Pending Requests", value: rentals.filter(r => r.status === "pending").length, color: "violet" },
            ].map((stat, index) => (
              <div key={index} className="bg-card rounded-2xl p-5 border border-border">
                <div className={`w-10 h-10 rounded-xl bg-${stat.color}/10 flex items-center justify-center mb-3`}>
                  <stat.icon className={`w-5 h-5 text-${stat.color === "primary" ? "primary" : stat.color + "-500"}`} />
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {[
              { key: "rentals", label: "My Rentals", icon: Package },
              { key: "breakdowns", label: "Breakdown Reports", icon: AlertTriangle },
              { key: "support", label: "Support Requests", icon: MessageSquare },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.key
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "bg-card border border-border hover:border-primary/50"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="bg-card rounded-3xl border border-border p-6">
            {/* Rentals Tab */}
            {activeTab === "rentals" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">My Rentals</h2>
                  <Link to="/#marketplace">
                    <Button className="gap-2">
                      <Plus className="w-4 h-4" />
                      New Rental
                    </Button>
                  </Link>
                </div>
                
                {rentals.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No rentals yet</p>
                    <Link to="/#marketplace">
                      <Button className="mt-4">Browse Forklifts</Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {rentals.map((rental) => (
                      <div key={rental.id} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 bg-muted/30 rounded-xl">
                        <div>
                          <h3 className="font-semibold text-foreground">{rental.forklift_name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {rental.capacity} • {rental.rental_period} • Qty: {rental.quantity}
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="font-bold text-primary">
                            R{Number(rental.price_per_period).toLocaleString()}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(rental.status)}`}>
                            {rental.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Breakdowns Tab */}
            {activeTab === "breakdowns" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Breakdown Reports</h2>
                  <Button onClick={() => setShowBreakdownForm(true)} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Report Breakdown
                  </Button>
                </div>

                {showBreakdownForm && (
                  <form onSubmit={submitBreakdownReport} className="bg-muted/30 rounded-xl p-6 mb-6 space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Forklift Name/ID</label>
                        <input
                          type="text"
                          value={breakdownForm.forklift_name}
                          onChange={(e) => setBreakdownForm({ ...breakdownForm, forklift_name: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Urgency</label>
                        <select
                          value={breakdownForm.urgency}
                          onChange={(e) => setBreakdownForm({ ...breakdownForm, urgency: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                        >
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High - Urgent</option>
                        </select>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Location</label>
                        <input
                          type="text"
                          value={breakdownForm.location}
                          onChange={(e) => setBreakdownForm({ ...breakdownForm, location: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Contact Phone</label>
                        <input
                          type="tel"
                          value={breakdownForm.contact_phone}
                          onChange={(e) => setBreakdownForm({ ...breakdownForm, contact_phone: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Description</label>
                      <textarea
                        value={breakdownForm.description}
                        onChange={(e) => setBreakdownForm({ ...breakdownForm, description: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background h-24"
                        required
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button type="submit">Submit & Send WhatsApp</Button>
                      <Button type="button" variant="outline" onClick={() => setShowBreakdownForm(false)}>Cancel</Button>
                    </div>
                  </form>
                )}

                {breakdowns.length === 0 ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-4" />
                    <p className="text-muted-foreground">No breakdowns reported</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {breakdowns.map((breakdown) => (
                      <div key={breakdown.id} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 bg-muted/30 rounded-xl">
                        <div>
                          <h3 className="font-semibold text-foreground">{breakdown.forklift_name}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-1">{breakdown.description}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                            breakdown.urgency === "high" ? "bg-red-500/10 text-red-600 border-red-500/30" : getStatusColor(breakdown.status)
                          }`}>
                            {breakdown.urgency.toUpperCase()}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(breakdown.status)}`}>
                            {breakdown.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Support Tab */}
            {activeTab === "support" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Support Requests</h2>
                  <Button onClick={() => setShowSupportForm(true)} className="gap-2">
                    <Plus className="w-4 h-4" />
                    New Request
                  </Button>
                </div>

                {showSupportForm && (
                  <form onSubmit={submitSupportRequest} className="bg-muted/30 rounded-xl p-6 mb-6 space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Subject</label>
                        <input
                          type="text"
                          value={supportForm.subject}
                          onChange={(e) => setSupportForm({ ...supportForm, subject: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Category</label>
                        <select
                          value={supportForm.category}
                          onChange={(e) => setSupportForm({ ...supportForm, category: e.target.value })}
                          className="w-full px-4 py-2 rounded-lg border border-border bg-background"
                        >
                          <option value="general">General Inquiry</option>
                          <option value="billing">Billing</option>
                          <option value="technical">Technical Support</option>
                          <option value="maintenance">Maintenance</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Message</label>
                      <textarea
                        value={supportForm.message}
                        onChange={(e) => setSupportForm({ ...supportForm, message: e.target.value })}
                        className="w-full px-4 py-2 rounded-lg border border-border bg-background h-24"
                        required
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button type="submit">Submit Request</Button>
                      <Button type="button" variant="outline" onClick={() => setShowSupportForm(false)}>Cancel</Button>
                    </div>
                  </form>
                )}

                {supportRequests.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No support requests</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {supportRequests.map((request) => (
                      <div key={request.id} className="p-4 bg-muted/30 rounded-xl">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-3">
                          <div>
                            <h3 className="font-semibold text-foreground">{request.subject}</h3>
                            <p className="text-sm text-muted-foreground">{request.category}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(request.status)}`}>
                            {request.status}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{request.message}</p>
                        {request.admin_response && (
                          <div className="mt-3 pt-3 border-t border-border">
                            <p className="text-xs text-primary font-semibold mb-1">Admin Response:</p>
                            <p className="text-sm text-foreground">{request.admin_response}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
