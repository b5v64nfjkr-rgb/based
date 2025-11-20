import React, { useEffect, useState } from 'react';
import './ProductList.css';
import { useCart } from './CartContext';

const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function ProductList() {
  const [products, setProducts] = useState([]);
  const { dispatch } = useCart();

  useEffect(() => {
    fetch(`${apiUrl}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div className="product-list">
      <h1>Furniture Catalog</h1>
      <div className="products">
        {products.map(product => (
          <div className="product-card" key={product._id}>
            <img src={product.image || '/placeholder.jpg'} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p className="price">${product.price}</p>
            <button onClick={() => dispatch({ type: 'ADD_TO_CART', product: {
              id: product.id || product._id,
              name: product.name,
              price: product.price
            }})}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
