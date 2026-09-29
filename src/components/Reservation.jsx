import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FLAFE_CONFIG, formatWhatsAppReservation } from '../data/config';
import { Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Reservation() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    guests: '4',
    date: '',
    time: '',
    request: ''
  });
  const [isReady, setIsReady] = useState(false);

  // Background images for the grid
  const bgImages = [
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1514933651103-005eab06c04d?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=400&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=400&auto=format&fit=crop",
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(formRef.current,
        { y: 60, opacity: 0, scale: 0.95 },
        { 
          y: 0, opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePrepare = (e) => {
    e.preventDefault();
    setIsReady(true);
  };

  const handleSendReservation = () => {
    const message = formatWhatsAppReservation(formData);
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${FLAFE_CONFIG.whatsappNumber}?text=${encodedMessage}`;
    window.open(url, '_blank');
  };

  return (
    <section id="reservation" ref={sectionRef} className="relative py-32 overflow-hidden bg-black">
      
      {/* Background Image Grid */}
      <div className="absolute inset-0 z-0 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 opacity-40">
        {bgImages.map((src, i) => (
          <div key={i} className="w-full h-full">
            <img src={src} alt="Restaurant vibe" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
          </div>
        ))}
        {bgImages.map((src, i) => (
          <div key={`dup-${i}`} className="w-full h-full hidden md:block">
            <img src={src} alt="Restaurant vibe" className="w-full h-full object-cover grayscale" />
          </div>
        ))}
      </div>
      
      {/* Dark Overlay with brand color tint */}
      <div className="absolute inset-0 bg-black/70 mix-blend-multiply z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-brand-secondary text-center mb-12 drop-shadow-xl">
          Reserve a Table
        </h2>

        <div className="max-w-3xl mx-auto">
          <div 
            ref={formRef} 
            className="bg-[#FFF8EB] rounded-2xl p-8 md:p-12 border-[3px] border-[#2C2A29] shadow-[12px_12px_0_0_#2C2A29] transition-all"
          >
            {isReady ? (
              <div className="text-center py-12 animate-in fade-in">
                <div className="w-20 h-20 bg-brand-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send className="text-brand-secondary" size={32} />
                </div>
                <h3 className="text-2xl font-display font-bold text-brand-text mb-4">Almost Done!</h3>
                <p className="text-brand-muted mb-8 max-w-sm mx-auto">
                  Your reservation request is ready to send to FLAFE via WhatsApp.
                </p>
                <button 
                  onClick={handleSendReservation}
                  className="w-full md:w-auto px-10 py-4 bg-[#25D366] text-white rounded-xl font-bold text-lg border-2 border-black shadow-[4px_4px_0_0_#000] hover:translate-y-1 hover:shadow-[2px_2px_0_0_#000] transition-all flex justify-center items-center gap-2 mx-auto"
                >
                  <Send size={20} /> Send Reservation
                </button>
                <button 
                  onClick={() => setIsReady(false)}
                  className="mt-6 text-brand-text font-bold underline hover:text-brand-primary transition-colors"
                >
                  Go Back
                </button>
              </div>
            ) : (
              <form onSubmit={handlePrepare} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-brand-text">Full Name*</label>
                    <input type="text" name="name" required placeholder="John Smith" value={formData.name} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary outline-none transition-colors" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-brand-text">Phone number*</label>
                    <input type="tel" name="phone" required placeholder="(310) 555-1234" value={formData.phone} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary outline-none transition-colors" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-brand-text">Email address*</label>
                    <input type="email" name="email" required placeholder="john.smith@gmail.com" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary outline-none transition-colors" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-brand-text">Number of guests*</label>
                    <input type="number" name="guests" min="1" max="20" required placeholder="4 guests" value={formData.guests} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary outline-none transition-colors" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-brand-text">Date*</label>
                    <input type="date" name="date" required value={formData.date} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary outline-none transition-colors" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-bold text-brand-text">Time*</label>
                    <input type="time" name="time" required value={formData.time} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary outline-none transition-colors" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-brand-text">Special requests</label>
                  <textarea name="request" rows="2" placeholder="Window seat with birthday decoration" value={formData.request} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:border-brand-secondary focus:ring-1 focus:ring-brand-secondary outline-none transition-colors resize-none"></textarea>
                </div>

                <div className="pt-2">
                  <button type="submit" className="px-8 py-3 bg-brand-secondary text-brand-text rounded-lg font-bold text-base border-2 border-[#2C2A29] shadow-[4px_4px_0_0_#2C2A29] hover:translate-y-1 hover:shadow-[2px_2px_0_0_#2C2A29] active:translate-y-2 active:shadow-none transition-all">
                    Reserve Now
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
