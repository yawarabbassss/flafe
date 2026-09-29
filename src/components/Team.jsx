import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Team() {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const team = [
    {
      name: "Ali Raza",
      role: "Head Chef",
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=800&auto=format&fit=crop",
      description: "Master of flavors, bringing 10+ years of culinary magic to every Flafe dish."
    },
    {
      name: "Usman Tariq",
      role: "Operations Manager",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
      description: "Ensures that the funky energy and premium quality are delivered smoothly across all branches."
    },
    {
      name: "Zainab Khan",
      role: "Experience Director",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
      description: "Curates the perfect dining atmosphere and customer service that defines Flafe."
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-text mb-4">Meet the Team</h2>
          <p className="text-brand-muted max-w-2xl mx-auto">The passionate people behind the premium flavors and funky energy.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {team.map((member, index) => (
            <div 
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="group text-center"
            >
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden shadow-lg group-hover:shadow-2xl transition-all duration-500">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="text-2xl font-bold text-brand-text mb-1">{member.name}</h3>
              <p className="text-brand-primary font-bold text-sm uppercase tracking-widest mb-4">{member.role}</p>
              <p className="text-brand-muted leading-relaxed">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
