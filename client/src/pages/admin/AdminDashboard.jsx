// pages/admin/AdminDashboard.jsx
import { useState, useEffect } from "react";
import { getDashboardStats } from "../../services/adminService";
import Loader from "../../components/Loader";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        // stats stay null, handled below
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <Loader />;
  if (!stats) return <p>Failed to load dashboard statistics.</p>;

  const cards = [
    { label: "Total Users", value: stats.totalUsers, icon: "👥" },
    { label: "Total Foods", value: stats.totalFoods, icon: "🍔" },
    { label: "Total Orders", value: stats.totalOrders, icon: "📦" },
    { label: "Total Revenue", value: `₹${stats.totalRevenue.toFixed(2)}`, icon: "💰" },
    { label: "Pending Orders", value: stats.pendingOrders, icon: "⏳" },
    { label: "Delivered Orders", value: stats.deliveredOrders, icon: "✅" },
  ];

  return (
    <div className="admin-dashboard">
      <h1 className="admin-page-title">Dashboard</h1>

      <div className="stats-grid">
        {cards.map((card) => (
          <div className="stat-card" key={card.label}>
            <div className="stat-card-icon">{card.icon}</div>
            <div>
              <p className="stat-card-value">{card.value}</p>
              <p className="stat-card-label">{card.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;