import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useCart } from '../context/CartContext';
import { ShoppingBag, ArrowRight, Star } from 'lucide-react';
import { menuItems } from '../data/menu';

export default function Hero() {
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const bottomRef = useRef(null);
  const { openCart, addToCart } = useCart();

  // Get 4 items for the hot deals section
  const hotDeals = menuItems.filter(item => item.popular).slice(0, 4);
  // If not enough popular items, fill with others
  if (hotDeals.length < 4) {
    const others = menuItems.filter(item => !item.popular).slice(0, 4 - hotDeals.length);
    hotDeals.push(...others);
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Left content reveal
      tl.fromTo(leftRef.current.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out' }
      );

      // Right image reveal
      tl.fromTo(rightRef.current,
        { x: 100, opacity: 0, rotation: 5 },
        { x: 0, opacity: 1, rotation: 0, duration: 1.5, ease: 'power3.out' },
        "-=1"
      );

      // Badge animation
      tl.fromTo(".floating-badge",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' },
        "-=0.5"
      );

      // Float effect on the main image
      gsap.to(".hero-main-img", {
        y: -15,
        rotation: 2,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      
      // Bottom cards reveal
      gsap.fromTo(".deal-card",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out', delay: 1 }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="pt-32 pb-16 min-h-screen flex flex-col justify-center bg-brand-background overflow-hidden relative">
      
      {/* Decorative leaf/ingredient elements (optional, but requested in style) */}
      <div className="absolute top-1/4 right-[5%] w-8 h-8 bg-green-500 rounded-full blur-xl opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-1/3 left-[5%] w-12 h-12 bg-brand-primary rounded-full blur-2xl opacity-20 pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-12 flex-1 flex flex-col justify-center">
        
        {/* Top Split Section */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 mb-24">
          
          {/* Left Content */}
          <div ref={leftRef} className="w-full lg:w-1/2 flex flex-col justify-center items-start z-10">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-brand-text mb-6 leading-[1.1] tracking-tight">
              it's not just Food, It's an <span className="text-brand-primary block">Experience.</span>
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <button 
                onClick={openCart}
                className="px-8 py-3.5 bg-brand-primary text-white rounded-full font-bold text-sm md:text-base transition-all duration-300 hover:bg-brand-accent hover:scale-105 active:scale-95 shadow-lg shadow-brand-primary/30"
              >
                View Menu
              </button>
              <a 
                href="#reservation"
                className="px-8 py-3.5 bg-white text-brand-text rounded-full font-bold text-sm md:text-base transition-all duration-300 hover:bg-gray-50 active:scale-95 shadow-sm border border-gray-100"
              >
                Book A Table
              </a>
            </div>

            {/* Reviews Block */}
            <div>
              <p className="text-sm font-bold text-brand-text mb-3">Reviews</p>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 rounded-full border-2 border-brand-background overflow-hidden bg-gray-200">
                    <img src="https://i.pravatar.cc/100?img=33" alt="Reviewer" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-brand-background overflow-hidden bg-gray-200">
                    <img src="https://i.pravatar.cc/100?img=47" alt="Reviewer" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-brand-background overflow-hidden bg-gray-200">
                    <img src="https://i.pravatar.cc/100?img=12" alt="Reviewer" className="w-full h-full object-cover" />
                  </div>
                  <div className="w-10 h-10 rounded-full border-2 border-brand-background bg-gray-800 text-white flex items-center justify-center text-xs font-bold z-10">
                    45+
                  </div>
                </div>
                <div className="flex text-brand-secondary">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div ref={rightRef} className="w-full lg:w-1/2 relative flex justify-center lg:justify-end z-0">
            {/* Floating Badge */}
            <div className="floating-badge absolute top-4 left-0 lg:left-10 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-gray-100 z-20 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                <span className="font-bold text-sm">%</span>
              </div>
              <div>
                <p className="font-bold text-brand-text text-sm">Special</p>
                <p className="text-xs text-brand-primary font-bold">Taste the Magic!</p>
              </div>
            </div>

            {/* Main dish image - Using a reliable Unsplash image masked as a circle */}
            <div className="relative w-full max-w-[450px] aspect-square rounded-full overflow-hidden shadow-2xl border-8 border-white/50">
              <img 
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop" 
                alt="Delicious Zinger Burger" 
                className="hero-main-img w-full h-full object-cover"
              />
            </div>
          </div>

        </div>

        {/* Bottom Specialties Row */}
        <div ref={bottomRef} className="w-full pb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-brand-text">Signature Picks</h3>
            <div className="flex gap-2 hidden md:flex">
               <button className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-brand-text hover:bg-brand-primary hover:text-white transition-colors">
                 <ArrowRight size={18} className="rotate-180" />
               </button>
               <button className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center text-white hover:bg-brand-accent transition-colors">
                 <ArrowRight size={18} />
               </button>
            </div>
          </div>

          <div className="flex overflow-x-auto no-scrollbar gap-6 pt-16 pb-8 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible md:pb-0">
            {hotDeals.map((item, i) => (
              <div key={item.id} className="deal-card min-w-[240px] md:min-w-0 bg-white/80 backdrop-blur-md rounded-[2rem] p-4 relative pt-24 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
                {/* Image positioned overflowing the top */}
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full drop-shadow-lg group-hover:scale-105 transition-transform duration-300">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-full border-4 border-white bg-gray-100" />
                </div>
                
                {/* Cart Button */}
                <button 
                  onClick={() => addToCart(item)}
                  className="absolute top-4 right-4 w-10 h-10 bg-brand-text text-white rounded-xl flex items-center justify-center shadow-lg hover:bg-brand-primary transition-colors z-10"
                >
                  <ShoppingBag size={16} />
                </button>

                <div className="text-center mt-auto">
                  <h4 className="font-bold text-brand-text text-lg mb-1">{item.name}</h4>
                  <p className="text-xs text-brand-muted mb-4 line-clamp-1">{item.category}</p>
                  <p className="font-bold text-brand-primary">Rs. {item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
