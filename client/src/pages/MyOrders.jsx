// pages/MyOrders.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMyOrders } from "../services/orderService";
import OrderCard from "../components/OrderCard";
import Loader from "../components/Loader";
import Button from "../components/Button";
import "./MyOrders.css";

const MyOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getMyOrders();
        setOrders(data);
      } catch (err) {
        setError("Failed to load your orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="my-orders-page">
      <h1 className="my-orders-title">My Orders</h1>

      {loading && <Loader />}

      {!loading && error && <p className="my-orders-message">{error}</p>}

      {!loading && !error && orders.length === 0 && (
        <div className="my-orders-empty">
          <p className="my-orders-message">You haven't placed any orders yet.</p>
          <Button onClick={() => navigate("/menu")}>Browse Menu</Button>
        </div>
      )}

      {!loading && !error && orders.length > 0 && (
        <div className="my-orders-list">
          {orders.map((order) => (
            <OrderCard key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;