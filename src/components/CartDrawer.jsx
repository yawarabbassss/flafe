import { useEffect, useRef } from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CheckoutForm from './CheckoutForm';

export default function CartDrawer() {
  const { isCartOpen, closeCart, cartItems, updateQuantity, removeFromCart, subtotal } = useCart();
  const drawerRef = useRef(null);
  const overlayRef = useRef(null);

  // Close on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeCart();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [closeCart]);

  if (!isCartOpen) return null;

  const deliveryFee = 100;
  const total = subtotal + (cartItems.length > 0 ? deliveryFee : 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Overlay */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={closeCart}
      />
      
      {/* Drawer */}
      <div 
        ref={drawerRef}
        className="relative w-full max-w-md h-full bg-brand-surface shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-display font-bold text-brand-text flex items-center gap-2">
            <ShoppingBag className="text-brand-primary" /> Your Order
          </h2>
          <button 
            onClick={closeCart}
            className="p-2 text-brand-muted hover:text-brand-primary transition-colors rounded-full hover:bg-gray-50"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-brand-muted gap-4">
              <ShoppingBag size={48} className="opacity-20" />
              <p>Your cart is empty.</p>
              <button 
                onClick={closeCart}
                className="px-6 py-2 bg-brand-primary/10 text-brand-primary font-semibold rounded-full hover:bg-brand-primary hover:text-white transition-colors"
              >
                Browse Menu
              </button>
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-brand-text text-sm mb-1">{item.name}</h4>
                    <span className="text-brand-primary font-semibold text-sm">Rs. {item.price}</span>
                    <div className="flex items-center gap-3 mt-2">
                      <div className="flex items-center bg-gray-100 rounded-full">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 flex items-center justify-center text-brand-text hover:text-brand-primary transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-4 text-center text-sm font-semibold">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 flex items-center justify-center text-brand-text hover:text-brand-primary transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-xs text-brand-muted hover:text-brand-accent transition-colors underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="border-t border-gray-100 pt-6 mt-4 space-y-3">
                <div className="flex justify-between text-brand-muted text-sm">
                  <span>Subtotal</span>
                  <span>Rs. {subtotal}</span>
                </div>
                <div className="flex justify-between text-brand-muted text-sm">
                  <span>Delivery</span>
                  <span>Rs. {deliveryFee}</span>
                </div>
                <div className="flex justify-between text-brand-text font-bold text-lg pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span className="text-brand-primary">Rs. {total}</span>
                </div>
              </div>

              {/* Checkout Form */}
              <div className="mt-8 border-t border-gray-100 pt-6">
                <h3 className="font-bold text-brand-text mb-4">Delivery Details</h3>
                <CheckoutForm />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
