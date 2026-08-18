// components/FoodCard.jsx
import { Link } from "react-router-dom";
import Button from "./Button";
import { useCart } from "../hooks/useCart";
import "./FoodCard.css";

const FoodCard = ({ food }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault(); // prevent the parent <Link> from triggering navigation
    addToCart(food);
  };

  return (
    <div className="food-card">
      <Link to={`/food/${food._id}`} className="food-card-image-link">
        <img src={food.image} alt={food.name} className="food-card-image" />
      </Link>

      <div className="food-card-body">
        <div className="food-card-top">
          <h3 className="food-card-name">{food.name}</h3>
          <span className="food-card-rating">⭐ {food.rating}</span>
        </div>

        <p className="food-card-description">{food.description}</p>

        <div className="food-card-footer">
          <span className="food-card-price">₹{food.price}</span>
          <Button variant="primary" onClick={handleAddToCart}>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;