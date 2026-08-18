// pages/admin/AdminOrders.jsx
import { useState, useEffect } from "react";
import { getAllOrdersAdmin, updateOrderStatusAdmin } from "../../services/adminService";
import Loader from "../../components/Loader";
import "./AdminOrders.css";

const statusOptions = ["Pending", "Confirmed", "Preparing", "Out for Delivery", "Delivered", "Cancelled"];

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null); // tracks which order's dropdown is mid-save, to show feedback

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getAllOrdersAdmin();
      setOrders(data);
    } catch (err) {
      setError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setUpdatingId(orderId);
      await updateOrderStatusAdmin(orderId, newStatus);
      // Update just this one order in local state, avoiding a full refetch
      setOrders((prev) =>
        prev.map((order) => (order._id === orderId ? { ...order, status: newStatus } : order))
      );
    } catch (err) {
      alert("Failed to update order status.");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="admin-orders">
      <h1 className="admin-page-title">Manage Orders</h1>

      {loading && <Loader />}
      {!loading && error && <p>{error}</p>}

      {!loading && !error && (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>#{order._id.slice(-8).toUpperCase()}</td>
                  <td>
                    {order.user?.name || "Unknown"}
                    <br />
                    <span className="admin-table-subtext">{order.user?.email}</span>
                  </td>
                  <td>{order.items.length} item{order.items.length > 1 ? "s" : ""}</td>
                  <td>₹{order.totalAmount.toFixed(2)}</td>
                  <td>{order.paymentMethod}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString("en-IN")}</td>
                  <td>
                    <select
                      className="status-select"
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      disabled={updatingId === order._id}
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;