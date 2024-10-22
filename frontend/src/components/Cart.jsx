import React, { useContext } from 'react';
import { CartContext } from '../App'; 

const Cart = () => {
  const { cartItems, removeFromCart } = useContext(CartContext); 

  return (
    <div className="container mt-5">
      <h2 className="text-center">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className="text-center">Your cart is empty.</p>
      ) : (
        <div className="row">
          {cartItems.map((item, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-4 mb-3">
              <div className="card">
                <img
                  src={item.image}
                  alt={item.name}
                  className="card-img-top"
                  style={{ height: '200px' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">Price: {item.ticketprice}</p>
                  <p><strong>Release Date :</strong> {item.releasedate}</p>
              <p><strong>Ticket Price :</strong> {item.ticketprice}</p>
              <p><strong>Director :   </strong> {item.director}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeFromCart(item.id)} 
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
