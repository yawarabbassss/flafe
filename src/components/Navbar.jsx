import { useState, useEffect, useRef } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import gsap from 'gsap';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartItems, openCart } = useCart();
  const navRef = useRef(null);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    // Scroll listener
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Entry animation
    const ctx = gsap.context(() => {
      gsap.fromTo(".nav-item", 
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );
    }, navRef);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      ctx.revert();
    };
  }, []);

  const navLinks = [
    { name: 'Menu', href: '#menu' },
    { name: 'Experience', href: '#experience' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center px-4 pt-4 transition-all duration-500 pointer-events-none">
      <nav ref={navRef} className={`w-full max-w-7xl mx-auto transition-all duration-500 pointer-events-auto ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-xl py-3 px-6 lg:px-8 rounded-full shadow-lg border border-white/50' 
          : 'bg-transparent py-4 px-2 lg:px-4'
      }`}>
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#" className="nav-item flex items-center gap-2 group z-50">
            <span className="font-display font-bold text-3xl tracking-tight text-brand-text transition-colors duration-300">
              <span className="text-brand-primary">F</span>lafe
            </span>
          </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="nav-item text-sm font-semibold tracking-wide text-brand-text transition-colors duration-300 hover:text-brand-primary">
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-6">
          <a href="#reservation" className="nav-item text-sm font-bold tracking-wide text-brand-text transition-colors duration-300 hover:text-brand-primary">
            Book a Table
          </a>
          <button 
            onClick={openCart}
            className="nav-item flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm transition-transform hover:scale-105 active:scale-95 bg-brand-primary text-white shadow-lg shadow-brand-primary/20"
          >
            <ShoppingBag size={18} />
            Order Now {totalItems > 0 && <span className="bg-brand-text text-white text-xs w-5 h-5 flex items-center justify-center rounded-full ml-1">{totalItems}</span>}
          </button>
        </div>

        {/* Mobile Toggle & Cart */}
        <div className="flex items-center gap-4 md:hidden z-50">
          <button onClick={openCart} className="nav-item relative p-2 rounded-full text-brand-text">
            <ShoppingBag size={24} />
            {totalItems > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-brand-primary text-white text-[10px] flex items-center justify-center rounded-full font-bold">
                {totalItems}
              </span>
            )}
          </button>
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="nav-item p-2 text-brand-text"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 bg-brand-background z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      } md:hidden`}>
        {navLinks.map((link) => (
          <a 
            key={link.name} 
            href={link.href} 
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-3xl font-display text-brand-text hover:text-brand-primary transition-colors"
          >
            {link.name}
          </a>
        ))}
        <a 
          href="#reservation" 
          onClick={() => setIsMobileMenuOpen(false)}
          className="text-xl font-medium text-brand-text mt-4"
        >
          Book a Table
        </a>
      </div>
    </nav>
    </div>
  );
}
