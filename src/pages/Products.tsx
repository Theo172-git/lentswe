import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ForkliftMarketplace from "@/components/ForkliftMarketplace";

const Products = () => {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Banner */}
      <section className="pt-40 pb-16 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-0 w-96 h-96 bg-primary/10 blob-shape animate-blob" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/10 blob-shape-2" />
        </div>
        <div className="container-custom relative z-10 text-center">
          <span className="inline-block text-base font-black text-primary uppercase tracking-[0.2em] mb-6 px-6 py-3 bg-primary/10 rounded-full border border-primary/20">
            Our Fleet
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-primary-foreground mb-6 md:mb-8">
            Forklift <span className="text-gradient">Marketplace</span>
          </h1>
          <p className="text-lg md:text-2xl text-primary-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Browse our extensive range of quality forklifts available for rental
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
