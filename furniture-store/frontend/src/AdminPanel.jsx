import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from './supabaseClient';

const ADMIN_EMAILS = ['youradmin@email.com']; // Replace with your admin email(s)

function AdminPanel() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', image: '' });

  const isAdmin = user && ADMIN_EMAILS.includes(user.email);
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    if (!isAdmin) return;
    fetch(`${apiUrl}/api/products`)
      .then(res => res.json())
      .then(setProducts);
    fetch(`${apiUrl}/api/orders/all`)
      .then(res => res.json())
      .then(setOrders);
  }, [isAdmin]);

  const handleAddProduct = async e => {
    e.preventDefault();
    await fetch(`${apiUrl}/api/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct),
    });
    setNewProduct({ name: '', price: '', description: '', image: '' });
    fetch(`${apiUrl}/api/products`).then(res => res.json()).then(setProducts);
  };

  const handleDeleteProduct = async id => {
    await fetch(`${apiUrl}/api/products/${id}`, { method: 'DELETE' });
    setProducts(products.filter(p => p.id !== id && p._id !== id));
  };

  if (!isAdmin) return <div>Admin access only.</div>;

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', background: '#fff', padding: 20, borderRadius: 8 }}>
      <h2>Admin Panel</h2>
      <h3>Products</h3>
      <form onSubmit={handleAddProduct} style={{ marginBottom: 24 }}>
        <input placeholder="Name" value={newProduct.name} onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} required />
        <input placeholder="Price" type="number" value={newProduct.price} onChange={e => setNewProduct({ ...newProduct, price: e.target.value })} required />
        <input placeholder="Description" value={newProduct.description} onChange={e => setNewProduct({ ...newProduct, description: e.target.value })} />
        <input placeholder="Image URL" value={newProduct.image} onChange={e => setNewProduct({ ...newProduct, image: e.target.value })} />
        <button type="submit">Add Product</button>
      </form>
      <ul>
        {products.map(product => (
          <li key={product.id || product._id} style={{ marginBottom: 8 }}>
            {product.name} - ${product.price}
            <button onClick={() => handleDeleteProduct(product.id || product._id)} style={{ marginLeft: 8 }}>Delete</button>
          </li>
        ))}
      </ul>
      <h3>Orders</h3>
      <ul>
        {orders.map(order => (
          <li key={order.id} style={{ marginBottom: 16 }}>
            <div>Order #{order.id} - Total: ${order.total}</div>
            <div>User: {order.user_id}</div>
            <div>Date: {new Date(order.created_at).toLocaleString()}</div>
            <ul>
              {order.cart.map(item => (
                <li key={item.id}>{item.name} x {item.quantity}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;
