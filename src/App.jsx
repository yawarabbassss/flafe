import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DealsMarquee from './components/DealsMarquee';
import Menu from './components/Menu';
import FeaturedDish from './components/FeaturedDish';
import Experience from './components/Experience';
import Team from './components/Team';
import Reservation from './components/Reservation';
import Locations from './components/Locations';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';

function App() {
  return (
    <CartProvider>
      <div className="font-sans antialiased text-brand-text min-h-screen bg-brand-background selection:bg-brand-primary selection:text-white relative">
        {/* Animated Background Video */}
        <div className="fixed inset-0 z-[-1] overflow-hidden bg-brand-background">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute min-w-full min-h-full object-cover opacity-[0.04]"
          >
            {/* Cinematic abstract/food particles placeholder video */}
            <source src="https://cdn.pixabay.com/video/2020/05/21/40003-424177726_large.mp4" type="video/mp4" />
          </video>
        </div>

        <Navbar />
        <main>
          <Hero />
          <DealsMarquee />
          <FeaturedDish />
          <Menu />
          <Experience />
          <Team />
          <Reservation />
          <Locations />
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

export default App;
