// services/foodService.js
import api from "./api";

export const getAllFoods = async () => {
  const response = await api.get("/foods");
  return response.data;
};

export const getFoodById = async (id) => {
  const response = await api.get(`/foods/${id}`);
  return response.data;
};

export const createFood = async (foodData) => {
  const response = await api.post("/foods", foodData);
  return response.data;
};

export const updateFood = async (id, foodData) => {
  const response = await api.put(`/foods/${id}`, foodData);
  return response.data;
};

export const deleteFood = async (id) => {
  const response = await api.delete(`/foods/${id}`);
  return response.data;
};