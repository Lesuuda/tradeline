# Traddeline

## Overview

This is a fully functional e-commerce platform built using modern web technologies. The platform includes features like user authentication, product management, a shopping cart, and checkout functionality. It is designed with a **Next.js** frontend, a **Node.js** backend, and **MongoDB** as the database. The project is styled using **Tailwind CSS** and handles image uploads using **Multer**.

---

## Features

- **Authentication**: Secure user authentication using JWT for login, signup, and logout.
- **Product Management**: Admin functionality for adding, updating, and removing products, including image uploads.
- **Shopping Cart**: Users can add products to their cart, update quantities, and remove items.
- **Search Functionality**: Search for products by name or description with pagination support.
- **Dynamic Navbar**: Cart icon dynamically shows the number of items in the cart, with the icon turning yellow and count badge displayed.
- **Checkout**: Users can proceed to checkout with a summarized order of items in their cart.
- **Responsive Design**: The entire platform is mobile-responsive, thanks to Tailwind CSS.

---

## Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/), [JWT](https://jwt.io/) for authentication, [Multer](https://www.npmjs.com/package/multer) for image uploads
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Others**: [bcrypt](https://www.npmjs.com/package/bcrypt) for password hashing, [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) for cross-origin resource sharing, and [react-icons](https://react-icons.github.io/react-icons/) for icons.

---

## Installation

### Prerequisites

- **Node.js** (v14 or higher)
- **MongoDB** (Make sure you have MongoDB installed locally or have a remote MongoDB Atlas instance)
- **npm** or **yarn** as a package manager

### Steps to Install

1. **Clone the repository**:
    ```bash
    git clone https://github.com/lesuuda/tradeline.git
    cd tradeline
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the following environment variables:

    ```bash
    # Server Config
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/yourDatabaseName
    JWT_SECRET=yourJWTSecret
    ```

4. **Start the backend**:
    ```bash
    cd server
    node server.js
    ```

5. **Start the frontend**:
    ```bash
    cd client
    npm run dev
    ```

6. **Access the application**:  
   Open your browser and navigate to `http://localhost:3000`.

---

## API Endpoints

### Authentication

- **POST** `/signup`: Create a new user
- **POST** `/login`: Authenticate a user and return a JWT
- **POST** `/logout`: Log out the current user

### Product Management

- **GET** `/products`: Get all products (supports search and pagination)
- **POST** `/products/add`: Admin can add a new product
- **PUT** `/products/:id`: Admin can update a product by ID
- **DELETE** `/products/:id`: Admin can delete a product by ID

### Cart

- **GET** `/cart`: Get the current user's cart
- **POST** `/cart/add-to-cart`: Add a product to the user's cart
- **PUT** `/cart/update-cart`: Update a product quantity in the cart
- **DELETE** `/cart/remove-from-cart`: Remove a product from the cart

---

## Pagination for Search

The search functionality supports pagination. You can pass query parameters like `?q=searchTerm&page=1&limit=10` to control the results per page.

Example:

```bash
GET /products?q=laptop&page=1&limit=5
```

---

## Project Structure

```bash
.
├── backend
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middlewares
│   └── server.js
├── frontend
│   ├── app
│   │   ├── cart
│   │   ├── products
│   │   ├── auth
│   │   └── ...
│   └── components
├── .env
├── package.json
└── README.md
```

---

## Future Improvements

- **Order History**: Allow users to view their previous orders.
- **Payment Gateway Integration**: Add a payment gateway like Stripe or PayPal.
- **Product Reviews and Ratings**: Implement product reviews and ratings.
- **Product Categories**: Add product categorization for better browsing.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request for improvements, bug fixes, or new features.

---

## Contact

If you have any questions or feedback, feel free to contact me via:

- **Email**: lesuudaljamani@gmail.com.com
- **GitHub**: [lesuuda](https://github.com/your-username)

