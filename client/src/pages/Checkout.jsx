// pages/Checkout.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { createOrder } from "../services/orderService";
import Button from "../components/Button";
import "./Checkout.css";

const DELIVERY_FEE = 40;

const Checkout = () => {
  const { cartItems, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const grandTotal = subtotal + DELIVERY_FEE;

  // If the cart is empty, there's nothing to check out — send them back
  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <p className="checkout-empty-message">Your cart is empty. Add some items before checking out.</p>
        <Button onClick={() => navigate("/menu")}>Browse Menu</Button>
      </div>
    );
  }

 const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError("");

    if (!deliveryAddress.trim() || !phone.trim()) {
      setError("Please fill in your delivery address and phone number.");
      return;
    }

    // Phone must be exactly 10 digits, numbers only
    const phoneDigitsOnly = phone.replace(/\D/g, ""); // strips out anything that isn't a digit
    if (phoneDigitsOnly.length !== 10) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    // Build the "items" array in the exact shape our backend Order model expects
    const orderItems = cartItems.map((item) => ({
      food: item._id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
    }));

    const orderData = {
      items: orderItems,
      deliveryAddress,
      phone,
      paymentMethod,
      subtotal,
      deliveryFee: DELIVERY_FEE,
      totalAmount: grandTotal,
    };

    try {
      setLoading(true);
      const createdOrder = await createOrder(orderData);
      clearCart(); // empty the cart now that the order is saved
      navigate(`/order-success/${createdOrder._id}`);
    } catch (err) {
      const message = err.response?.data?.message || "Failed to place order. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handlePlaceOrder}>
          {error && <div className="checkout-error">{error}</div>}

          <div className="form-group">
            <label className="form-label">Delivery Address</label>
            <textarea
              className="form-input checkout-textarea"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              placeholder="House no, street, city, pincode..."
              rows={3}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone Number</label>
           <input
  type="tel"
  className="form-input"
  value={phone}
  onChange={(e) => {
    const digitsOnly = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(digitsOnly);
  }}
  placeholder="10-digit mobile number"
  maxLength={10}
/>
          </div>

          <div className="form-group">
            <label className="form-label">Payment Method</label>
            <div className="payment-options">
              <label className={`payment-option ${paymentMethod === "Cash on Delivery" ? "payment-option-active" : ""}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Cash on Delivery"
                  checked={paymentMethod === "Cash on Delivery"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash on Delivery
              </label>

              <label className={`payment-option ${paymentMethod === "Demo Online Payment" ? "payment-option-active" : ""}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Demo Online Payment"
                  checked={paymentMethod === "Demo Online Payment"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Demo Online Payment
              </label>
            </div>
          </div>

          <Button type="submit" fullWidth disabled={loading}>
            {loading ? "Placing Order..." : "Place Order"}
          </Button>
        </form>

        <div className="checkout-summary">
          <h2 className="checkout-summary-title">Order Summary</h2>

          {cartItems.map((item) => (
            <div className="checkout-summary-item" key={item._id}>
              <span>{item.name} × {item.quantity}</span>
              <span>₹{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}

          <div className="checkout-summary-divider"></div>

          <div className="checkout-summary-row">
            <span>Sub-Total</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="checkout-summary-row">
            <span>Delivery Fee</span>
            <span>₹{DELIVERY_FEE.toFixed(2)}</span>
          </div>
          <div className="checkout-summary-row checkout-summary-total">
            <span>Total</span>
            <span>₹{grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;