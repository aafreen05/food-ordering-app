// layouts/AdminLayout.jsx
import { NavLink, Outlet } from "react-router-dom";
import "./AdminLayout.css";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <h2 className="admin-sidebar-title">Admin Panel</h2>
        <nav className="admin-sidebar-nav">
          <NavLink to="/admin" end className="admin-sidebar-link">
            📊 Dashboard
          </NavLink>
          <NavLink to="/admin/foods" className="admin-sidebar-link">
            🍔 Manage Foods
          </NavLink>
          <NavLink to="/admin/users" className="admin-sidebar-link">
            👥 Manage Users
          </NavLink>
          <NavLink to="/admin/orders" className="admin-sidebar-link">
            📦 Manage Orders
          </NavLink>
        </nav>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;