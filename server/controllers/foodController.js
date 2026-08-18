// controllers/foodController.js
// Contains the logic for handling food-related requests.

import Food from "../models/Food.js";

// @desc    Get all food items
// @route   GET /api/foods
// @access  Public
export const getAllFoods = async (req, res) => {
  try {
    const foods = await Food.find(); // fetch every document in the "foods" collection
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching foods" });
  }
};

// @desc    Get a single food item by ID
// @route   GET /api/foods/:id
// @access  Public
export const getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({ message: "Food item not found" });
    }

    res.json(food);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching food" });
  }
};

// @desc    Create a new food item
// @route   POST /api/foods
// @access  Private/Admin
export const createFood = async (req, res) => {
  try {
    const { name, description, price, category, image, rating, available } = req.body;

    const food = await Food.create({
      name,
      description,
      price,
      category,
      image,
      rating,
      available,
    });

    res.status(201).json(food); // 201 = "Created"
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a food item
// @route   PUT /api/foods/:id
// @access  Private/Admin
export const updateFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({ message: "Food item not found" });
    }

    // Only update fields that were actually sent in the request
    Object.assign(food, req.body);

    const updatedFood = await food.save();
    res.json(updatedFood);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a food item
// @route   DELETE /api/foods/:id
// @access  Private/Admin
export const deleteFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({ message: "Food item not found" });
    }

    await food.deleteOne();
    res.json({ message: "Food item removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error while deleting food" });
  }
};