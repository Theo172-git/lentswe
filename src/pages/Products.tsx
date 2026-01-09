import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ForkliftMarketplace from "@/components/ForkliftMarketplace";
import machinery1 from "@/assets/machinery-1.jpg";

const Products = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Banner with Image - cleaner, subtle overlay */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Background Image - high quality rendering */}
        <div className="absolute inset-0">
          <img 
            src={machinery1} 
            alt="" 
            className="w-full h-full object-cover will-change-transform"
            style={{
              imageRendering: 'crisp-edges',
              transform: 'translateZ(0)',
            }}
            loading="eager"
          />
          {/* Subtle gradient - less aggressive */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background/95" />
        </div>
        
        <div className="container-custom relative z-10 text-center py-12">
          <span className="inline-block text-base font-black text-white uppercase tracking-[0.2em] mb-6 px-6 py-3 bg-primary rounded-full shadow-lg">
            Our Fleet
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 md:mb-8 drop-shadow-lg">
            Materials Handling <span className="text-gradient">Solutions</span>
          </h1>
          <p className="text-lg md:text-2xl text-white/95 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Browse our extensive range of quality equipment available for rental
          </p>
        </div>
      </section>

      {/* Marketplace */}
      <ForkliftMarketplace />

      <Footer />
    </main>
  );
};

export default Products;
