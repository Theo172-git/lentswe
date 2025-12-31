import { useState } from "react";
import { ShoppingCart, Leaf, Zap, Fuel, Flame, X, Send, MessageCircle, Phone, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import forkliftElectric from "@/assets/forklift-electric.jpg";
import forkliftDiesel from "@/assets/forklift-diesel.jpg";
import forkliftLpg from "@/assets/forklift-lpg.jpg";

type RentalPeriod = "weekly" | "biweekly" | "monthly";

interface ForkliftProduct {
  id: string;
  name: string;
  type: "electric" | "diesel" | "lpg";
  capacity: string;
  image: string;
  description: string;
  prices: {
    weekly: number;
    biweekly: number;
    monthly: number;
  };
  ecoFriendly: boolean;
}

interface CartItem {
  product: ForkliftProduct;
  rentalPeriod: RentalPeriod;
  quantity: number;
}

const products: ForkliftProduct[] = [
  {
    id: "electric-1",
    name: "EcoLift E3000",
    type: "electric",
    capacity: "3 Ton",
    image: forkliftElectric,
    description: "Zero-emission electric forklift, ideal for indoor warehouse operations. Quiet, clean, and energy efficient.",
    prices: { weekly: 4500, biweekly: 8000, monthly: 14000 },
    ecoFriendly: true,
  },
  {
    id: "electric-2",
    name: "EcoLift E2000",
    type: "electric",
    capacity: "2 Ton",
    image: forkliftElectric,
    description: "Compact electric forklift perfect for tight spaces. Zero emissions for a greener workplace.",
    prices: { weekly: 3500, biweekly: 6500, monthly: 11000 },
    ecoFriendly: true,
  },
  {
    id: "diesel-1",
    name: "PowerLift D5000",
    type: "diesel",
    capacity: "5 Ton",
    image: forkliftDiesel,
    description: "Heavy-duty diesel forklift for outdoor and demanding applications. Rugged reliability.",
    prices: { weekly: 6500, biweekly: 12000, monthly: 20000 },
    ecoFriendly: false,
  },
  {
    id: "diesel-2",
    name: "PowerLift D3500",
    type: "diesel",
    capacity: "3.5 Ton",
    image: forkliftDiesel,
    description: "Versatile diesel forklift balancing power and efficiency for mixed-use operations.",
    prices: { weekly: 5500, biweekly: 10000, monthly: 17000 },
    ecoFriendly: false,
  },
  {
    id: "lpg-1",
    name: "GreenGas G4000",
    type: "lpg",
    capacity: "4 Ton",
    image: forkliftLpg,
    description: "LPG-powered forklift with lower emissions than diesel. Versatile indoor/outdoor use.",
    prices: { weekly: 5000, biweekly: 9000, monthly: 15500 },
    ecoFriendly: true,
  },
  {
    id: "lpg-2",
    name: "GreenGas G2500",
    type: "lpg",
    capacity: "2.5 Ton",
    image: forkliftLpg,
    description: "Compact LPG forklift with cleaner emissions. Great for semi-enclosed areas.",
    prices: { weekly: 4000, biweekly: 7500, monthly: 13000 },
    ecoFriendly: true,
  },
];

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

const periodLabels: Record<RentalPeriod, string> = {
  weekly: "Weekly",
  biweekly: "Bi-Weekly",
  monthly: "Monthly",
};

const ForkliftMarketplace = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedPeriods, setSelectedPeriods] = useState<Record<string, RentalPeriod>>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "electric" | "diesel" | "lpg">("all");

  const addToCart = (product: ForkliftProduct) => {
    const period = selectedPeriods[product.id] || "monthly";
    const existingIndex = cart.findIndex(
      (item) => item.product.id === product.id && item.rentalPeriod === period
    );

    if (existingIndex >= 0) {
      const newCart = [...cart];
      newCart[existingIndex].quantity += 1;
      setCart(newCart);
    } else {
      setCart([...cart, { product, rentalPeriod: period, quantity: 1 }]);
    }
    
    toast.success(`Added ${product.name} (${periodLabels[period]}) to inquiry cart`);
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, delta: number) => {
    const newCart = [...cart];
    newCart[index].quantity = Math.max(1, newCart[index].quantity + delta);
    setCart(newCart);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      return total + item.product.prices[item.rentalPeriod] * item.quantity;
    }, 0);
  };

  const generateInquiryMessage = () => {
    const items = cart.map((item) => 
      `• ${item.product.name} (${item.product.capacity}) - ${periodLabels[item.rentalPeriod]} x${item.quantity} @ R${item.product.prices[item.rentalPeriod].toLocaleString()}/period`
    ).join("\n");
    
    const total = getCartTotal();
    
    return `Hi Lentswe Holding,\n\nI would like to inquire about renting the following forklifts:\n\n${items}\n\nEstimated Total: R${total.toLocaleString()}\n\nPlease contact me with availability and next steps.\n\nThank you!`;
  };

  const sendWhatsAppInquiry = () => {
    if (cart.length === 0) {
      toast.error("Your inquiry cart is empty");
      return;
    }
    const message = encodeURIComponent(generateInquiryMessage());
    window.open(`https://wa.me/27658795912?text=${message}`, "_blank");
  };

  const sendEmailInquiry = () => {
    if (cart.length === 0) {
      toast.error("Your inquiry cart is empty");
      return;
    }
    const subject = encodeURIComponent("Forklift Rental Inquiry - Lentswe Holding");
    const body = encodeURIComponent(generateInquiryMessage());
    window.open(`mailto:Info@Lentsweholding.com?subject=${subject}&body=${body}`, "_blank");
  };

  const filteredProducts = filter === "all" 
    ? products 
    : products.filter((p) => p.type === filter);

  return (
    <section className="section-padding bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden">
      {/* Enhanced decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-500/10 to-teal-500/5 blob-shape animate-blob" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/10 to-secondary/5 blob-shape-2 animate-blob animation-delay-400" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 via-transparent to-transparent rounded-full" />

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
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Choose from our fleet of well-maintained forklifts. Add to your inquiry cart and we'll get back to you promptly.
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
        <div className="flex flex-wrap items-center justify-center gap-4 mb-14">
          {[
            { key: "all", label: "All Forklifts", color: "primary" },
            { key: "electric", label: "Electric", icon: Zap, color: "emerald" },
            { key: "diesel", label: "Diesel", icon: Fuel, color: "amber" },
            { key: "lpg", label: "LPG Gas", icon: Flame, color: "orange" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key as typeof filter)}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 ${
                filter === f.key
                  ? "bg-primary text-primary-foreground shadow-glow scale-105"
                  : "bg-card border-2 border-border hover:border-primary/50 text-foreground hover:shadow-lg hover:-translate-y-0.5"
              }`}
            >
              {f.icon && <f.icon className="w-5 h-5" />}
              {f.label}
            </button>
          ))}
        </div>

        {/* Enhanced Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProducts.map((product) => {
            const TypeIcon = typeIcons[product.type];
            const period = selectedPeriods[product.id] || "monthly";
            
            return (
              <div
                key={product.id}
                className="group bg-card rounded-3xl border-2 border-border overflow-hidden hover:shadow-2xl hover:border-primary/40 transition-all duration-500 hover:-translate-y-2"
              >
                {/* Enhanced Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-muted/50 to-muted">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {product.ecoFriendly && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 gap-1.5 px-3 py-1.5 shadow-lg">
                        <Leaf className="w-4 h-4" />
                        Eco-Friendly
                      </Badge>
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <Badge className={`border-2 ${typeColors[product.type]} gap-1.5 px-3 py-1.5 backdrop-blur-sm bg-background/80`}>
                      <TypeIcon className="w-4 h-4" />
                      {product.type.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="px-3 py-1.5 bg-primary text-primary-foreground rounded-full text-sm font-bold shadow-lg">
                      {product.capacity}
                    </span>
                  </div>
                </div>

                {/* Enhanced Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-black text-foreground">{product.name}</h3>
                    <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1.5 rounded-full">
                      {product.capacity}
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-5 line-clamp-2">{product.description}</p>

                  {/* Enhanced Rental Period Selector */}
                  <div className="flex gap-2 mb-5 p-1 bg-muted/50 rounded-xl">
                    {(["weekly", "biweekly", "monthly"] as RentalPeriod[]).map((p) => (
                      <button
                        key={p}
                        onClick={() => setSelectedPeriods({ ...selectedPeriods, [product.id]: p })}
                        className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-200 ${
                          period === p
                            ? "bg-primary text-primary-foreground shadow-md"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {periodLabels[p]}
                      </button>
                    ))}
                  </div>

                  {/* Enhanced Price & Add to Cart */}
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <span className="text-3xl font-black text-foreground">
                        R{product.prices[period].toLocaleString()}
                      </span>
                      <span className="text-sm text-muted-foreground ml-1">/{period}</span>
                    </div>
                    <Button
                      variant="default"
                      size="lg"
                      onClick={() => addToCart(product)}
                      className="font-bold gap-2 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enhanced Floating Cart Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-18 h-18 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-2xl shadow-2xl shadow-primary/30 flex items-center justify-center hover:scale-110 hover:shadow-primary/50 transition-all duration-300 group"
        >
          <ShoppingCart className="w-7 h-7 group-hover:rotate-12 transition-transform" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 w-7 h-7 bg-secondary text-secondary-foreground text-sm font-black rounded-full flex items-center justify-center shadow-lg animate-pulse">
              {cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </button>

        {/* Cart Drawer */}
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsCartOpen(false)}
            />
            <div className="relative bg-card w-full sm:max-w-lg sm:rounded-2xl rounded-t-2xl max-h-[85vh] overflow-hidden shadow-2xl animate-slide-in-up">
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-border">
                <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-primary" />
                  Inquiry Cart
                </h3>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="p-2 hover:bg-muted rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="p-5 max-h-[40vh] overflow-y-auto space-y-4">
                {cart.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    Your inquiry cart is empty
                  </p>
                ) : (
                  cart.map((item, index) => (
                    <div key={index} className="flex gap-4 p-3 bg-muted/30 rounded-xl">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-foreground truncate">{item.product.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {item.product.capacity} • {periodLabels[item.rentalPeriod]}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center gap-2 bg-background rounded-lg px-2">
                            <button 
                              onClick={() => updateQuantity(index, -1)}
                              className="p-1 hover:text-primary"
                            >
                              -
                            </button>
                            <span className="font-semibold w-6 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(index, 1)}
                              className="p-1 hover:text-primary"
                            >
                              +
                            </button>
                          </div>
                          <span className="font-bold text-primary">
                            R{(item.product.prices[item.rentalPeriod] * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(index)}
                        className="p-2 text-destructive hover:bg-destructive/10 rounded-lg self-start"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Footer */}
              {cart.length > 0 && (
                <div className="p-5 border-t border-border space-y-4">
                  <div className="flex items-center justify-between text-lg">
                    <span className="font-semibold text-foreground">Estimated Total:</span>
                    <span className="font-black text-primary text-2xl">
                      R{getCartTotal().toLocaleString()}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      variant="default"
                      className="w-full font-bold gap-2"
                      onClick={sendWhatsAppInquiry}
                    >
                      <MessageCircle className="w-5 h-5" />
                      WhatsApp
                    </Button>
                    <Button
                      variant="secondary"
                      className="w-full font-bold gap-2"
                      onClick={sendEmailInquiry}
                    >
                      <Send className="w-5 h-5" />
                      Email
                    </Button>
                  </div>
                  
                  <p className="text-xs text-muted-foreground text-center">
                    Or call us directly: <a href="tel:+27658795912" className="text-primary font-semibold hover:underline">+27 65 879 5912</a>
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ForkliftMarketplace;
