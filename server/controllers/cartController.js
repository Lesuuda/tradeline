import Cart from '../models/cartModel.js';

class CartController {
  // Get Cart
  async getCart(req, res) {
    try {
      // Find the cart for the logged-in user and populate the product field inside items
      const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
      
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
        if (existingItem) {
            existingItem.quantity += quantity; // Update the quantity if it exists
        } else {
            // Add new item to cart
            cart.items.push({ product: productId, quantity }); // Note: 'product' instead of 'productId'
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
