import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { FLAFE_CONFIG, formatWhatsAppOrder } from '../data/config';
import { Send } from 'lucide-react';

export default function CheckoutForm() {
  const { cartItems } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });
  const [isReady, setIsReady] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePrepare = (e) => {
    e.preventDefault();
    if (formData.name && formData.phone && formData.address) {
      setIsReady(true);
    }
  };

  const handleSendOrder = () => {
    const orderData = { items: cartItems };
    const message = formatWhatsAppOrder(orderData, formData);
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${FLAFE_CONFIG.whatsappNumber}?text=${encodedMessage}`;
    window.open(url, '_blank');
  };

  if (isReady) {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0) + 100; // 100 is delivery fee

    return (
      <div className="bg-brand-background p-6 rounded-2xl border border-brand-primary/20 animate-in fade-in text-left">
        <h3 className="font-bold text-brand-text mb-4 border-b border-gray-200 pb-2">Order Review</h3>
        
        <div className="space-y-2 mb-4 text-sm text-brand-muted">
          <p><strong className="text-brand-text">Deliver to:</strong> {formData.name}</p>
          <p><strong className="text-brand-text">Address:</strong> {formData.address}</p>
          <p><strong className="text-brand-text">Phone:</strong> {formData.phone}</p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-100 mb-6">
          <div className="flex justify-between font-bold text-brand-text mb-1">
            <span>Total to pay:</span>
            <span className="text-brand-primary">Rs. {total}</span>
          </div>
          <p className="text-xs text-brand-muted">Payment method: Cash on Delivery</p>
        </div>

        <button 
          onClick={handleSendOrder}
          className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-3.5 rounded-full font-bold hover:bg-[#20bd5a] transition-all hover:scale-105 active:scale-95 shadow-lg shadow-[#25D366]/20"
        >
          <Send size={18} />
          Send Order on WhatsApp
        </button>
        <button 
          onClick={() => setIsReady(false)}
          className="w-full mt-3 text-sm text-brand-muted hover:text-brand-text transition-colors py-2"
        >
          Back to Edit Details
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handlePrepare} className="space-y-4">
      <div>
        <input 
          type="text" 
          name="name" 
          placeholder="Full Name" 
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all text-sm"
        />
      </div>
      <div>
        <input 
          type="tel" 
          name="phone" 
          placeholder="Phone Number" 
          required
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all text-sm"
        />
      </div>
      <div>
        <textarea 
          name="address" 
          placeholder="Delivery Address" 
          required
          rows="2"
          value={formData.address}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all text-sm resize-none"
        />
      </div>
      <div>
        <textarea 
          name="notes" 
          placeholder="Special Instructions (Optional)" 
          rows="1"
          value={formData.notes}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all text-sm resize-none"
        />
      </div>
      
      <button 
        type="submit"
        className="w-full bg-brand-primary text-white py-3.5 rounded-full font-bold shadow-lg shadow-brand-primary/20 hover:bg-brand-accent transition-colors mt-4"
      >
        Proceed to Order
      </button>
    </form>
  );
}
