// pages/Menu.jsx
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllFoods } from "../services/foodService";
import FoodCard from "../components/FoodCard";
import Loader from "../components/Loader";
import "./Menu.css";

const Menu = () => {
  const [searchParams] = useSearchParams();

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "All");

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        setLoading(true);
        const data = await getAllFoods();
        setFoods(data);
      } catch (err) {
        setError("Failed to load food items. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchFoods();
  }, []);

  const categories = ["All", ...new Set(foods.map((food) => food.category))];

  const filteredFoods = foods.filter((food) => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // ... rest of the component (return JSX) stays exactly the same as before

  return (
    <div className="menu-page">
      <div className="menu-header">
        <h1 className="menu-title">Our Menu</h1>

        <input
          type="text"
          className="menu-search"
          placeholder="Search for food..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="menu-categories">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-pill ${selectedCategory === cat ? "category-pill-active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading && <Loader />}

      {!loading && error && <p className="menu-message">{error}</p>}

      {!loading && !error && filteredFoods.length === 0 && (
        <p className="menu-message">No food items found.</p>
      )}

      {!loading && !error && filteredFoods.length > 0 && (
        <div className="menu-grid">
          {filteredFoods.map((food) => (
            <FoodCard key={food._id} food={food} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;