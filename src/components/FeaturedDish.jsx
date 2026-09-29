import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCart } from '../context/CartContext';
import { menuItems } from '../data/menu';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedDish() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const { addToCart } = useCart();

  // Find a signature dish
  const signature = menuItems.find(item => item.id === "z2") || menuItems[0];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image Parallax
      gsap.to(imageRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      // Content Reveal
      gsap.fromTo(contentRef.current.children,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 75%",
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          <div className="w-full lg:w-1/2 relative rounded-[3rem] overflow-hidden aspect-[4/5] shadow-2xl">
            <img 
              ref={imageRef}
              src={signature.image} 
              alt={signature.name} 
              className="absolute inset-0 w-full h-[120%] object-cover -top-[10%]"
            />
            {/* Overlay for cinematic feel */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
          </div>

          <div ref={contentRef} className="w-full lg:w-1/2 flex flex-col justify-center">
            <span className="text-brand-primary font-bold tracking-widest uppercase text-sm mb-6 block">
              Signature Dish
            </span>
            <h2 className="text-5xl md:text-6xl font-display font-bold text-brand-text mb-8 leading-tight">
              {signature.name}
            </h2>
            <p className="text-lg text-brand-muted mb-10 max-w-lg leading-relaxed">
              {signature.description} Experience the ultimate crunch and flavor combination that made us famous across Narowal.
            </p>
            <div className="flex items-center gap-8">
              <span className="text-4xl font-bold text-brand-primary">Rs. {signature.price}</span>
              <button 
                onClick={() => addToCart(signature)}
                className="px-8 py-4 bg-brand-text text-white rounded-full font-bold hover:bg-brand-primary transition-colors shadow-lg active:scale-95"
              >
                Order Now
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
