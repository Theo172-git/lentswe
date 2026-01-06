import { useState, useEffect } from "react";
import { Leaf, Zap, Fuel, Flame, X, Loader2, FileText, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import forklift1 from "@/assets/forklift-1.jpg";
import forklift2 from "@/assets/forklift-2.jpg";
import forklift3 from "@/assets/forklift-3.jpg";
import forklift4 from "@/assets/forklift-4.jpg";
import forklift5 from "@/assets/forklift-5.jpg";
import forklift6 from "@/assets/forklift-6.jpg";

interface ForkliftProduct {
  id: string;
  name: string;
  type: "electric" | "diesel" | "lpg";
  capacity: string;
  image: string;
  description: string;
  ecoFriendly: boolean;
}

// Local image mapping for database entries
const imageMap: Record<string, string> = {
  "/forklift-1.jpg": forklift1,
  "/forklift-2.jpg": forklift2,
  "/forklift-3.jpg": forklift3,
  "/forklift-4.jpg": forklift4,
  "/forklift-5.jpg": forklift5,
  "/forklift-6.jpg": forklift6,
};

const typeIcons = {
  electric: Zap,
  diesel: Fuel,
  lpg: Flame,
};

const typeColors = {
  electric: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
  diesel: "bg-amber-500/10 text-amber-600 border-amber-500/30",
  lpg: "bg-orange-500/10 text-orange-600 border-orange-500/30",
};

const rentalDurationOptions = [
  { value: "1_week", label: "1 Week" },
  { value: "2_weeks", label: "2 Weeks" },
  { value: "monthly", label: "1 Month" },
  { value: "3_months", label: "3 Months" },
  { value: "1_year", label: "1 Year" },
  { value: "custom", label: "Custom Period" },
];

const forkliftTypeOptions = [
  { value: "electric", label: "Electric" },
  { value: "diesel", label: "Diesel" },
  { value: "lpg", label: "LPG / Gas" },
];

interface QuoteFormData {
  clientName: string;
  email: string;
  contactNumber: string;
  companyName: string;
  location: string;
  startDate: string;
  rentalDuration: string;
  customDuration: string;
  forkliftType: string;
}

const ForkliftMarketplace = () => {
  const [products, setProducts] = useState<ForkliftProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "electric" | "diesel" | "lpg">("all");
  const [isQuoteDialogOpen, setIsQuoteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ForkliftProduct | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<QuoteFormData>({
    clientName: "",
    email: "",
    contactNumber: "",
    companyName: "",
    location: "",
    startDate: "",
    rentalDuration: "",
    customDuration: "",
    forkliftType: "",
  });

  useEffect(() => {
    fetchForklifts();
  }, []);

  const fetchForklifts = async () => {
    try {
      const { data, error } = await supabase
        .from("forklifts")
        .select("*")
        .eq("is_available", true)
        .order("created_at", { ascending: true });

      if (error) throw error;

      const mappedProducts: ForkliftProduct[] = (data || []).map((f) => ({
        id: f.id,
        name: f.name,
        type: f.type as "electric" | "diesel" | "lpg",
        capacity: f.capacity,
        image: imageMap[f.image_url || ""] || f.image_url || forklift1,
        description: f.description || "",
        ecoFriendly: f.eco_friendly,
      }));

      setProducts(mappedProducts);
    } catch (error) {
      console.error("Error fetching forklifts:", error);
    } finally {
      setLoading(false);
    }
  };

  const openQuoteDialog = (product: ForkliftProduct) => {
    setSelectedProduct(product);
    setFormData({
      ...formData,
      forkliftType: product.type,
    });
    setIsQuoteDialogOpen(true);
  };

  const handleFormChange = (field: keyof QuoteFormData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const validateForm = (): boolean => {
    if (!formData.clientName.trim()) {
      toast.error("Please enter your name");
      return false;
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (!formData.contactNumber.trim()) {
      toast.error("Please enter your contact number");
      return false;
    }
    if (!formData.companyName.trim()) {
      toast.error("Please enter your company name");
      return false;
    }
    if (!formData.location.trim()) {
      toast.error("Please enter your location");
      return false;
    }
    if (!formData.startDate) {
      toast.error("Please select a start date");
      return false;
    }
    if (!formData.rentalDuration) {
      toast.error("Please select a rental duration");
      return false;
    }
    if (formData.rentalDuration === "custom" && !formData.customDuration.trim()) {
      toast.error("Please specify your custom rental period");
      return false;
    }
    if (!formData.forkliftType) {
      toast.error("Please select a forklift type");
      return false;
    }
    return true;
  };

  const generateQuoteMessage = () => {
    const duration = formData.rentalDuration === "custom" 
      ? formData.customDuration 
      : rentalDurationOptions.find(o => o.value === formData.rentalDuration)?.label;
    
    const forkliftTypeLabel = forkliftTypeOptions.find(o => o.value === formData.forkliftType)?.label;

    return `Hi Lentswe Holding,

I would like to request a quote for forklift rental:

FORKLIFT DETAILS:
• Equipment: ${selectedProduct?.name || "General Inquiry"}
• Capacity: ${selectedProduct?.capacity || "N/A"}
• Type Preference: ${forkliftTypeLabel}

CLIENT DETAILS:
• Name: ${formData.clientName}
• Company: ${formData.companyName}
• Email: ${formData.email}
• Contact: ${formData.contactNumber}
• Location: ${formData.location}

RENTAL REQUIREMENTS:
• Start Date: ${formData.startDate}
• Duration: ${duration}

Please contact me with pricing and availability.

Thank you!`;
  };

  const submitQuote = async (method: "whatsapp" | "email") => {
    if (!validateForm()) return;
    
    setSubmitting(true);
    
    try {
      const message = generateQuoteMessage();
      
      if (method === "whatsapp") {
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/27658795912?text=${encodedMessage}`, "_blank");
      } else {
        const subject = encodeURIComponent(`Quote Request - ${selectedProduct?.name || "Forklift Rental"} - ${formData.companyName}`);
        const body = encodeURIComponent(message);
        window.open(`mailto:Info@Lentsweholding.com?subject=${subject}&body=${body}`, "_blank");
      }
      
      toast.success("Quote request initiated! We'll respond within 24 hours.");
      setIsQuoteDialogOpen(false);
      setFormData({
        clientName: "",
        email: "",
        contactNumber: "",
        companyName: "",
        location: "",
        startDate: "",
        rentalDuration: "",
        customDuration: "",
        forkliftType: "",
      });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredProducts = filter === "all" 
    ? products 
    : products.filter((p) => p.type === filter);

  return (
    <section className="section-padding bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden">
      {/* Enhanced decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 blob-shape animate-blob pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/10 to-secondary/5 blob-shape-2 animate-blob animation-delay-400 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 via-transparent to-transparent rounded-full pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 mb-6 animate-fade-in">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-sm font-bold text-primary uppercase tracking-wider">Premium Fleet</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6">
            Rent Quality <span className="text-gradient">Forklifts</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-4 leading-relaxed">
            Browse our fleet of well-maintained forklifts. Request a quote and we'll get back to you promptly.
          </p>
          
          {/* Enhanced Eco Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full border border-emerald-500/30 shadow-lg shadow-emerald-500/10">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-emerald-700 dark:text-emerald-400">Environmental sustainability is our priority</span>
          </div>
        </div>

        {/* Enhanced Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
          {[
            { key: "all", label: "All Forklifts", color: "primary" },
            { key: "electric", label: "Electric", icon: Zap, color: "emerald" },
            { key: "diesel", label: "Diesel", icon: Fuel, color: "amber" },
            { key: "lpg", label: "LPG Gas", icon: Flame, color: "orange" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key as typeof filter)}
              className={`inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl font-bold text-xs sm:text-sm transition-all duration-300 ${
                filter === f.key
                  ? "bg-primary text-primary-foreground shadow-glow scale-105"
                  : "bg-card border-2 border-border hover:border-primary/50 text-foreground hover:shadow-lg hover:-translate-y-0.5"
              }`}
            >
              {f.icon && <f.icon className="w-4 h-4" />}
              {f.label}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}

        {/* Enhanced Products Grid */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-16">
            {filteredProducts.map((product) => {
              const TypeIcon = typeIcons[product.type];
              
              return (
                <div
                  key={product.id}
                  className="group bg-card rounded-2xl sm:rounded-3xl border-2 border-border overflow-hidden hover:shadow-2xl hover:border-primary/40 transition-all duration-500 hover:-translate-y-2"
                >
                  {/* Enhanced Image */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-muted/50 to-muted">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain bg-muted/30 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    {product.ecoFriendly && (
                      <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                        <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 shadow-lg text-xs">
                          <Leaf className="w-3 h-3 sm:w-4 sm:h-4" />
                          Eco-Friendly
                        </Badge>
                      </div>
                    )}
                    <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                      <Badge className={`border-2 ${typeColors[product.type]} gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 backdrop-blur-sm bg-background/80 text-xs`}>
                        <TypeIcon className="w-3 h-3 sm:w-4 sm:h-4" />
                        {product.type.toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  {/* Enhanced Content */}
                  <div className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
                      <h3 className="text-lg sm:text-xl font-black text-foreground">{product.name}</h3>
                      <span className="text-xs sm:text-sm font-bold text-primary bg-primary/10 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full whitespace-nowrap self-start">
                        {product.capacity}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-5 line-clamp-2">{product.description}</p>

                    {/* Request Quote Button */}
                    <Button
                      variant="default"
                      size="lg"
                      onClick={() => openQuoteDialog(product)}
                      className="w-full font-bold gap-2 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                      Request Quote
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Quote Request Dialog */}
      <Dialog open={isQuoteDialogOpen} onOpenChange={setIsQuoteDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-xl">
              <FileText className="w-5 h-5 text-primary" />
              Request a Quote
            </DialogTitle>
          </DialogHeader>
          
          {selectedProduct && (
            <div className="p-3 bg-muted/50 rounded-xl mb-4">
              <p className="font-semibold text-foreground">{selectedProduct.name}</p>
              <p className="text-sm text-muted-foreground">{selectedProduct.capacity} • {selectedProduct.type.toUpperCase()}</p>
            </div>
          )}

          <div className="space-y-4">
            {/* Client Name */}
            <div>
              <Label htmlFor="clientName">Full Name *</Label>
              <Input
                id="clientName"
                value={formData.clientName}
                onChange={(e) => handleFormChange("clientName", e.target.value)}
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleFormChange("email", e.target.value)}
                placeholder="your@email.com"
              />
            </div>

            {/* Contact Number */}
            <div>
              <Label htmlFor="contactNumber">Contact Number *</Label>
              <Input
                id="contactNumber"
                value={formData.contactNumber}
                onChange={(e) => handleFormChange("contactNumber", e.target.value)}
                placeholder="+27 XX XXX XXXX"
              />
            </div>

            {/* Company Name */}
            <div>
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => handleFormChange("companyName", e.target.value)}
                placeholder="Your company name"
              />
            </div>

            {/* Location */}
            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleFormChange("location", e.target.value)}
                placeholder="City, Province"
              />
            </div>

            {/* Start Date */}
            <div>
              <Label htmlFor="startDate">Rental Start Date *</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleFormChange("startDate", e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            {/* Rental Duration */}
            <div>
              <Label htmlFor="rentalDuration">Rental Duration *</Label>
              <Select 
                value={formData.rentalDuration}
                onValueChange={(v) => handleFormChange("rentalDuration", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  {rentalDurationOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Custom Duration */}
            {formData.rentalDuration === "custom" && (
              <div>
                <Label htmlFor="customDuration">Specify Custom Period *</Label>
                <Input
                  id="customDuration"
                  value={formData.customDuration}
                  onChange={(e) => handleFormChange("customDuration", e.target.value)}
                  placeholder="e.g., 6 weeks, 4 months"
                />
              </div>
            )}

            {/* Forklift Type */}
            <div>
              <Label htmlFor="forkliftType">Preferred Forklift Type *</Label>
              <Select 
                value={formData.forkliftType}
                onValueChange={(v) => handleFormChange("forkliftType", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {forkliftTypeOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Submit Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-4">
              <Button
                onClick={() => submitQuote("whatsapp")}
                disabled={submitting}
                className="gap-2 font-bold bg-emerald-600 hover:bg-emerald-700"
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Calendar className="w-4 h-4" />}
                WhatsApp
              </Button>
              <Button
                variant="outline"
                onClick={() => submitQuote("email")}
                disabled={submitting}
                className="gap-2 font-bold"
              >
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
                Email
              </Button>
            </div>
            
            <p className="text-xs text-center text-muted-foreground">
              We'll respond within 24 hours with pricing and availability
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ForkliftMarketplace;
