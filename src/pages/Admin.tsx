import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { 
  LogOut, Users, Package, AlertTriangle, MessageSquare, 
  ArrowLeft, Loader2, CheckCircle, XCircle, Clock, Eye
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface UserProfile {
  user_id: string;
  full_name: string | null;
  company_name: string | null;
  phone: string | null;
  created_at: string;
}

interface Rental {
  id: string;
  user_id: string;
  forklift_name: string;
  forklift_type: string;
  capacity: string;
  rental_period: string;
  quantity: number;
  price_per_period: number;
  status: string;
  start_date: string | null;
  end_date: string | null;
  notes: string | null;
  created_at: string;
}

interface BreakdownReport {
  id: string;
  user_id: string;
  forklift_name: string;
  description: string;
  urgency: string;
  status: string;
  location: string | null;
  contact_phone: string | null;
  admin_notes: string | null;
  created_at: string;
}

interface SupportRequest {
  id: string;
  user_id: string;
  subject: string;
  message: string;
  category: string;
  status: string;
  admin_response: string | null;
  created_at: string;
}

const Admin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState<"users" | "rentals" | "breakdowns" | "support">("users");
  
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [breakdowns, setBreakdowns] = useState<BreakdownReport[]>([]);
  const [supportRequests, setSupportRequests] = useState<SupportRequest[]>([]);
  
  const navigate = useNavigate();

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
        checkAdminAndFetchData(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const checkAdminAndFetchData = async (userId: string) => {
    setLoading(true);
    try {
      // Check if admin
      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .single();
      
      if (roleData?.role !== "admin") {
        toast.error("Access denied. Admin privileges required.");
        navigate("/dashboard");
        return;
      }
      
      setIsAdmin(true);
      await fetchAllData();
    } catch (error) {
      console.error("Error:", error);
      navigate("/dashboard");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllData = async () => {
    try {
      const [usersRes, rentalsRes, breakdownsRes, supportRes] = await Promise.all([
        supabase.from("profiles").select("*").order("created_at", { ascending: false }),
        supabase.from("rentals").select("*").order("created_at", { ascending: false }),
        supabase.from("breakdown_reports").select("*").order("created_at", { ascending: false }),
        supabase.from("support_requests").select("*").order("created_at", { ascending: false }),
      ]);

      setUsers(usersRes.data || []);
      setRentals(rentalsRes.data || []);
      setBreakdowns(breakdownsRes.data || []);
      setSupportRequests(supportRes.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateRentalStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from("rentals")
        .update({ status })
        .eq("id", id);
      
      if (error) throw error;
      toast.success(`Rental ${status}`);
      fetchAllData();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const updateBreakdownStatus = async (id: string, status: string) => {
    try {
      const updateData: any = { status };
      if (status === "resolved") {
        updateData.resolved_at = new Date().toISOString();
      }
      
      const { error } = await supabase
        .from("breakdown_reports")
        .update(updateData)
        .eq("id", id);
      
      if (error) throw error;
      toast.success(`Breakdown ${status}`);
      fetchAllData();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const updateSupportStatus = async (id: string, status: string, response?: string) => {
    try {
      const updateData: any = { status };
      if (response) {
        updateData.admin_response = response;
      }
      
      const { error } = await supabase
        .from("support_requests")
        .update(updateData)
        .eq("id", id);
      
      if (error) throw error;
      toast.success(`Support request updated`);
      fetchAllData();
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
      case "in_progress":
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

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-28 pb-20">
        <div className="container-custom">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div className="flex items-center gap-4">
              <Link to="/dashboard">
                <Button variant="outline" size="icon">
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
                <p className="text-muted-foreground">Manage users, rentals, breakdowns, and support</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: Users, label: "Total Users", value: users.length, color: "primary" },
              { icon: Package, label: "Total Rentals", value: rentals.length, color: "teal" },
              { icon: AlertTriangle, label: "Open Breakdowns", value: breakdowns.filter(b => b.status !== "resolved").length, color: "amber" },
              { icon: MessageSquare, label: "Open Tickets", value: supportRequests.filter(s => s.status === "open").length, color: "violet" },
            ].map((stat, index) => (
              <div key={index} className="bg-card rounded-2xl p-5 border border-border">
                <div className={`w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3`}>
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {[
              { key: "users", label: "Users", icon: Users },
              { key: "rentals", label: "Rentals", icon: Package },
              { key: "breakdowns", label: "Breakdowns", icon: AlertTriangle },
              { key: "support", label: "Support", icon: MessageSquare },
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
            {/* Users Tab */}
            {activeTab === "users" && (
              <div>
                <h2 className="text-xl font-bold mb-6">All Users ({users.length})</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Name</th>
                        <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Company</th>
                        <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Phone</th>
                        <th className="text-left py-3 px-4 font-semibold text-muted-foreground">Joined</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.user_id} className="border-b border-border/50 hover:bg-muted/30">
                          <td className="py-3 px-4 font-medium">{user.full_name || "N/A"}</td>
                          <td className="py-3 px-4 text-muted-foreground">{user.company_name || "N/A"}</td>
                          <td className="py-3 px-4 text-muted-foreground">{user.phone || "N/A"}</td>
                          <td className="py-3 px-4 text-muted-foreground">
                            {new Date(user.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Rentals Tab */}
            {activeTab === "rentals" && (
              <div>
                <h2 className="text-xl font-bold mb-6">All Rentals ({rentals.length})</h2>
                <div className="space-y-4">
                  {rentals.map((rental) => (
                    <div key={rental.id} className="p-4 bg-muted/30 rounded-xl">
                      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-3">
                        <div>
                          <h3 className="font-semibold text-foreground">{rental.forklift_name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {rental.capacity} • {rental.rental_period} • Qty: {rental.quantity}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Price: R{Number(rental.price_per_period).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(rental.status)}`}>
                            {rental.status}
                          </span>
                          {rental.status === "pending" && (
                            <>
                              <Button size="sm" onClick={() => updateRentalStatus(rental.id, "active")} className="gap-1">
                                <CheckCircle className="w-3 h-3" /> Approve
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => updateRentalStatus(rental.id, "cancelled")}>
                                <XCircle className="w-3 h-3" />
                              </Button>
                            </>
                          )}
                          {rental.status === "active" && (
                            <Button size="sm" variant="outline" onClick={() => updateRentalStatus(rental.id, "completed")}>
                              Complete
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Breakdowns Tab */}
            {activeTab === "breakdowns" && (
              <div>
                <h2 className="text-xl font-bold mb-6">Breakdown Reports ({breakdowns.length})</h2>
                <div className="space-y-4">
                  {breakdowns.map((breakdown) => (
                    <div key={breakdown.id} className="p-4 bg-muted/30 rounded-xl">
                      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-foreground">{breakdown.forklift_name}</h3>
                            <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                              breakdown.urgency === "high" ? "bg-red-500 text-white" : 
                              breakdown.urgency === "medium" ? "bg-amber-500 text-white" : "bg-muted"
                            }`}>
                              {breakdown.urgency.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{breakdown.description}</p>
                          <div className="text-xs text-muted-foreground">
                            {breakdown.location && <span>📍 {breakdown.location} • </span>}
                            {breakdown.contact_phone && <span>📞 {breakdown.contact_phone}</span>}
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(breakdown.status)}`}>
                            {breakdown.status}
                          </span>
                          {breakdown.status === "reported" && (
                            <Button size="sm" onClick={() => updateBreakdownStatus(breakdown.id, "in_progress")}>
                              <Clock className="w-3 h-3 mr-1" /> In Progress
                            </Button>
                          )}
                          {breakdown.status === "in_progress" && (
                            <Button size="sm" onClick={() => updateBreakdownStatus(breakdown.id, "resolved")}>
                              <CheckCircle className="w-3 h-3 mr-1" /> Resolve
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Support Tab */}
            {activeTab === "support" && (
              <div>
                <h2 className="text-xl font-bold mb-6">Support Requests ({supportRequests.length})</h2>
                <div className="space-y-4">
                  {supportRequests.map((request) => (
                    <div key={request.id} className="p-4 bg-muted/30 rounded-xl">
                      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-foreground">{request.subject}</h3>
                            <span className="px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground">
                              {request.category}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{request.message}</p>
                          {request.admin_response && (
                            <div className="mt-2 p-2 bg-primary/5 rounded border-l-2 border-primary">
                              <p className="text-xs text-primary font-semibold mb-1">Your Response:</p>
                              <p className="text-sm">{request.admin_response}</p>
                            </div>
                          )}
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(request.status)}`}>
                            {request.status}
                          </span>
                          {request.status === "open" && (
                            <>
                              <Button 
                                size="sm" 
                                onClick={() => {
                                  const response = prompt("Enter your response:");
                                  if (response) {
                                    updateSupportStatus(request.id, "closed", response);
                                  }
                                }}
                              >
                                Respond & Close
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
