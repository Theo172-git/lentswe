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
    <section className="section-padding bg-muted/20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-72 h-72 bg-secondary/5 blob-shape" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 blob-shape-2" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-subtitle">Forklift Rentals</span>
          <h2 className="section-title mb-4">
            Rent Quality <span className="text-gradient">Forklifts</span>
          </h2>
          <p className="section-description max-w-3xl mx-auto mb-6">
            Choose from our fleet of well-maintained forklifts. Add to your inquiry cart and we'll get back to you promptly.
          </p>
          
          {/* Eco Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500/10 rounded-full border border-emerald-500/30 mb-8">
            <Leaf className="w-5 h-5 text-emerald-600" />
            <span className="font-bold text-emerald-700 text-sm">Environmental sustainability is our priority</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {[
            { key: "all", label: "All Forklifts" },
            { key: "electric", label: "Electric", icon: Zap },
            { key: "diesel", label: "Diesel", icon: Fuel },
            { key: "lpg", label: "LPG Gas", icon: Flame },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key as typeof filter)}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 ${
                filter === f.key
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "bg-card border border-border hover:border-primary/30 text-foreground"
              }`}
            >
              {f.icon && <f.icon className="w-4 h-4" />}
              {f.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredProducts.map((product) => {
            const TypeIcon = typeIcons[product.type];
            const period = selectedPeriods[product.id] || "monthly";
            
            return (
              <div
                key={product.id}
                className="group bg-card rounded-2xl border border-border overflow-hidden hover:shadow-glow hover:border-primary/30 transition-all duration-300 hover-lift"
              >
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-muted/30">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.ecoFriendly && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-emerald-500 text-white border-0 gap-1">
                        <Leaf className="w-3 h-3" />
                        Eco-Friendly
                      </Badge>
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <Badge className={`border ${typeColors[product.type]} gap-1`}>
                      <TypeIcon className="w-3 h-3" />
                      {product.type.toUpperCase()}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-foreground">{product.name}</h3>
                    <span className="text-sm font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
                      {product.capacity}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>

                  {/* Rental Period Selector */}
                  <div className="flex gap-2 mb-4">
                    {(["weekly", "biweekly", "monthly"] as RentalPeriod[]).map((p) => (
                      <button
                        key={p}
                        onClick={() => setSelectedPeriods({ ...selectedPeriods, [product.id]: p })}
                        className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                          period === p
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        {periodLabels[p]}
                      </button>
                    ))}
                  </div>

                  {/* Price & Add to Cart */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-black text-foreground">
                        R{product.prices[period].toLocaleString()}
                      </span>
                      <span className="text-sm text-muted-foreground">/{period}</span>
                    </div>
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => addToCart(product)}
                      className="font-semibold gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Floating Cart Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-primary text-primary-foreground rounded-full shadow-glow flex items-center justify-center hover:scale-110 transition-transform"
        >
          <ShoppingCart className="w-6 h-6" />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 w-6 h-6 bg-secondary text-secondary-foreground text-xs font-bold rounded-full flex items-center justify-center">
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
