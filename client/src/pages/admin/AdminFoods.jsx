// pages/admin/AdminFoods.jsx
import { useState, useEffect } from "react";
import { getAllFoods, createFood, updateFood, deleteFood } from "../../services/foodService";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import Loader from "../../components/Loader";
import "./AdminFoods.css";

const emptyForm = {
  name: "",
  description: "",
  price: "",
  category: "",
  image: "",
  rating: 4.5,
  available: true,
};

const AdminFoods = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState(null); // null = "Add" mode, object = "Edit" mode
  const [formData, setFormData] = useState(emptyForm);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchFoods = async () => {
    try {
      setLoading(true);
      const data = await getAllFoods();
      setFoods(data);
    } catch (err) {
      setError("Failed to load foods.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const openAddModal = () => {
    setEditingFood(null);
    setFormData(emptyForm);
    setFormError("");
    setIsModalOpen(true);
  };

  const openEditModal = (food) => {
    setEditingFood(food);
    setFormData({
      name: food.name,
      description: food.description,
      price: food.price,
      category: food.category,
      image: food.image,
      rating: food.rating,
      available: food.available,
    });
    setFormError("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!formData.name || !formData.description || !formData.price || !formData.category || !formData.image) {
      setFormError("Please fill in all required fields.");
      return;
    }

    // Ensure price/rating are sent as numbers, not strings (HTML inputs always give strings)
    const payload = {
      ...formData,
      price: Number(formData.price),
      rating: Number(formData.rating),
    };

    try {
      setSaving(true);
      if (editingFood) {
        await updateFood(editingFood._id, payload);
      } else {
        await createFood(payload);
      }
      await fetchFoods(); // refresh the list to show the change
      closeModal();
    } catch (err) {
      const message = err.response?.data?.message || "Failed to save food item.";
      setFormError(message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (food) => {
    const confirmed = window.confirm(`Delete "${food.name}"? This cannot be undone.`);
    if (!confirmed) return;

    try {
      await deleteFood(food._id);
      setFoods((prev) => prev.filter((f) => f._id !== food._id));
    } catch (err) {
      alert("Failed to delete food item.");
    }
  };

  return (
    <div className="admin-foods">
      <div className="admin-page-header">
        <h1 className="admin-page-title">Manage Foods</h1>
        <Button onClick={openAddModal}>+ Add Food</Button>
      </div>

      {loading && <Loader />}
      {!loading && error && <p>{error}</p>}

      {!loading && !error && (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Available</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {foods.map((food) => (
                <tr key={food._id}>
                  <td><img src={food.image} alt={food.name} className="admin-table-image" /></td>
                  <td>{food.name}</td>
                  <td>{food.category}</td>
                  <td>₹{food.price}</td>
                  <td>⭐ {food.rating}</td>
                  <td>
                    <span className={`availability-badge ${food.available ? "available" : "unavailable"}`}>
                      {food.available ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="admin-table-actions">
                    <button className="table-action-btn" onClick={() => openEditModal(food)}>Edit</button>
                    <button className="table-action-btn table-action-danger" onClick={() => handleDelete(food)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal} title={editingFood ? "Edit Food" : "Add Food"}>
        <form onSubmit={handleSubmit} className="admin-food-form">
          {formError && <div className="checkout-error">{formError}</div>}

          <div className="form-group">
            <label className="form-label">Name</label>
            <input className="form-input" name="name" value={formData.name} onChange={handleFormChange} />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea className="form-input" name="description" value={formData.description} onChange={handleFormChange} rows={3} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Price (₹)</label>
              <input type="number" className="form-input" name="price" value={formData.price} onChange={handleFormChange} min="0" />
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <input className="form-input" name="category" value={formData.category} onChange={handleFormChange} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Image URL</label>
            <input className="form-input" name="image" value={formData.image} onChange={handleFormChange} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Rating</label>
              <input type="number" step="0.1" min="0" max="5" className="form-input" name="rating" value={formData.rating} onChange={handleFormChange} />
            </div>
            <div className="form-group form-group-checkbox">
              <label className="form-label">
                <input type="checkbox" name="available" checked={formData.available} onChange={handleFormChange} />
                {" "}Available
              </label>
            </div>
          </div>

          <Button type="submit" fullWidth disabled={saving}>
            {saving ? "Saving..." : editingFood ? "Update Food" : "Add Food"}
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default AdminFoods;