// components/OrderCard.jsx
import "./OrderCard.css";

// Maps each status to a color style, so it's visually easy to scan order state at a glance
const statusStyles = {
  Pending: "status-pending",
  Confirmed: "status-confirmed",
  Preparing: "status-preparing",
  "Out for Delivery": "status-out-for-delivery",
  Delivered: "status-delivered",
  Cancelled: "status-cancelled",
};

const OrderCard = ({ order }) => {
  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="order-card">
      <div className="order-card-header">
        <div>
          <p className="order-card-id">Order #{order._id.slice(-8).toUpperCase()}</p>
          <p className="order-card-date">{formattedDate}</p>
        </div>
        <span className={`order-status-badge ${statusStyles[order.status] || ""}`}>
          {order.status}
        </span>
      </div>

      <div className="order-card-items">
        {order.items.map((item, index) => (
          <div className="order-card-item" key={index}>
            <span>{item.name} × {item.quantity}</span>
            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="order-card-footer">
        <span className="order-card-payment">{order.paymentMethod}</span>
        <span className="order-card-total">Total: ₹{order.totalAmount.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderCard;