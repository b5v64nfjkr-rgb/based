import React from 'react';
import { useCart } from './CartContext';
import './Cart.css';
import Checkout from './Checkout';

function Cart() {
  const { cart, dispatch } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map(item => (
            <li key={item.id}>
              <span>{item.name}</span>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={e =>
                  dispatch({
                    type: 'UPDATE_QUANTITY',
                    id: item.id,
                    quantity: parseInt(e.target.value, 10),
                  })
                }
              />
              <span>${item.price * item.quantity}</span>
              <button onClick={() => dispatch({ type: 'REMOVE_FROM_CART', id: item.id })}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      <div className="cart-total">Total: ${total.toFixed(2)}</div>
      <Checkout />
    </div>
  );
}

export default Cart;
