// This is where we define our routes
import express from 'express';
import AuthController from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import ProductsController from '../controllers/productsController.js';
import AdminController from '../controllers/adminController.js';
import adminMiddleware from '../middleware/adminMiddleware.js';
import CategoryController from '../controllers/categoryController.js';
import CartController from '../controllers/cartController.js';
import upload from '../middleware/multer.js';
import OrderController from '../controllers/orderController.js';
const router = express.Router();

//authentication routes
router.post('/auth/signup', AuthController.signup);
router.post('/auth/login', AuthController.login);
router.get('/auth/logout', AuthController.logout);
router.post('/auth/forgot-password', AuthController.forgotPassword);
router.put('/auth/reset-password/:resetToken', AuthController.resetPassword);
router.get('/auth/profile', AuthController.getProfile);
router.put('/auth/profile/update', authMiddleware, AuthController.updateProfile);
router.get('/auth/check', AuthController.checkAuth);


//admin routes


router.post('/admin/products/add-product', authMiddleware, adminMiddleware, upload.array('images', 5),  AdminController.addProduct);
router.put('/admin/products/update-product/:id', authMiddleware, adminMiddleware, upload.array('images', 5), AdminController.updateProduct);
router.delete('/admin/products/delete-product/:id', authMiddleware, adminMiddleware, AdminController.deleteProduct);
router.get('/admin/orders', authMiddleware, AdminController.getAllOrders);

//category routes

// Add category (Admin only)
router.post('/admin/add-category', CategoryController.addCategory);

// Get all categories
router.get('/categories', CategoryController.getCategories);

// Get category by ID
router.get('/categories/:id', CategoryController.getCategoryById);

// Update category (Admin only)
router.put('/admin/categories/:id', CategoryController.updateCategory);

// Delete category (Admin only)
router.delete('/categories/:id', CategoryController.deleteCategory);


//products routes
router.get('/products', ProductsController.getProducts);
router.get('/products/:id', ProductsController.getProductById);
router.get('/categories', ProductsController.getCategories);
router.get('/category/:categoryId', ProductsController.getProductsByCategory);
router.get('/search', ProductsController.searchProducts);

//cart routes
router.get('/cart', authMiddleware, CartController.getCart);
router.post('/cart/add-to-cart', authMiddleware, CartController.addToCart);
router.delete('/cart/remove-from-cart', authMiddleware, CartController.removeFromCart);
router.put('/cart/update-cart', authMiddleware, CartController.updateCart);

//order routes
router.post("/orders", authMiddleware, OrderController.createOrder);
router.get("/orders", authMiddleware, OrderController.getUserOrders);
router.get("/:orderId", authMiddleware, OrderController.getOrderById);
router.put("/:orderId", authMiddleware, OrderController.updateOrderStatus);
router.delete("/:orderId", authMiddleware, OrderController.deleteOrder);

export default router; // Path: server/routes/index.j