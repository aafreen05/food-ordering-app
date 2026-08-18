// pages/Home.jsx
import { useState, useEffect } from "react";
import { getAllFoods } from "../services/foodService";
import FoodCard from "../components/FoodCard";
import CategoryCard from "../components/CategoryCard";
import Loader from "../components/Loader";
import Button from "../components/Button";
import "./Home.css";

const categoryList = ["Pizza", "Burger", "Indian", "Chinese", "Desserts", "Beverages", "Snacks"];

const Home = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

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

  const allCategories = ["All", ...new Set(foods.map((food) => food.category))];

  const filteredFoods = foods.filter((food) => {
    const matchesSearch = food.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Scroll down to the menu section so the user sees filtered results immediately
    document.getElementById("menu-section")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    document.getElementById("menu-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="home-page">
      {/* ---- Hero Section ---- */}
      <section className="hero">
        <h1 className="hero-title">
          Find Your Favorite <span className="hero-title-accent">Food.</span>
        </h1>
        <p className="hero-subtitle">Delicious food, delivered fast 💗</p>

        <form className="hero-search-bar" onSubmit={handleSearchSubmit}>
          <span className="hero-search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search for food or restaurant..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="hero-search-input"
          />
          <button type="submit" className="hero-search-btn">Search</button>
        </form>

        <div className="hero-banner">
          <div className="hero-banner-text">
            <h2>Special Deal For You</h2>
            <p>Up to 50% OFF on your first order</p>
            <Button onClick={() => document.getElementById("menu-section")?.scrollIntoView({ behavior: "smooth" })}>
              Order Now
            </Button>
          </div>
        </div>
      </section>

      {/* ---- Categories ---- */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Categories</h2>
        </div>

        <div className="categories-row">
          {categoryList.map((cat) => (
            <CategoryCard
              key={cat}
              category={cat}
              active={selectedCategory === cat}
              onClick={() => handleCategoryClick(cat)}
            />
          ))}
        </div>
      </section>

      {/* ---- Full Menu (search + filter + grid, all on this page) ---- */}
      <section className="section" id="menu-section">
        <div className="section-header">
          <h2 className="section-title">Our Menu</h2>
        </div>

        <div className="menu-categories">
          {allCategories.map((cat) => (
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
      </section>
    </div>
  );
};

export default Home;