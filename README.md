# 🍴 Food Ordering App

A modern full-stack food ordering web application designed to provide users with a smooth and convenient online food ordering experience.

The application allows users to explore food items, view details, manage their cart, place orders, and interact with the platform through a responsive and user-friendly interface.

---

## 🚀 Live Demo

🔗 **Live Application:**  
https://food-ordering-app-rho-smoky.vercel.app/

---

## 📌 Project Overview

The **Food Ordering App** is a full-stack web application that simplifies the process of discovering food items and placing online orders.

It provides a structured platform where users can browse available food items, add products to their cart, manage their orders, and access their account information.

The project is developed with a separate frontend and backend architecture, making it easier to maintain, scale, and deploy the application.

---

## ✨ Features

### 👤 User Features

- 🔐 User Registration and Login
- 🍔 Browse Food Items
- 🔎 Search for Food
- 📋 View Food Details
- 🛒 Add Items to Cart
- ➕ Increase or decrease item quantity
- 🗑️ Remove items from cart
- 💰 View order total
- 📦 Place food orders
- 🧾 View order information
- 👤 Manage user profile
- 📱 Responsive user interface

### ⚙️ Application Features

- 🔄 Frontend and backend integration
- 🌐 REST API based communication
- 🗄️ Database integration
- 🔒 Secure user authentication
- 📱 Responsive design
- ⚡ Fast and interactive user experience
- ☁️ Cloud deployment support

---

## 🛠️ Technologies Used

### Frontend

- React.js
- HTML5
- CSS3
- JavaScript
- Vite

### Backend

- Node.js
- Express.js
- REST API

### Database

- MongoDB

### Deployment

- Vercel

### Development Tools

- Git
- GitHub
- Visual Studio Code
- npm

---

## 🏗️ Project Structure

```text
food-ordering-app/
│
├── client/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── package.json
│   └── ...
│
└── README.md
```

---

## 🔄 Application Workflow

```text
User
  ↓
Frontend Application
  ↓
API Request
  ↓
Backend / Express Server
  ↓
MongoDB Database
  ↓
API Response
  ↓
Frontend Application
  ↓
User
```

The application follows a client-server architecture where the frontend communicates with the backend through APIs. The backend processes requests, interacts with the MongoDB database, and sends the required response back to the frontend.

---

## ⚙️ Getting Started

Follow the steps below to run the project locally.

### Prerequisites

Make sure the following software is installed on your system:

- Node.js
- npm
- MongoDB
- Git

---

### 📥 1. Clone the Repository

Open your terminal and run:

```bash
git clone https://github.com/aafreen05/food-ordering-app.git
```

Then navigate to the project directory:

```bash
cd food-ordering-app
```

---

### 📦 2. Install Frontend Dependencies

Navigate to the client folder:

```bash
cd client
```

Install the required dependencies:

```bash
npm install
```

---

### 📦 3. Install Backend Dependencies

Open another terminal and navigate to the server folder:

```bash
cd food-ordering-app/server
```

Install the required backend dependencies:

```bash
npm install
```

---

### 🔐 4. Configure Environment Variables

Create a `.env` file inside the `server` folder.

Add the required environment variables:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

> ⚠️ Do not upload your `.env` file or sensitive credentials to GitHub.

---

### ▶️ 5. Start the Backend Server

Inside the `server` folder, run:

```bash
npm run dev
```

The backend server will start on the configured port.

---

### ▶️ 6. Start the Frontend

Open another terminal and navigate to the client folder:

```bash
cd food-ordering-app/client
```

Start the development server:

```bash
npm run dev
```

The terminal will display the local development URL. Open that URL in your browser to access the application.

---

## 🗄️ Database

The application uses **MongoDB** to store and manage application data.

MongoDB can be configured using:

- MongoDB Local
- MongoDB Atlas

The backend communicates with the database to store and retrieve application data.

---

## 🔐 Authentication

The application provides user authentication for accessing user-specific features.

Authentication includes:

- User Registration
- User Login
- User Profile
- Secure User Access
- User-specific Order Management

---

## 🛒 Cart Management

Users can manage their selected food items through the shopping cart.

Cart functionality includes:

- Add food items to cart
- Increase item quantity
- Decrease item quantity
- Remove items from cart
- View selected items
- Calculate the total amount

---

## 📦 Order Management

Users can:

1. Browse available food items
2. View food details
3. Add food items to the cart
4. Increase or decrease item quantity
5. Remove items from the cart
6. View the total amount
7. Place an order
8. View order information

---

## 📱 Responsive Design

The application is designed to provide a consistent user experience across different screen sizes.

Supported devices include:

- 💻 Desktop
- 💻 Laptop
- 📱 Mobile
- 📟 Tablet

---

## ☁️ Deployment

The application is deployed using **Vercel**.

### 🌐 Live Application

🔗 **Food Ordering App:**  
https://food-ordering-app-rho-smoky.vercel.app/

---

## 🔒 Security

- Environment variables are used to protect sensitive configuration.
- Database credentials should not be exposed publicly.
- Authentication is used for protected functionality.
- `.env` files should be excluded from version control.
- Sensitive information should not be committed to the repository.

---

## 🔮 Future Enhancements

The following features can be added in future versions:

- 💳 Online Payment Integration
- 📍 Live Order Tracking
- 🔔 Order Notifications
- ⭐ Food Ratings and Reviews
- ❤️ Wishlist
- 🎟️ Coupon and Discount System
- 🏪 Restaurant Management
- 👨‍💼 Admin Dashboard
- 📊 Order Analytics
- 🤖 AI-based Food Recommendations

---

## 🎯 Objective

The main objective of this project is to develop a practical full-stack food ordering platform that provides users with a convenient way to browse food items, manage their cart, and place orders.

The project also demonstrates the implementation of frontend development, backend API integration, database management, authentication, and cloud deployment.

---

## 👩‍💻 Developer

**Aafreen**

GitHub:  
https://github.com/aafreen05

---

## 📄 License

This project is developed for educational and project purposes.
