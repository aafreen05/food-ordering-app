// components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useCart } from "../hooks/useCart";
import ThemeToggle from "./ThemeToggle";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        Cravio<span className="navbar-logo-dot">.</span>
      </Link>

      <div className="navbar-links">
        <Link to="/" className="navbar-link">Home</Link>
        <Link to="/menu" className="navbar-link">Menu</Link>
        {user && <Link to="/my-orders" className="navbar-link">My Orders</Link>}
        {user?.role === "admin" && <Link to="/admin" className="navbar-link">Admin</Link>}
      </div>

      <div className="navbar-actions">
        <ThemeToggle />

        <Link to="/cart" className="navbar-cart" aria-label="Cart">
          🛒
          {cartCount > 0 && <span className="navbar-cart-badge">{cartCount}</span>}
        </Link>

        {user ? (
          <div className="navbar-user">
            <Link to="/profile" className="navbar-username">My Account</Link>
            <button className="navbar-logout" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <Link to="/login" className="navbar-login-btn">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;