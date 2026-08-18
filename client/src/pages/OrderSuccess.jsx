// pages/OrderSuccess.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderById } from "../services/orderService";
import Button from "../components/Button";
import Loader from "../components/Loader";
import "./OrderSuccess.css";

const OrderSuccess = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderById(id);
        setOrder(data);
      } catch (err) {
        // if it fails, order stays null and we show a fallback below
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  if (loading) return <Loader />;

  if (!order) {
    return (
      <div className="order-success-page">
        <p>We couldn't find that order.</p>
        <Button onClick={() => navigate("/")}>Go Home</Button>
      </div>
    );
  }

  return (
    <div className="order-success-page">
      <div className="order-success-icon">✅</div>
      <h1 className="order-success-title">Order Placed Successfully!</h1>
      <p className="order-success-subtitle">Thank you — your food is being prepared.</p>

      <div className="order-success-card">
        <div className="order-success-row">
          <span>Order ID</span>
          <span>#{order._id.slice(-8).toUpperCase()}</span>
        </div>
        <div className="order-success-row">
          <span>Total Amount</span>
          <span>₹{order.totalAmount.toFixed(2)}</span>
        </div>
        <div className="order-success-row">
          <span>Delivery Address</span>
          <span>{order.deliveryAddress}</span>
        </div>
        <div className="order-success-row">
          <span>Status</span>
          <span className="order-status-badge">{order.status}</span>
        </div>
      </div>

      <div className="order-success-actions">
        <Button onClick={() => navigate("/my-orders")}>View My Orders</Button>
        <Button variant="secondary" onClick={() => navigate("/menu")}>Continue Shopping</Button>
      </div>
    </div>
  );
};

export default OrderSuccess;