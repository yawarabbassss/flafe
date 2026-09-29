import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { menuCategories, menuItems } from '../data/menu';
import { useCart } from '../context/CartContext';
import { Plus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("All");
  const { addToCart } = useCart();
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  
  const filteredMenu = activeCategory === "All" 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 50, opacity: 0 },
        { 
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="menu" ref={sectionRef} className="py-24 bg-brand-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div ref={titleRef} className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-text mb-4">Explore Our Menu</h2>
          <p className="text-brand-muted max-w-2xl mx-auto">Discover our signature flavors, crafted with premium ingredients and a touch of Flafe magic.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
          {/* Categories Sidebar (Sticky on Desktop, Horizontal Scroll on Mobile) */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="flex overflow-x-auto no-scrollbar gap-3 pb-4 -mx-6 px-6 lg:mx-0 lg:px-0 lg:flex-col lg:sticky lg:top-32 lg:pb-0">
              {menuCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap px-6 py-3 rounded-full lg:rounded-xl text-sm font-semibold transition-all duration-300 text-left ${
                    activeCategory === cat 
                      ? 'bg-brand-text text-white shadow-md lg:translate-x-2' 
                      : 'bg-brand-surface border border-gray-200 text-brand-text hover:border-brand-primary hover:text-brand-primary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredMenu.map((item, index) => (
              <MenuItemCard key={item.id} item={item} onAdd={() => addToCart(item)} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MenuItemCard({ item, onAdd, index }) {
  const cardRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { y: 30, opacity: 0 },
        { 
          y: 0, opacity: 1, duration: 0.6, ease: 'power2.out',
          delay: (index % 4) * 0.1,
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 90%",
          }
        }
      );
    }, cardRef);
    return () => ctx.revert();
  }, [index]);

  return (
    <div ref={cardRef} className="group bg-brand-surface rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        {item.popular && (
          <div className="absolute top-4 left-4 bg-brand-secondary text-brand-text text-xs font-bold px-3 py-1 rounded-full shadow-md">
            Popular
          </div>
        )}
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-brand-text leading-tight">{item.name}</h3>
        </div>
        <p className="text-brand-muted text-sm mb-6 flex-grow">{item.description}</p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold text-brand-primary">Rs. {item.price}</span>
          <button 
            onClick={onAdd}
            className="w-10 h-10 rounded-full bg-brand-surface border-2 border-brand-primary text-brand-primary flex items-center justify-center transition-all duration-300 hover:bg-brand-primary hover:text-white active:scale-95"
            aria-label={`Add ${item.name} to cart`}
          >
            <Plus size={20} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
