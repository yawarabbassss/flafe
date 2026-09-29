import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FLAFE_CONFIG } from '../data/config';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        gsap.fromTo(card,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            }
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-24 bg-brand-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-text mb-6">
            The Flafe Experience
          </h2>
          <p className="text-xl text-brand-muted font-display italic">
            "Flafe isn't just about filling a plate. It's about bringing premium flavors, funky energy, and happiness to every single bite."
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {FLAFE_CONFIG.brandPrinciples.map((principle, index) => (
            <div 
              key={index} 
              ref={el => cardsRef.current[index] = el}
              className="text-center group transition-transform duration-300 hover:-translate-y-2 cursor-default"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary font-bold text-xl transition-all duration-300 group-hover:bg-brand-primary group-hover:text-white group-hover:shadow-lg">
                {index + 1}
              </div>
              <h3 className="text-2xl font-bold text-brand-text mb-4 transition-colors group-hover:text-brand-primary">{principle.title}</h3>
              <p className="text-brand-muted leading-relaxed">{principle.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
