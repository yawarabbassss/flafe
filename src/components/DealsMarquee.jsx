import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { menuItems } from '../data/menu';

export default function DealsMarquee() {
  const { addToCart } = useCart();
  
  // Find some items to use in the banners
  const pizza = menuItems.find(i => i.id === "p2") || menuItems[2];
  const zinger = menuItems.find(i => i.id === "z2") || menuItems[1];
  const fries = menuItems.find(i => i.id === "f1") || menuItems[5];

  const deals = [
    {
      id: "deal1",
      bgClass: "bg-red-800",
      content: (
        <div className="relative w-[400px] h-[220px] rounded-2xl overflow-hidden shadow-lg flex flex-shrink-0 cursor-pointer group">
          <div className="absolute inset-0 bg-gradient-to-r from-red-800 to-red-900"></div>
          {/* Yellow Ribbon */}
          <div className="absolute -left-10 bottom-4 w-64 bg-[#C1A848] -rotate-[25deg] py-1.5 z-10 shadow-md flex justify-center">
             <span className="font-bold text-gray-900 text-sm">Starting @ Rs. 1500 only</span>
          </div>
          
          <div className="relative z-10 p-6 flex flex-col justify-start w-1/2">
             <h3 className="text-white font-bold leading-tight text-3xl">
               <span className="text-5xl text-[#FDB813] mr-1">2</span> 
               MEDIUM<br/>PIZZAS
             </h3>
             <p className="text-white font-medium mt-1">One + One</p>
          </div>
          
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[220px] h-[220px] rounded-full translate-x-8 group-hover:scale-105 transition-transform duration-500">
             <img src={pizza.image} alt="Pizza" className="w-full h-full object-cover rounded-full border-4 border-gray-900 shadow-2xl" />
          </div>
        </div>
      )
    },
    {
      id: "deal2",
      bgClass: "bg-[#2A2B2E]",
      content: (
        <div className="relative w-[400px] h-[220px] rounded-2xl overflow-hidden shadow-lg flex flex-shrink-0 cursor-pointer group">
          <div className="absolute inset-0 bg-[#2A2B2E]"></div>
          {/* Orange Wave at bottom */}
          <div className="absolute -bottom-10 left-0 w-[120%] h-24 bg-brand-primary -rotate-3 z-0 rounded-t-[3rem]"></div>
          
          <div className="relative z-10 p-6 flex flex-col justify-between h-full w-2/3">
             <div>
               <p className="text-brand-primary font-display italic text-lg mb-1">Super Delicious</p>
               <h3 className="text-white font-display font-bold text-4xl mb-1">Pizzas</h3>
               <p className="text-gray-300 text-sm font-medium">Today's Best Deal!</p>
             </div>
             <div>
                <p className="text-white/80 text-xs">Cool Deal</p>
                <p className="text-white font-bold text-2xl">30% OFF!</p>
             </div>
          </div>
          
          <div className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden flex justify-end items-center group-hover:scale-105 transition-transform duration-500 z-10">
             <div className="w-[200px] h-[200px] translate-x-12 rounded-full">
               <img src={pizza.image} alt="Pizza" className="w-full h-full object-cover rounded-full border-4 border-transparent" />
             </div>
          </div>
        </div>
      )
    },
    {
      id: "deal3",
      bgClass: "bg-[#F37021]",
      content: (
        <div className="relative w-[400px] h-[220px] rounded-2xl overflow-hidden shadow-lg flex flex-shrink-0 cursor-pointer group">
          <div className="absolute inset-0 bg-brand-primary"></div>
          {/* Graphic shapes */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl translate-x-10 -translate-y-10"></div>
          <div className="absolute bottom-0 left-10 w-24 h-24 bg-black/10 rounded-full blur-lg"></div>
          
          <div className="relative z-10 p-6 flex flex-col justify-center h-full w-3/5">
             <span className="bg-black text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded w-max mb-2">Combo</span>
             <h3 className="text-white font-bold leading-tight text-3xl mb-1">Mighty<br/>Zinger</h3>
             <p className="text-white/90 font-medium text-sm mb-3">Burger + Fries + Drink</p>
             <p className="text-white font-bold text-xl bg-black/20 w-max px-3 py-1 rounded-full">Rs. 850</p>
          </div>
          
          <div className="absolute right-0 bottom-0 w-[180px] h-[180px] rounded-full translate-x-4 translate-y-4 group-hover:scale-110 transition-transform duration-500 z-10">
             <img src={zinger.image} alt="Burger" className="w-full h-full object-cover rounded-full border-4 border-white shadow-xl" />
          </div>
        </div>
      )
    }
  ];

  // Duplicate deals to create the seamless infinite scroll effect
  const marqueeItems = [...deals, ...deals, ...deals, ...deals];

  return (
    <section className="py-20 bg-brand-background overflow-hidden border-t border-gray-100">
      <div className="container mx-auto px-6 lg:px-12 mb-10 flex justify-between items-end">
        <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-text">Hot Deals.</h2>
        <div className="hidden md:flex gap-2">
          <button className="w-10 h-10 bg-white shadow-md rounded-md flex items-center justify-center text-brand-text hover:text-brand-primary hover:bg-gray-50 transition-colors">
            <ChevronLeft size={20} />
          </button>
          <button className="w-10 h-10 bg-white shadow-md rounded-md flex items-center justify-center text-brand-text hover:text-brand-primary hover:bg-gray-50 transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden flex">
        <div className="flex w-max animate-marquee gap-6 px-3">
          {marqueeItems.map((deal, index) => (
            <div key={`${deal.id}-${index}`} onClick={() => addToCart(pizza)} className="flex-shrink-0">
              {deal.content}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
