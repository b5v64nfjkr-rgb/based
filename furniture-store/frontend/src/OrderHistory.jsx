import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function OrderHistory() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!user) return;
    fetch(`${apiUrl}/api/orders/${user.id}`)
      .then(res => res.json())
      .then(data => setOrders(data));
  }, [user]);

  if (!user) return <div>Please log in to view your orders.</div>;

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', background: '#fff', padding: 20, borderRadius: 8 }}>
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order.id} style={{ marginBottom: 16 }}>
              <div>Order #{order.id} - Total: ${order.total}</div>
              <div>Date: {new Date(order.created_at).toLocaleString()}</div>
              <ul>
                {order.cart.map(item => (
                  <li key={item.id}>{item.name} x {item.quantity}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default OrderHistory;
