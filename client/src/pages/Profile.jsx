// pages/Profile.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Button from "../components/Button";
import api from "../services/api";
import "./Profile.css";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      setSaving(true);
      const response = await api.put(`/users/${user._id}`, { name, email });

      // Update the cached userInfo in localStorage so the Navbar/rest of the app reflects the change immediately
      const updatedUserInfo = { ...user, name: response.data.name, email: response.data.email };
      localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));

      setMessage("Profile updated successfully. Please refresh to see changes everywhere.");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="profile-page">
      <h1 className="profile-title">My Profile</h1>

      <div className="profile-card">
        {message && <div className="profile-message-success">{message}</div>}
        {error && <div className="checkout-error">{error}</div>}

        <form onSubmit={handleSave}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input className="form-input" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input type="email" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="form-group">
            <label className="form-label">Account Role</label>
            <input className="form-input" value={user?.role} disabled />
          </div>

          <Button type="submit" fullWidth disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </form>

        <button className="profile-logout-link" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;