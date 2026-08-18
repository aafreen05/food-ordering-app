// controllers/orderController.js
import Order from "../models/Order.js";
import User from "../models/User.js";
import Food from "../models/Food.js";

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private (logged-in users only)
export const createOrder = async (req, res) => {
  try {
    const { items, deliveryAddress, phone, paymentMethod, subtotal, deliveryFee, totalAmount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cannot place an order with an empty cart" });
    }

    if (!deliveryAddress || !phone || !paymentMethod) {
      return res.status(400).json({ message: "Please provide delivery address, phone, and payment method" });
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      deliveryAddress,
      phone,
      paymentMethod,
      subtotal,
      deliveryFee,
      totalAmount,
      status: "Pending",
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get the logged-in user's own orders
// @route   GET /api/orders/my-orders
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching your orders" });
  }
};

// @desc    Get a single order by ID
// @route   GET /api/orders/:id
// @access  Private (must be the order's owner, or an admin)
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const isOwner = order.user.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Not authorized to view this order" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching order" });
  }
};

// @desc    Get ALL orders (admin only)
// @route   GET /api/orders
// @access  Private/Admin
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching orders" });
  }
};

// @desc    Update an order's status (admin only)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = ["Pending", "Confirmed", "Preparing", "Out for Delivery", "Delivered", "Cancelled"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid order status" });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Server error while updating order status" });
  }
};

// @desc    Get dashboard statistics (admin only)
// @route   GET /api/orders/stats
// @access  Private/Admin
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalFoods = await Food.countDocuments();
    const totalOrders = await Order.countDocuments();
    const pendingOrders = await Order.countDocuments({ status: "Pending" });
    const deliveredOrders = await Order.countDocuments({ status: "Delivered" });

    const revenueResult = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

    res.json({
      totalUsers,
      totalFoods,
      totalOrders,
      totalRevenue,
      pendingOrders,
      deliveredOrders,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error while fetching dashboard stats" });
  }
};