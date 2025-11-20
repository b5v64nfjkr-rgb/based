import React from 'react';
import ProductList from './ProductList';
import './App.css';
import { CartProvider } from './CartContext';
import Cart from './Cart';
import { AuthProvider } from './AuthContext';
import Signup from './Signup';
import Login from './Login';
import Logout from './Logout';
import AdminPanel from './AdminPanel';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <div className="app-container">
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, padding: 16 }}>
            <Signup />
            <Login />
            <Logout />
          </div>
          <AdminPanel />
          <ProductList />
          <Cart />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
