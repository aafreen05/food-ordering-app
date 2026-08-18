// models/Order.js
// Defines the shape of an "order" document in MongoDB.

import mongoose from "mongoose";

// This is a SUB-schema — it describes each individual item inside an order's "items" array.
// It's not its own collection; it lives embedded inside the Order document.
const orderItemSchema = new mongoose.Schema(
  {
    food: {
      type: mongoose.Schema.Types.ObjectId, // a reference to a document in the Food collection
      ref: "Food", // tells Mongoose which model this ID refers to (enables .populate())
      required: true,
    },
    name: { type: String, required: true }, // we duplicate name/price here on purpose (explained below)
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false } // sub-items don't need their own separate _id
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: {
      type: [orderItemSchema], // an array of order items (the sub-schema above)
      required: true,
      validate: {
        validator: (items) => items.length > 0,
        message: "Order must contain at least one item",
      },
    },
    deliveryAddress: {
      type: String,
      required: [true, "Delivery address is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    paymentMethod: {
      type: String,
      enum: ["Cash on Delivery", "Demo Online Payment"],
      required: true,
    },
    subtotal: { type: Number, required: true },
    deliveryFee: { type: Number, required: true, default: 40 },
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: [
        "Pending",
        "Confirmed",
        "Preparing",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
