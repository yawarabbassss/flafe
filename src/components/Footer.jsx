import { FLAFE_CONFIG } from '../data/config';
import { MapPin, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Footer() {
  const { openCart } = useCart();

  return (
    <footer id="contact" className="bg-[#11100F] text-white pt-24 pb-6 overflow-hidden relative border-t-[8px] border-brand-primary">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Top CTA Area */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center border-b border-white/10 pb-16 mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 text-white">Craving something delicious?</h2>
            <p className="text-gray-400 text-lg">Experience the taste of happiness at home or in our restaurants.</p>
          </div>
          <div className="flex flex-wrap gap-4 w-full lg:w-auto">
            <button 
              onClick={openCart}
              className="px-8 py-4 rounded-full bg-brand-primary text-white font-bold hover:bg-brand-accent transition-colors shadow-lg hover:shadow-brand-primary/20 w-full sm:w-auto"
            >
              Order Online
            </button>
            <a 
              href="#reservation" 
              className="px-8 py-4 rounded-full border border-white/20 text-white font-bold hover:bg-white hover:text-brand-text transition-colors w-full sm:w-auto text-center"
            >
              Book a Table
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-24">
          
          {/* Brand Info */}
          <div className="lg:col-span-4 pr-4">
            <span className="font-display font-bold text-5xl mb-6 block text-white tracking-tight">
              <span className="text-brand-primary">F</span>lafe
            </span>
            <p className="text-gray-400 mb-8 max-w-sm leading-relaxed">{FLAFE_CONFIG.tagline}. Big taste, big vibes, served fresh in every bite.</p>
            <div className="flex gap-4">
              <a href={`https://instagram.com/${FLAFE_CONFIG.instagram.replace('@','')}`} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-brand-primary hover:border-brand-primary hover:text-white transition-all transform hover:-translate-y-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
            </div>
          </div>

          {/* Locations */}
          <div className="lg:col-span-5">
            <h4 className="text-xs font-bold mb-8 text-brand-muted uppercase tracking-[0.2em]">Our Locations</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
              {FLAFE_CONFIG.branches.map((branch, idx) => (
                <div key={idx} className="group">
                  <h5 className="font-bold text-white mb-3 flex items-center gap-2 group-hover:text-brand-primary transition-colors">
                    {branch.name}
                  </h5>
                  <div className="flex items-start gap-2 mb-2 text-gray-400">
                    <MapPin size={16} className="mt-1 flex-shrink-0 text-brand-muted" />
                    <p className="text-sm leading-relaxed">{branch.address}</p>
                  </div>
                  <div className="flex items-start gap-2 text-gray-400">
                    <Phone size={16} className="mt-0.5 flex-shrink-0 text-brand-muted" />
                    <div>
                      {branch.phones.map((phone, i) => (
                        <p key={i} className="text-sm mb-1">{phone}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold mb-8 text-brand-muted uppercase tracking-[0.2em]">Explore</h4>
            <ul className="space-y-4">
              <li><a href="#menu" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><span className="w-4 h-[1px] bg-brand-primary"></span> Menu</a></li>
              <li><a href="#reservation" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><span className="w-4 h-[1px] bg-brand-primary"></span> Book a Table</a></li>
              <li><a href="#experience" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"><span className="w-4 h-[1px] bg-brand-primary"></span> Our Story</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} {FLAFE_CONFIG.businessName}. All rights reserved.</p>
          <div className="flex gap-6 items-center flex-wrap justify-center">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <span className="hidden md:inline text-white/20">|</span>
            <p>Developed by <a href="https://yawarabbass.vercel.app" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:text-white transition-colors font-medium">Yawar Abbas</a></p>
          </div>
        </div>
      </div>

      {/* Giant Background Typography */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none overflow-hidden h-[40%] flex items-end justify-center z-0">
        <h1 className="text-[18vw] md:text-[15vw] font-display font-bold leading-[0.75] tracking-tighter text-white opacity-[0.03]">
          FLAFE
        </h1>
      </div>
    </footer>
  );
}
