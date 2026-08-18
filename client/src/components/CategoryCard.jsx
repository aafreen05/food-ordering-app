// components/CategoryCard.jsx
import "./CategoryCard.css";

// Maps category names to an emoji icon, matching the illustrated-icon style in the reference design
const categoryIcons = {
  Pizza: "🍕",
  Burger: "🍔",
  Indian: "🍛",
  Chinese: "🥡",
  Desserts: "🍰",
  Beverages: "🥤",
  Snacks: "🍟",
};

const CategoryCard = ({ category, active, onClick }) => {
  return (
    <button className={`category-card ${active ? "category-card-active" : ""}`} onClick={onClick}>
      <div className="category-card-icon">{categoryIcons[category] || "🍽️"}</div>
      <span className="category-card-label">{category}</span>
    </button>
  );
};

export default CategoryCard;