export const FLAFE_CONFIG = {
  // Configurable primary WhatsApp number (Zafarwal Branch as default)
  whatsappNumber: "923001117477",
  
  // Restaurant Information
  businessName: "Flafe",
  tagline: "The Taste of Happiness",
  instagram: "@flafeofficial",
  
  // Branches
  branches: [
    {
      name: "Zafarwal",
      address: "Main Shakargarh Road, Near Nasir Hospital, Zafarwal",
      phones: ["0300 111 7477", "0305 111 7473", "0311 110 7477"],
      hours: "Monday - Sunday: 11:00 AM - 11:00 PM",
      googleMaps: "https://maps.google.com"
    },
    {
      name: "Dhamthal",
      address: "Dhamthal",
      phones: ["0301 111 7476", "0342 408 7476", "0301 694 3888"],
      hours: "Monday - Sunday: 11:00 AM - 11:00 PM",
      googleMaps: "https://maps.google.com"
    },
    {
      name: "Shakargarh",
      address: "Shakargarh",
      phones: ["0300 000 0000"], // Update with actual number
      hours: "Monday - Sunday: 11:00 AM - 11:00 PM",
      googleMaps: "https://maps.google.com"
    }
  ],

  // Core brand messages
  brandPrinciples: [
    {
      title: "Fresh Ingredients",
      description: "We source the finest ingredients to ensure every bite is packed with premium flavors."
    },
    {
      title: "Funky Energy",
      description: "A vibrant dining experience that matches the excitement of our food."
    },
    {
      title: "Made To Order",
      description: "Hot, fresh, and prepared exactly how you like it. Every single time."
    }
  ]
};

export const formatWhatsAppOrder = (order, customer) => {
  const items = order.items.map(item => `${item.quantity} × ${item.name} — Rs. ${item.price * item.quantity}`).join('\n');
  const total = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 100; // Configurable
  
  return `*FLAFE ORDER*

*Customer:* ${customer.name}
*Phone:* ${customer.phone}
*Address:* ${customer.address}

*ORDER:*
${items}

Subtotal: Rs. ${total}
Delivery: Rs. ${deliveryFee}
*TOTAL: Rs. ${total + deliveryFee}*

*Notes:* ${customer.notes || 'None'}`;
};

export const formatWhatsAppReservation = (reservation) => {
  return `*Table Reservation — FLAFE*

*Name:* ${reservation.name}
*Phone:* ${reservation.phone}
*Email:* ${reservation.email}
*Date:* ${reservation.date}
*Time:* ${reservation.time}
*Guests:* ${reservation.guests}
*Special Request:* ${reservation.request || 'None'}`;
};
