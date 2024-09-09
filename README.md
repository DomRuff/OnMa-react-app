# OnMA React App

The OnMa React App is a modern responsive front-end application built with React and Vite.js. Designed with TailwindCSS, the app provides a sleek and responsive user interface for interacting with an e-commerce platform. It allows users to sell or browse products, manage their shopping cart and view order and sales history. The app communicates with a backend API (the OnMa - REST API) to perform CRUD operations for products, users and orders.

## Features

- Homepage with a hero section and carousel of last viewed products
- Full shopping cart functionality
- User authentication: Login and Sign up
- Add new products to the catalogue
- Product search with filters
- Account management: View advertised, sold products, and order history
- API controllers for database interaction

## Technologies

- **React** (with Vite.js)
- **TailwindCSS** for styling
- **React Router** for page navigation

## Table of Contents

- [Pages](#pages)
- [Components](#components)
- [Api Controllers](#api-controllers)
- [Setup Instructions](#setup-instructions)

## Pages

The app is divided into several main pages, each serving a distinct purpose:

### Homepage

- **Components**: Call-to-action hero section and a carousel displaying last viewed products.
- **Description**: The landing page for users, showcasing a dynamic display of products and engaging the user with a promotional banner.

### Sell Page

- **Description**: Allows users to add new products to the catalogue. It contains a form where sellers can input product details such as name, description, price, and stock quantity.

### Shopping Cart

- **Description**: Displays all products added to the cart by the user. Users can adjust quantities or remove items from their cart before proceeding to checkout.

### Login Page

- **Description**: Provides an interface for users to log into their account using their username and password. If no account exists, the user is redirected to a signup page.

### Signup Page

- **Description**: Enables new users to create an account by providing necessary details. Once registered, users can log in and start using the app.

### Account Page

- **Description**: Displays the user's account details, including:
  - Name
  - Orders placed by the user
  - Advertised products (for sellers)
  - Sold products
  - Log out functionality to terminate the session

---

## Main Components

The app is designed around reusable, responsive and modular components, ensuring maintainability and scalability. The relationship of the components is displayed here. For a more thoughrough look into how components operate, please view them individually.

### RouteController

- **Components**:
  - HomePage
  - LoginPage
  - SignupPage
  - AccountPage
  - ProducsPage
  - SellPage
  - CartPage
  - NotFoundPage

### Navbar

- **Components**:
  - Search

### Homepage

- **Components**:
  - Hero
  - LastViewed
    - Modal

### ProductsPage

- **Components**:
  - Products
    - Product
      - Modal

### AccountPage

- **Components**:
  - Modal

---

## API Controllers

- **Description**: Handle all communication with the backend via HTTP requests. Functions like `login`, `addProduct`, and `updateProduct` are examples of operations that interact with the backend API. It has to be noted that the API is required to run on `http://localhost:8080` due to a proxy setup within the `vite.config.js` file. A list of API controllers and operations is provided here.

### UserController

- **Description**: Handles API calls regarding users.
  - addUser
  - login
  - getAllUsers
  - getUserById

### UserController

- **Description**: Handles API calls regarding products.
  - addProduct
  - getAllProducts
  - getProductbyId
  - getSellerIdByProductById
  - getSellerNameByProductId
  - getProductsBySellerId
  - getProductNameById
  - updateProduct
  - deleteProduct

### OrderController

- **Description**: Handles API calls regarding orders.
  - addOrder
  - getAllOrders
  - getOrdersByCustomerId
  - getOpenOrdersBySellerId
  - getProductByOrderId
  - updateOrder

### UI Components

- **Description**: Components are designed to focus on a single task, enabling reusability. Examples include:
  - **ProductCard**: Displays product details.
  - **HeroSection**: The call-to-action section on the homepage.
  - **SearchBar**: Allows users to input queries and apply filters.
  - **CartItem**: Displays individual products in the shopping cart.

---

## Setup Instructions

### Prerequisites

- **Node.js** (LTS version)
- **npm**

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/OnMa-react-app.git
   cd OnMa-react-app
   ```

2. **Install the dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

### Building

1. Build for production
   ```bash
   npm ru build
   ```
