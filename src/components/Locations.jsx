import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Clock, Play } from 'lucide-react';
import { FLAFE_CONFIG } from '../data/config';

gsap.registerPlugin(ScrollTrigger);

export default function Locations() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  const reels = [
    {
      id: 1,
      url: "https://www.instagram.com/reel/DdBJsSSMkmt/?utm_source=ig_web_button_share_sheet&stkn=MzRlODBiNWFlZA==",
      thumbnail: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 2,
      url: "https://www.instagram.com/reel/DdJhdzNiRCt/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==",
      thumbnail: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 3,
      url: "https://www.instagram.com/reel/DbdYNX1CJiO/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==",
      thumbnail: "https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 4,
      url: "https://www.instagram.com/reel/DX9UmDwCOUI/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==",
      thumbnail: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=800&auto=format&fit=crop"
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal Cards
      gsap.fromTo(cardsRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      );

      // Social section reveal
      gsap.fromTo(".social-reveal",
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, ease: 'power2.out',
          scrollTrigger: {
            trigger: ".social-container",
            start: "top 80%",
          }
        }
      );

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-brand-background">
      
      {/* Top Part: Locations */}
      <div className="relative py-24 bg-black/90">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1514933651103-005eab06c04d?q=80&w=2000&auto=format&fit=crop" 
            alt="Restaurant Vibe" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        </div>
        
        <div className="container mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-brand-secondary mb-4 drop-shadow-lg">
              Where To Find Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {FLAFE_CONFIG.branches.map((branch, index) => (
              <div 
                key={index} 
                ref={el => cardsRef.current[index] = el}
                className="bg-[#FFFDF9] rounded-2xl p-8 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-bold text-brand-text mb-6">{branch.name}</h3>
                  
                  <div className="space-y-4 mb-8 text-sm">
                    <div className="flex items-start gap-3">
                      <MapPin size={18} className="text-brand-secondary mt-0.5 flex-shrink-0" />
                      <p className="text-brand-text font-medium">{branch.address}</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone size={18} className="text-brand-secondary mt-0.5 flex-shrink-0" />
                      <div>
                        {branch.phones.map((phone, i) => (
                          <p key={i} className="text-brand-text font-medium underline decoration-gray-300 underline-offset-4">{phone}</p>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock size={18} className="text-brand-secondary mt-0.5 flex-shrink-0" />
                      <p className="text-brand-text font-medium">{branch.hours}</p>
                    </div>
                  </div>
                </div>

                <a 
                  href={branch.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 text-center border-2 border-brand-text text-brand-text rounded-xl font-bold hover:bg-brand-text hover:text-white transition-colors"
                >
                  View on map
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Part: Socials / Reels */}
      <div className="social-container py-24 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 lg:px-12">
          
          <div className="flex flex-col xl:flex-row items-center justify-center gap-12 lg:gap-8 max-w-7xl mx-auto">
            
            {/* Left Reels */}
            <div className="flex gap-4 w-full xl:w-2/5 justify-center xl:justify-end">
              {reels.slice(0, 2).map((reel) => (
                <a key={reel.id} href={reel.url} target="_blank" rel="noopener noreferrer" className="social-reveal group relative w-[45%] md:w-[220px] aspect-[9/16] rounded-2xl overflow-hidden shadow-lg transform transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl">
                  <img src={reel.thumbnail} alt="Instagram Reel" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-brand-text shadow-lg group-hover:scale-110 transition-transform">
                      <Play size={20} className="ml-1" fill="currentColor" />
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Center Text */}
            <div className="social-reveal w-full xl:w-1/5 text-center flex flex-col items-center justify-center py-8">
              {/* Custom SVG Instagram Logo Gradient */}
              <div className="mb-4">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="ig-grad" x1="2" y1="2" x2="22" y2="22">
                      <stop offset="0%" stopColor="#feda75"/>
                      <stop offset="25%" stopColor="#fa7e1e"/>
                      <stop offset="50%" stopColor="#d62976"/>
                      <stop offset="75%" stopColor="#962fbf"/>
                      <stop offset="100%" stopColor="#4f5bd5"/>
                    </linearGradient>
                  </defs>
                  <rect x="2" y="2" width="20" height="20" rx="5" stroke="url(#ig-grad)" strokeWidth="2"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="url(#ig-grad)" strokeWidth="2"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="url(#ig-grad)" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="text-3xl md:text-4xl font-display font-bold text-brand-text leading-tight mb-2">
                Follow the<br/>fun <a href={`https://instagram.com/${FLAFE_CONFIG.instagram.replace('@','')}`} target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">{FLAFE_CONFIG.instagram}</a>
              </h3>
            </div>

            {/* Right Reels */}
            <div className="flex gap-4 w-full xl:w-2/5 justify-center xl:justify-start">
              {reels.slice(2, 4).map((reel) => (
                <a key={reel.id} href={reel.url} target="_blank" rel="noopener noreferrer" className="social-reveal group relative w-[45%] md:w-[220px] aspect-[9/16] rounded-2xl overflow-hidden shadow-lg transform transition-transform duration-500 hover:-translate-y-2 hover:shadow-2xl">
                  <img src={reel.thumbnail} alt="Instagram Reel" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-brand-text shadow-lg group-hover:scale-110 transition-transform">
                      <Play size={20} className="ml-1" fill="currentColor" />
                    </div>
                  </div>
                </a>
              ))}
            </div>

          </div>

        </div>
      </div>

    </section>
  );
}
