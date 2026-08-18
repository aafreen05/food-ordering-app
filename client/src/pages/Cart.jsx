// pages/Cart.jsx
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/Button";
import "./Cart.css";

const DELIVERY_FEE = 40;

const Cart = () => {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart, subtotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const grandTotal = cartItems.length > 0 ? subtotal + DELIVERY_FEE : 0;

  const handleCheckout = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    navigate("/checkout");
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <h1 className="cart-title">Your Cart</h1>
        <p className="cart-empty-message">Your cart is empty.</p>
        <Button onClick={() => navigate("/menu")}>Browse Menu</Button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="cart-title">
        Your Cart <span className="cart-item-count">{cartItems.length} Items</span>
      </h1>

      <div className="cart-list">
        {cartItems.map((item) => (
          <div className="cart-item" key={item._id}>
            <img src={item.image} alt={item.name} className="cart-item-image" />

            <div className="cart-item-info">
              <h3 className="cart-item-name">{item.name}</h3>
              <p className="cart-item-price">₹{item.price}</p>
            </div>

            <div className="cart-item-qty">
              <button onClick={() => decreaseQuantity(item._id)} className="qty-btn">−</button>
              <span className="qty-value">{item.quantity}</span>
              <button onClick={() => increaseQuantity(item._id)} className="qty-btn">+</button>
            </div>

            <button className="cart-item-remove" onClick={() => removeFromCart(item._id)} aria-label="Remove item">
              🗑️
            </button>
          </div>
        ))}
      </div>

      <div className="cart-summary">
        <div className="cart-summary-row">
          <span>Sub-Total</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="cart-summary-row">
          <span>Delivery Charge</span>
          <span>₹{DELIVERY_FEE.toFixed(2)}</span>
        </div>
        <div className="cart-summary-divider"></div>
        <div className="cart-summary-row cart-summary-total">
          <span>Total</span>
          <span>₹{grandTotal.toFixed(2)}</span>
        </div>

        <Button fullWidth onClick={handleCheckout}>
          Proceed to Checkout →
        </Button>
      </div>
    </div>
  );
};

export default Cart;