import Cart from '../models/cartModel.js';
import Product from '../models/productModel.js'
class CartController {
  // Get Cart
 // Get Cart method in the CartController
async getCart(req, res) {
  try {
    // Find the cart for the logged-in user and populate the product field with its details including price
    const cart = await Cart.findOne({ user: req.user.id }).populate({
      path: 'items.product',
      select: 'name price image', // Ensure the name, price, and image fields are populated
    });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error: error.message });
  }
}


  // Add to Cart
  async addToCart(req, res) {
    const userId = req.user.id; // User ID from the token
    const { productId, quantity } = req.body; // Product ID and quantity from request body

    try {
      let cart = await Cart.findOne({ user: userId });
      if (!cart) {
        // If the cart doesn't exist, create a new one
        cart = new Cart({ user: userId, items: [] });
      }

      // Check if item already exists in the cart
      const existingItem = cart.items.find(item => item.product.toString() === productId);
      
      // Fetch product details to get the price
      const product = await Product.findById(productId).select('price name image');
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      if (existingItem) {
        // Update the quantity if the product already exists in the cart
        existingItem.quantity += quantity;
      } else {
        // Add new item to cart with the product's price
        cart.items.push({ 
          product: productId, 
          quantity, 
          price: product.price,
          image: product.image,

        });
      }

      // Save the cart
      await cart.save();
      res.status(201).json(cart); // Return the updated cart
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  }

  // Remove from Cart
  async removeFromCart(req, res) {
    const userId = req.user.id; // Correct user ID reference
    const { productId } = req.body; // Product ID to remove

    try {
      const cart = await Cart.findOne({ user: userId });
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }

      // Filter out the product to be removed
      cart.items = cart.items.filter(item => item.product.toString() !== productId);
      await cart.save();

      res.status(200).json({ message: 'Product removed from cart', cart });
    } catch (error) {
      res.status(500).json({ message: 'Error removing product from cart', error: error.message });
    }
  }

  // Update Cart
  async updateCart(req, res) {
    const userId = req.user.id; // Correct user ID reference
    const { productId, quantity } = req.body; // Product ID and new quantity

    try {
      const cart = await Cart.findOne({ user: userId });
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }

      // Find the item to update
      const cartItem = cart.items.find(item => item.product.toString() === productId);
      if (!cartItem) {
        return res.status(404).json({ message: 'Item not found in cart' });
      }

      // Update the quantity
      cartItem.quantity = quantity;
      await cart.save();

      res.status(200).json({ message: 'Cart updated', cart });
    } catch (error) {
      res.status(500).json({ message: 'Error updating cart', error: error.message });
    }
  }
}

export default new CartController();
