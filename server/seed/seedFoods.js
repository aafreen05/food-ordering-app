// seed/seedFoods.js
// A standalone script to populate the database with sample food data.
// Run manually with: node seed/seedFoods.js

import mongoose from "mongoose";
import dotenv from "dotenv";
import Food from "../models/Food.js";

dotenv.config();

const foods = [
  // ---- Pizza ----
  { name: "Margherita Pizza", description: "Classic pizza with tomato, mozzarella, and fresh basil.", price: 249, category: "Pizza", image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca", rating: 4.6 },
  { name: "Pepperoni Pizza", description: "Loaded with spicy pepperoni and melted cheese.", price: 299, category: "Pizza", image: "https://images.unsplash.com/photo-1628840042765-356cda07504e", rating: 4.7 },
  { name: "Farmhouse Pizza", description: "Onion, capsicum, tomato, and mushroom on a cheesy base.", price: 279, category: "Pizza", image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47", rating: 4.4 },
  { name: "BBQ Chicken Pizza", description: "Smoky BBQ sauce, grilled chicken, and red onions.", price: 329, category: "Pizza", image: "https://images.unsplash.com/photo-1601924582970-9238bcb495d9", rating: 4.5 },
  { name: "Four Cheese Pizza", description: "A rich blend of mozzarella, cheddar, parmesan, and gouda.", price: 349, category: "Pizza", image: "https://images.unsplash.com/photo-1548365328-9f547fb0953b", rating: 4.8 },

  // ---- Burger ----
  { name: "Classic Cheese Burger", description: "Juicy beef patty with cheddar, lettuce, and tomato.", price: 189, category: "Burger", image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd", rating: 4.5 },
  { name: "Spicy Chicken Burger", description: "Crispy fried chicken with spicy mayo and pickles.", price: 199, category: "Burger", image: "https://images.unsplash.com/photo-1550547660-d9450f859349", rating: 4.6 },
  { name: "Veggie Burger", description: "A wholesome patty made from mixed vegetables and spices.", price: 169, category: "Burger", image: "https://images.unsplash.com/photo-1520072959219-c595dc870360", rating: 4.2 },
  { name: "Double Patty Burger", description: "Two beef patties stacked with double cheese.", price: 249, category: "Burger", image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b", rating: 4.7 },
  { name: "Mushroom Swiss Burger", description: "Sautéed mushrooms with melted Swiss cheese.", price: 219, category: "Burger", image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90", rating: 4.4 },

  // ---- Indian ----
  { name: "Butter Chicken", description: "Tender chicken in a rich, creamy tomato gravy.", price: 289, category: "Indian", image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398", rating: 4.8 },
  { name: "Paneer Tikka Masala", description: "Grilled paneer cubes in a spiced masala sauce.", price: 259, category: "Indian", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7", rating: 4.6 },
  { name: "Chicken Biryani", description: "Fragrant basmati rice layered with spiced chicken.", price: 279, category: "Indian", image: "https://images.unsplash.com/photo-1563379091339-03246963d96c", rating: 4.9 },
  { name: "Dal Makhani", description: "Slow-cooked black lentils in butter and cream.", price: 199, category: "Indian", image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46", rating: 4.5 },
  { name: "Chole Bhature", description: "Spiced chickpea curry served with fluffy fried bread.", price: 179, category: "Indian", image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027", rating: 4.6 },

  // ---- Chinese ----
  { name: "Veg Hakka Noodles", description: "Stir-fried noodles tossed with fresh vegetables.", price: 179, category: "Chinese", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246", rating: 4.3 },
  { name: "Chicken Manchurian", description: "Crispy chicken tossed in a tangy Indo-Chinese sauce.", price: 229, category: "Chinese", image: "https://images.unsplash.com/photo-1585032226651-759b368d7246", rating: 4.5 },
  { name: "Veg Fried Rice", description: "Classic wok-tossed rice with mixed vegetables.", price: 169, category: "Chinese", image: "https://images.unsplash.com/photo-1512058564366-18510be2db19", rating: 4.2 },
  { name: "Spring Rolls", description: "Crispy rolls stuffed with vegetables and glass noodles.", price: 149, category: "Chinese", image: "https://images.unsplash.com/photo-1544025162-d76694265947", rating: 4.4 },
  { name: "Kung Pao Chicken", description: "Spicy stir-fried chicken with peanuts and chili peppers.", price: 249, category: "Chinese", image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b", rating: 4.6 },

  // ---- Desserts ----
  { name: "Chocolate Brownie", description: "Warm, fudgy brownie served with a scoop of vanilla ice cream.", price: 129, category: "Desserts", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c", rating: 4.7 },
  { name: "Gulab Jamun", description: "Soft milk dumplings soaked in rose-flavored sugar syrup.", price: 99, category: "Desserts", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84", rating: 4.6 },
  { name: "New York Cheesecake", description: "Rich and creamy classic baked cheesecake.", price: 159, category: "Desserts", image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad", rating: 4.8 },
  { name: "Tiramisu", description: "Layers of coffee-soaked sponge and mascarpone cream.", price: 179, category: "Desserts", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9", rating: 4.7 },
  { name: "Ice Cream Sundae", description: "A trio of ice cream scoops topped with syrup and nuts.", price: 119, category: "Desserts", image: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f", rating: 4.4 },

  // ---- Beverages ----
  { name: "Mango Lassi", description: "A refreshing yogurt-based mango smoothie.", price: 89, category: "Beverages", image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888", rating: 4.5 },
  { name: "Cold Coffee", description: "Chilled coffee blended with milk and ice cream.", price: 109, category: "Beverages", image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735", rating: 4.6 },
  { name: "Fresh Lime Soda", description: "A zesty, fizzy classic — sweet or salted.", price: 69, category: "Beverages", image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859", rating: 4.3 },
  { name: "Masala Chai", description: "Traditional spiced Indian tea.", price: 49, category: "Beverages", image: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f", rating: 4.5 },

  // ---- Snacks ----
  { name: "Paneer Tikka", description: "Chargrilled marinated paneer cubes with mint chutney.", price: 199, category: "Snacks", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950", rating: 4.6 },
  { name: "French Fries", description: "Crispy golden fries salted to perfection.", price: 99, category: "Snacks", image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877", rating: 4.4 },
  { name: "Chicken Wings", description: "Spicy tossed wings, crispy on the outside, juicy inside.", price: 219, category: "Snacks", image: "https://images.unsplash.com/photo-1608039755401-742074f0548d", rating: 4.7 },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding...");

    // Clear existing food data first, so re-running this script doesn't create duplicates
    await Food.deleteMany();
    console.log("Existing food data cleared.");

    // Insert all new food items in one batch operation
    await Food.insertMany(foods);
    console.log(`${foods.length} food items inserted successfully!`);

    process.exit(0); // exit cleanly
  } catch (error) {
    console.error(`Error seeding database: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();