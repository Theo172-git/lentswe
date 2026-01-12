import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { 
  LogOut, Users, Package, AlertTriangle, MessageSquare, 
  ArrowLeft, Loader2, CheckCircle, XCircle, Clock, Eye, 
  Forklift, Plus, Edit, Trash2, Save, X, FolderTree, FileText, LayoutTemplate
} from "lucide-react";
import { CMSPanel } from "@/components/cms";
import { PageBuilder } from "@/components/page-builder";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

interface Forklift {
  id: string;
  name: string;
  type: string;
  capacity: string;
  description: string | null;
  image_url: string | null;
  price_weekly: number;
  price_biweekly: number;
  price_monthly: number;
  eco_friendly: boolean;
  is_available: boolean;
  category_id: string | null;
  created_at: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  parent_id: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
}

const Admin = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState<"page-builder" | "cms" | "categories" | "forklifts" | "users" | "rentals" | "breakdowns" | "support">("page-builder");
  
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [breakdowns, setBreakdowns] = useState<BreakdownReport[]>([]);
  const [supportRequests, setSupportRequests] = useState<SupportRequest[]>([]);
  const [forklifts, setForklifts] = useState<Forklift[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  
  const [editingForklift, setEditingForklift] = useState<Forklift | null>(null);
  const [isForkliftDialogOpen, setIsForkliftDialogOpen] = useState(false);
  const [forkliftForm, setForkliftForm] = useState({
    name: "",
    type: "electric",
    capacity: "",
    description: "",
    image_url: "",
    price_weekly: 0,
    price_biweekly: 0,
    price_monthly: 0,
    eco_friendly: true,
    is_available: true,
    category_id: "",
  });
  
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [categoryForm, setCategoryForm] = useState({
    name: "",
    slug: "",
    description: "",
    image_url: "",
    parent_id: "",
    sort_order: 0,
    is_active: true,
  });
  
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
      const [usersRes, rentalsRes, breakdownsRes, supportRes, forkliftsRes, categoriesRes] = await Promise.all([
        supabase.from("profiles").select("*").order("created_at", { ascending: false }),
        supabase.from("rentals").select("*").order("created_at", { ascending: false }),
        supabase.from("breakdown_reports").select("*").order("created_at", { ascending: false }),
        supabase.from("support_requests").select("*").order("created_at", { ascending: false }),
        supabase.from("forklifts").select("*").order("created_at", { ascending: true }),
        supabase.from("categories").select("*").order("sort_order", { ascending: true }),
      ]);

      setUsers(usersRes.data || []);
      setRentals(rentalsRes.data || []);
      setBreakdowns(breakdownsRes.data || []);
      setSupportRequests(supportRes.data || []);
      setForklifts(forkliftsRes.data || []);
      setCategories((categoriesRes.data || []) as Category[]);
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

  const openForkliftDialog = (forklift?: Forklift) => {
    if (forklift) {
      setEditingForklift(forklift);
      setForkliftForm({
        name: forklift.name,
        type: forklift.type,
        capacity: forklift.capacity,
        description: forklift.description || "",
        image_url: forklift.image_url || "",
        price_weekly: Number(forklift.price_weekly),
        price_biweekly: Number(forklift.price_biweekly),
        price_monthly: Number(forklift.price_monthly),
        eco_friendly: forklift.eco_friendly,
        is_available: forklift.is_available,
        category_id: forklift.category_id || "",
      });
    } else {
      setEditingForklift(null);
      setForkliftForm({
        name: "",
        type: "electric",
        capacity: "",
        description: "",
        image_url: "",
        price_weekly: 0,
        price_biweekly: 0,
        price_monthly: 0,
        eco_friendly: true,
        is_available: true,
        category_id: "",
      });
    }
    setIsForkliftDialogOpen(true);
  };

  const openCategoryDialog = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setCategoryForm({
        name: category.name,
        slug: category.slug,
        description: category.description || "",
        image_url: category.image_url || "",
        parent_id: category.parent_id || "",
        sort_order: category.sort_order || 0,
        is_active: category.is_active,
      });
    } else {
      setEditingCategory(null);
      setCategoryForm({
        name: "",
        slug: "",
        description: "",
        image_url: "",
        parent_id: "",
        sort_order: 0,
        is_active: true,
      });
    }
    setIsCategoryDialogOpen(true);
  };

  const saveCategory = async () => {
    try {
      const dataToSave = {
        ...categoryForm,
        parent_id: categoryForm.parent_id || null,
      };
      
      if (editingCategory) {
        const { error } = await supabase
          .from("categories")
          .update(dataToSave)
          .eq("id", editingCategory.id);
        
        if (error) throw error;
        toast.success("Category updated successfully");
      } else {
        const { error } = await supabase
          .from("categories")
          .insert([dataToSave]);
        
        if (error) throw error;
        toast.success("Category added successfully");
      }
      
      setIsCategoryDialogOpen(false);
      fetchAllData();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const deleteCategory = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category? Equipment in this category will be unassigned.")) return;
    
    try {
      const { error } = await supabase
        .from("categories")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
      toast.success("Category deleted");
      fetchAllData();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const toggleCategoryActive = async (id: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from("categories")
        .update({ is_active: !isActive })
        .eq("id", id);
      
      if (error) throw error;
      toast.success(`Category ${!isActive ? "enabled" : "disabled"}`);
      fetchAllData();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  };

  const saveForklift = async () => {
    try {
      if (editingForklift) {
        const { error } = await supabase
          .from("forklifts")
          .update(forkliftForm)
          .eq("id", editingForklift.id);
        
        if (error) throw error;
        toast.success("Forklift updated successfully");
      } else {
        const { error } = await supabase
          .from("forklifts")
          .insert([forkliftForm]);
        
        if (error) throw error;
        toast.success("Forklift added successfully");
      }
      
      setIsForkliftDialogOpen(false);
      fetchAllData();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const deleteForklift = async (id: string) => {
    if (!confirm("Are you sure you want to delete this forklift?")) return;
    
    try {
      const { error } = await supabase
        .from("forklifts")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
      toast.success("Forklift deleted");
      fetchAllData();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const toggleForkliftAvailability = async (id: string, isAvailable: boolean) => {
    try {
      const { error } = await supabase
        .from("forklifts")
        .update({ is_available: !isAvailable })
        .eq("id", id);
      
      if (error) throw error;
      toast.success(`Forklift ${!isAvailable ? "enabled" : "disabled"}`);
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
                <p className="text-muted-foreground">Manage categories, equipment, users, rentals, and support</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
            {[
              { icon: FolderTree, label: "Categories", value: categories.length, color: "primary" },
              { icon: Forklift, label: "Equipment", value: forklifts.length, color: "primary" },
              { icon: Users, label: "Total Users", value: users.length, color: "teal" },
              { icon: Package, label: "Total Rentals", value: rentals.length, color: "violet" },
              { icon: AlertTriangle, label: "Open Breakdowns", value: breakdowns.filter(b => b.status !== "resolved").length, color: "amber" },
              { icon: MessageSquare, label: "Open Tickets", value: supportRequests.filter(s => s.status === "open").length, color: "rose" },
            ].map((stat, index) => (
              <div key={index} className="bg-card rounded-2xl p-4 sm:p-5 border border-border">
                <div className={`w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3`}>
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-xl sm:text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {[
              { key: "page-builder", label: "Page Builder", icon: LayoutTemplate },
              { key: "cms", label: "CMS", icon: FileText },
              { key: "categories", label: "Categories", icon: FolderTree },
              { key: "forklifts", label: "Equipment", icon: Forklift },
              { key: "users", label: "Users", icon: Users },
              { key: "rentals", label: "Rentals", icon: Package },
              { key: "breakdowns", label: "Breakdowns", icon: AlertTriangle },
              { key: "support", label: "Support", icon: MessageSquare },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as typeof activeTab)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl font-semibold transition-all whitespace-nowrap text-sm ${
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
          {activeTab === "page-builder" && (
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <PageBuilder />
            </div>
          )}
          
          {activeTab === "cms" && (
            <div className="bg-card rounded-2xl border border-border p-6">
              <CMSPanel />
            </div>
          )}
          <div className="bg-card rounded-3xl border border-border p-4 sm:p-6">
            {/* Categories Tab */}
            {activeTab === "categories" && (
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <h2 className="text-xl font-bold">Manage Categories ({categories.length})</h2>
                  <Button onClick={() => openCategoryDialog()} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Category
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map((category) => {
                    const parentCategory = categories.find(c => c.id === category.parent_id);
                    return (
                      <div key={category.id} className={`p-4 rounded-xl border ${category.is_active ? 'bg-muted/30 border-border' : 'bg-red-500/5 border-red-500/20'}`}>
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground truncate">{category.name}</h3>
                            <p className="text-sm text-muted-foreground">/{category.slug}</p>
                            {parentCategory && (
                              <p className="text-xs text-primary">↳ Subcategory of {parentCategory.name}</p>
                            )}
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${category.is_active ? 'bg-emerald-500/10 text-emerald-600' : 'bg-red-500/10 text-red-600'}`}>
                            {category.is_active ? "Active" : "Inactive"}
                          </span>
                        </div>
                        
                        {category.description && (
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{category.description}</p>
                        )}
                        
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => openCategoryDialog(category)} className="flex-1 gap-1">
                            <Edit className="w-3 h-3" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => toggleCategoryActive(category.id, category.is_active)}>
                            {category.is_active ? <XCircle className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => deleteCategory(category.id)} className="text-destructive hover:text-destructive">
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Category Dialog */}
                <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
                  <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{editingCategory ? "Edit Category" : "Add New Category"}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div>
                        <label className="text-sm font-medium">Name</label>
                        <Input 
                          value={categoryForm.name}
                          onChange={(e) => {
                            const name = e.target.value;
                            setCategoryForm({
                              ...categoryForm, 
                              name,
                              slug: !editingCategory ? generateSlug(name) : categoryForm.slug
                            });
                          }}
                          placeholder="Category name"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Slug (URL-friendly)</label>
                        <Input 
                          value={categoryForm.slug}
                          onChange={(e) => setCategoryForm({...categoryForm, slug: e.target.value})}
                          placeholder="category-slug"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Parent Category (Optional)</label>
                        <Select 
                          value={categoryForm.parent_id}
                          onValueChange={(v) => setCategoryForm({...categoryForm, parent_id: v === "none" ? "" : v})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="None (Top-level category)" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">None (Top-level category)</SelectItem>
                            {categories.filter(c => c.id !== editingCategory?.id && !c.parent_id).map(c => (
                              <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Description</label>
                        <Textarea 
                          value={categoryForm.description}
                          onChange={(e) => setCategoryForm({...categoryForm, description: e.target.value})}
                          placeholder="Category description"
                          rows={3}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Image URL (Optional)</label>
                        <Input 
                          value={categoryForm.image_url}
                          onChange={(e) => setCategoryForm({...categoryForm, image_url: e.target.value})}
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Sort Order</label>
                          <Input 
                            type="number"
                            value={categoryForm.sort_order}
                            onChange={(e) => setCategoryForm({...categoryForm, sort_order: Number(e.target.value)})}
                          />
                        </div>
                        <div className="flex items-end">
                          <label className="flex items-center gap-2 pb-2">
                            <input 
                              type="checkbox"
                              checked={categoryForm.is_active}
                              onChange={(e) => setCategoryForm({...categoryForm, is_active: e.target.checked})}
                              className="rounded"
                            />
                            <span className="text-sm">Active</span>
                          </label>
                        </div>
                      </div>
                      <div className="flex gap-3 pt-4">
                        <Button onClick={saveCategory} className="flex-1 gap-2">
                          <Save className="w-4 h-4" />
                          {editingCategory ? "Update" : "Create"}
                        </Button>
                        <Button variant="outline" onClick={() => setIsCategoryDialogOpen(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            )}

            {/* Forklifts Tab */}
            {activeTab === "forklifts" && (
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <h2 className="text-xl font-bold">Manage Forklifts ({forklifts.length})</h2>
                  <Button onClick={() => openForkliftDialog()} className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Forklift
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {forklifts.map((forklift) => (
                    <div key={forklift.id} className={`p-4 rounded-xl border ${forklift.is_available ? 'bg-muted/30 border-border' : 'bg-red-500/5 border-red-500/20'}`}>
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground truncate">{forklift.name}</h3>
                          <p className="text-sm text-muted-foreground">{forklift.type.toUpperCase()} • {forklift.capacity}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${forklift.is_available ? 'bg-emerald-500/10 text-emerald-600' : 'bg-red-500/10 text-red-600'}`}>
                          {forklift.is_available ? "Available" : "Disabled"}
                        </span>
                      </div>
                      
                      <div className="text-sm text-muted-foreground mb-3 space-y-1">
                        <p>Weekly: <span className="font-semibold text-foreground">R{Number(forklift.price_weekly).toLocaleString()}</span></p>
                        <p>Bi-weekly: <span className="font-semibold text-foreground">R{Number(forklift.price_biweekly).toLocaleString()}</span></p>
                        <p>Monthly: <span className="font-semibold text-foreground">R{Number(forklift.price_monthly).toLocaleString()}</span></p>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => openForkliftDialog(forklift)} className="flex-1 gap-1">
                          <Edit className="w-3 h-3" />
                          Edit
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => toggleForkliftAvailability(forklift.id, forklift.is_available)}>
                          {forklift.is_available ? <XCircle className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => deleteForklift(forklift.id)} className="text-destructive hover:text-destructive">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Forklift Dialog */}
                <Dialog open={isForkliftDialogOpen} onOpenChange={setIsForkliftDialogOpen}>
                  <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{editingForklift ? "Edit Forklift" : "Add New Forklift"}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                      <div>
                        <label className="text-sm font-medium">Name</label>
                        <Input 
                          value={forkliftForm.name}
                          onChange={(e) => setForkliftForm({...forkliftForm, name: e.target.value})}
                          placeholder="Forklift name"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium">Type</label>
                          <Select 
                            value={forkliftForm.type}
                            onValueChange={(v) => setForkliftForm({...forkliftForm, type: v})}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="electric">Electric</SelectItem>
                              <SelectItem value="diesel">Diesel</SelectItem>
                              <SelectItem value="lpg">LPG</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <label className="text-sm font-medium">Capacity</label>
                          <Input 
                            value={forkliftForm.capacity}
                            onChange={(e) => setForkliftForm({...forkliftForm, capacity: e.target.value})}
                            placeholder="e.g., 1,400 - 1,600 kg"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Description</label>
                        <Textarea 
                          value={forkliftForm.description}
                          onChange={(e) => setForkliftForm({...forkliftForm, description: e.target.value})}
                          placeholder="Forklift description"
                          rows={3}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Image URL</label>
                        <Input 
                          value={forkliftForm.image_url}
                          onChange={(e) => setForkliftForm({...forkliftForm, image_url: e.target.value})}
                          placeholder="/forklift-1.jpg or full URL"
                        />
                        <p className="text-xs text-muted-foreground mt-1">Use /forklift-1.jpg through /forklift-6.jpg for local images, or paste any external image URL</p>
                        {forkliftForm.image_url && (
                          <div className="mt-3 p-3 bg-muted/30 rounded-lg">
                            <p className="text-xs text-muted-foreground mb-2">Image Preview:</p>
                            <img 
                              src={forkliftForm.image_url.startsWith('/') ? undefined : forkliftForm.image_url}
                              alt="Preview"
                              className="w-full h-32 object-contain rounded-lg bg-muted"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="%23666">Local Image</text></svg>';
                              }}
                            />
                          </div>
                        )}
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="text-sm font-medium">Weekly (R)</label>
                          <Input 
                            type="number"
                            value={forkliftForm.price_weekly}
                            onChange={(e) => setForkliftForm({...forkliftForm, price_weekly: Number(e.target.value)})}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Bi-weekly (R)</label>
                          <Input 
                            type="number"
                            value={forkliftForm.price_biweekly}
                            onChange={(e) => setForkliftForm({...forkliftForm, price_biweekly: Number(e.target.value)})}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">Monthly (R)</label>
                          <Input 
                            type="number"
                            value={forkliftForm.price_monthly}
                            onChange={(e) => setForkliftForm({...forkliftForm, price_monthly: Number(e.target.value)})}
                          />
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                          <input 
                            type="checkbox"
                            checked={forkliftForm.eco_friendly}
                            onChange={(e) => setForkliftForm({...forkliftForm, eco_friendly: e.target.checked})}
                            className="rounded"
                          />
                          <span className="text-sm">Eco-Friendly</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input 
                            type="checkbox"
                            checked={forkliftForm.is_available}
                            onChange={(e) => setForkliftForm({...forkliftForm, is_available: e.target.checked})}
                            className="rounded"
                          />
                          <span className="text-sm">Available</span>
                        </label>
                      </div>
                      <div className="flex gap-3 pt-4">
                        <Button onClick={saveForklift} className="flex-1 gap-2">
                          <Save className="w-4 h-4" />
                          {editingForklift ? "Update" : "Create"}
                        </Button>
                        <Button variant="outline" onClick={() => setIsForkliftDialogOpen(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            )}

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
                  {rentals.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">No rentals yet</p>
                  )}
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
                  {breakdowns.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">No breakdown reports yet</p>
                  )}
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
                            <Button size="sm" onClick={() => updateSupportStatus(request.id, "in_progress")}>
                              <Eye className="w-3 h-3 mr-1" /> Review
                            </Button>
                          )}
                          {request.status === "in_progress" && (
                            <Button size="sm" onClick={() => updateSupportStatus(request.id, "closed")}>
                              <CheckCircle className="w-3 h-3 mr-1" /> Close
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {supportRequests.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">No support requests yet</p>
                  )}
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
