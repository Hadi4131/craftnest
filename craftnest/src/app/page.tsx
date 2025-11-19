"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight, Trash2, Eye } from "lucide-react";

// UI Components
import { AuroraBackground } from "@/components/ui/aurora-background";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"; // <--- New Import
import { Pricing } from "@/components/ui/pricing";
import { PillBase } from "@/components/ui/3d-adaptive-navigation-bar";
import { TestimonialSection } from "@/components/ui/testimonial-cards";
import { Marquee } from "@/components/ui/marquee"; 
import { FAQSection } from "@/components/ui/faq-section";

// Shadcn Components
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

// --- Data ---
const products = [
  {
    id: 1,
    name: "Minimalist Knit Sweater",
    price: 89.00,
    category: "Apparel",
    description: "Hand-knit from 100% merino wool. This sweater is breathable, warm, and perfect for layering in any season.",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Artisan Ceramic Mug",
    price: 35.00,
    category: "Home",
    description: "Thrown on a wheel by master potters. Each mug features a unique glaze pattern that makes it one-of-a-kind.",
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Canvas Tote: 'Create'",
    price: 25.00,
    category: "Accessories",
    description: "Heavy-duty canvas with reinforced stitching. Spacious enough for your laptop, sketchbook, and groceries.",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop",
  },
];

const pricingPlans = [
  {
    name: "Maker",
    price: "29",
    yearlyPrice: "24",
    period: "per month",
    features: ["5 Custom Designs", "Standard Printing", "Email Support", "Community Access"],
    description: "For hobbyists starting their journey.",
    buttonText: "Join Now",
    href: "#",
    isPopular: false,
  },
  {
    name: "Artisan",
    price: "59",
    yearlyPrice: "49",
    period: "per month",
    features: ["Unlimited Designs", "Priority Printing", "24/7 Support", "Store Analytics", "Custom Branding"],
    description: "For serious creators scaling up.",
    buttonText: "Go Pro",
    href: "#",
    isPopular: true,
  },
  {
    name: "Studio",
    price: "199",
    yearlyPrice: "159",
    period: "per month",
    features: ["Everything in Artisan", "Dedicated Manager", "Bulk Discounts", "API Access"],
    description: "Full scale production power.",
    buttonText: "Contact Us",
    href: "#",
    isPopular: false,
  },
];

export default function Home() {
  // --- State ---
  const [cart, setCart] = useState<{id: number, qty: number}[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);

  // --- Cart Logic ---
  const addToCart = (productId: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing) {
        return prev.map(item => item.id === productId ? {...item, qty: item.qty + 1} : item);
      }
      return [...prev, { id: productId, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const cartTotal = cart.reduce((total, item) => {
    const product = products.find(p => p.id === item.id);
    return total + (product ? product.price * item.qty : 0);
  }, 0);

  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div className="bg-background min-h-screen font-sans selection:bg-brand-orange selection:text-white">
      
      {/* --- Navigation Bar --- */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-white/60 backdrop-blur-md dark:bg-black/60 transition-all duration-300">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between relative">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
            <div className="h-8 w-8 bg-brand-deep rounded-full flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-lg">C</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white hidden sm:block">CraftNest</span>
          </div>

          {/* 3D Navigation Pill */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 hidden md:block">
             <PillBase />
          </div>

          <div className="flex items-center gap-4">
            {/* Cart Sheet Trigger */}
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <button className="p-2 hover:bg-slate-100 rounded-full transition-colors dark:hover:bg-slate-800 relative">
                  <ShoppingBag className="w-5 h-5 text-slate-700 dark:text-slate-300" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-brand-deep text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm">
                      {cartCount}
                    </span>
                  )}
                </button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md flex flex-col">
                <SheetHeader>
                  <SheetTitle>Your Cart ({cartCount})</SheetTitle>
                </SheetHeader>
                
                <ScrollArea className="flex-1 -mx-6 px-6 my-4">
                  {cart.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20">
                      <ShoppingBag className="w-16 h-16 text-slate-300" />
                      <p className="text-slate-500">Your cart is empty.</p>
                      <Button variant="outline" onClick={() => setIsCartOpen(false)}>Start Shopping</Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {cart.map((item) => {
                        const product = products.find(p => p.id === item.id)!;
                        return (
                          <div key={item.id} className="flex gap-4">
                            <div className="relative h-20 w-20 rounded-md overflow-hidden bg-slate-100 flex-shrink-0">
                              <Image src={product.image} alt={product.name} fill className="object-cover" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{product.name}</h4>
                              <p className="text-sm text-slate-500 mt-1">${product.price.toFixed(2)}</p>
                              <div className="flex items-center gap-3 mt-2">
                                <span className="text-xs bg-slate-100 px-2 py-1 rounded">Qty: {item.qty}</span>
                                <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1">
                                  <Trash2 className="w-3 h-3" /> Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </ScrollArea>

                {cart.length > 0 && (
                  <SheetFooter className="flex-col sm:flex-col gap-4 border-t pt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Subtotal</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <Button className="w-full bg-brand-deep hover:bg-brand-orange h-12 text-lg">Checkout Now</Button>
                  </SheetFooter>
                )}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section id="home" className="relative h-screen w-full">
        <AuroraBackground>
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
            className="relative flex flex-col gap-6 items-center justify-center px-4 text-center z-10 max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center rounded-full border border-slate-200 bg-white/50 px-3 py-1 text-sm text-slate-900 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-brand-deep mr-2"></span>
              New Summer Collection Available
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-slate-900 dark:text-white leading-[0.9]">
              Designs Made <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-deep to-brand-orange">Personal.</span>
            </h1>
            <p className="text-lg md:text-2xl font-light text-slate-600 dark:text-neutral-300 max-w-xl leading-relaxed">
              A curated marketplace for aesthetic, custom-made goods. 
              Elevate your lifestyle with minimalism.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              {/* --- NEW BUTTON COMPONENT HERE --- */}
              <InteractiveHoverButton 
                text="Shop Collection" 
                onClick={() => document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}
              />
            </div>
          </motion.div>
        </AuroraBackground>
      </section>

      {/* --- Marquee Section --- */}
      <Marquee />

      {/* --- Featured Products --- */}
      <section id="shop" className="py-24 container mx-auto px-6 scroll-mt-20">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Seasonal Favorites</h2>
            <p className="text-slate-500 mt-2">Handpicked items for the cozy season.</p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-brand-deep font-medium hover:gap-3 transition-all">
            View all <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              {/* Image Card */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-slate-100">
                <Image 
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                
                {/* Hover Actions */}
                <div className="absolute bottom-6 inset-x-6 flex gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <button 
                    onClick={() => addToCart(product.id)}
                    className="flex-1 bg-white text-black py-3 rounded-full font-bold text-sm shadow-lg hover:bg-brand-deep hover:text-white transition-colors"
                  >
                    Add to Cart
                  </button>
                  <button 
                    onClick={() => setSelectedProduct(product)}
                    className="bg-white/90 backdrop-blur-sm p-3 rounded-full text-black shadow-lg hover:bg-white transition-colors"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              {/* Details */}
              <div className="mt-6">
                <p className="text-sm text-brand-deep font-medium">{product.category}</p>
                <h3 className="text-xl font-bold text-slate-900 mt-1">{product.name}</h3>
                <p className="text-slate-600 mt-1">${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- Product Quick View Dialog --- */}
      <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        <DialogContent className="sm:max-w-[800px] p-0 overflow-hidden">
          {selectedProduct && (
            <div className="grid grid-cols-1 md:grid-cols-2 h-full">
              <div className="relative h-64 md:h-full bg-slate-100">
                <Image src={selectedProduct.image} alt={selectedProduct.name} fill className="object-cover" />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className="text-brand-deep font-bold tracking-wide text-sm uppercase">{selectedProduct.category}</span>
                <DialogHeader className="mt-2 mb-4">
                  <DialogTitle className="text-3xl font-bold">{selectedProduct.name}</DialogTitle>
                  <DialogDescription className="text-xl text-slate-900 font-medium mt-1">
                    ${selectedProduct.price.toFixed(2)}
                  </DialogDescription>
                </DialogHeader>
                <p className="text-slate-600 mb-6 leading-relaxed">{selectedProduct.description}</p>
                <Button 
                  className="w-full bg-brand-deep hover:bg-brand-orange h-12 text-lg"
                  onClick={() => {
                    addToCart(selectedProduct.id);
                    setSelectedProduct(null);
                  }}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* --- Reviews --- */}
      <section id="reviews" className="py-24 bg-brand-cream/20 scroll-mt-20 overflow-hidden">
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
             <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900">
               Loved by <br/> <span className="text-brand-deep">Creators.</span>
             </h2>
             <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto lg:mx-0">
               We don't just sell products; we support a community of minimalists and artisans.
             </p>
          </div>
          <div className="h-[450px] relative flex items-center justify-center">
             <TestimonialSection />
          </div>
        </div>
      </section>

      {/* --- FAQ Section (New) --- */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
             <h2 className="text-3xl font-bold text-slate-900">Frequently Asked Questions</h2>
             <p className="text-slate-500 mt-2">Everything you need to know about CraftNest.</p>
          </div>
          <FAQSection />
        </div>
      </section>

      {/* --- Pricing Section --- */}
      <section id="pricing" className="bg-slate-50/50 scroll-mt-20">
        <Pricing 
          plans={pricingPlans} 
          title="Craft Your Business" 
          description="Unlock exclusive tools and discounts for bulk creators."
        />
      </section>

      {/* --- Footer --- */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
             <h3 className="text-2xl font-bold">CraftNest.</h3>
             <p className="text-slate-400 text-sm">Designs made personal.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="#" className="hover:text-white">New Arrivals</Link></li>
              <li><Link href="#" className="hover:text-white">Best Sellers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="#" className="hover:text-white">About Us</Link></li>
              <li><Link href="#" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Stay Updated</h4>
            <div className="flex gap-2">
              <input type="email" placeholder="Enter email" className="bg-slate-800 border-none rounded-md px-4 py-2 text-sm w-full" />
              <button className="bg-brand-deep px-4 py-2 rounded-md text-sm font-bold">Go</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
