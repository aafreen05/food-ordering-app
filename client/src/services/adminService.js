// services/adminService.js
import api from "./api";

export const getDashboardStats = async () => {
  const response = await api.get("/orders/stats");
  return response.data;
};

export const getAllOrdersAdmin = async () => {
  const response = await api.get("/orders");
  return response.data;
};

export const updateOrderStatusAdmin = async (orderId, status) => {
  const response = await api.put(`/orders/${orderId}/status`, { status });
  return response.data;
};