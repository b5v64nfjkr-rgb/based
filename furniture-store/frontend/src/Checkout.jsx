import React from 'react';
import { useCart } from './CartContext';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Checkout() {
  const { cart } = useCart();

  const handleCheckout = async () => {
    const res = await fetch(`${apiUrl}/api/create-checkout-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cart }),
    });
    const data = await res.json();
    if (data.url) {
      window.location = data.url;
    }
  };

  return (
    <button onClick={handleCheckout} disabled={cart.length === 0} style={{ width: '100%', marginTop: 16 }}>
      Pay with Card
    </button>
  );
}

export default Checkout;
