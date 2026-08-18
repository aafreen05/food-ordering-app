// pages/FoodDetails.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getFoodById, getAllFoods } from "../services/foodService";
import { useCart } from "../hooks/useCart";
import FoodCard from "../components/FoodCard";
import Loader from "../components/Loader";
import Button from "../components/Button";
import "./FoodDetails.css";

const FoodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [food, setFood] = useState(null);
  const [relatedFoods, setRelatedFoods] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const foodData = await getFoodById(id);
        setFood(foodData);
        setQuantity(1); // reset quantity when navigating between different food items

        // Find a few other items in the same category for "Related foods"
        const allFoods = await getAllFoods();
        const related = allFoods
          .filter((f) => f.category === foodData.category && f._id !== foodData._id)
          .slice(0, 4);
        setRelatedFoods(related);
      } catch (err) {
        setFood(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]); // re-run whenever the :id in the URL changes (e.g. clicking a related food)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(food);
    }
    navigate("/cart");
  };

  if (loading) return <Loader />;

  if (!food) {
    return (
      <div className="food-details-page">
        <p>Food item not found.</p>
        <Button onClick={() => navigate("/menu")}>Back to Menu</Button>
      </div>
    );
  }

  return (
    <div className="food-details-page">
      <div className="food-details-layout">
        <img src={food.image} alt={food.name} className="food-details-image" />

        <div className="food-details-info">
          <span className="food-details-category">{food.category}</span>
          <h1 className="food-details-name">{food.name}</h1>
          <span className="food-details-rating">⭐ {food.rating}</span>
          <p className="food-details-description">{food.description}</p>
          <p className="food-details-price">₹{food.price}</p>

          <div className="food-details-actions">
            <div className="quantity-selector">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="qty-btn">−</button>
              <span className="qty-value">{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)} className="qty-btn">+</button>
            </div>

            <Button onClick={handleAddToCart}>Add to Cart</Button>
          </div>
        </div>
      </div>

      {relatedFoods.length > 0 && (
        <div className="related-foods-section">
          <h2 className="section-title">Related Foods</h2>
          <div className="popular-grid">
            {relatedFoods.map((f) => (
              <FoodCard key={f._id} food={f} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDetails;