import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";

class OrderController {
  // Create a new order
    async createOrder(req, res) {
      try {
        const { products, totalPrice, paymentMethod, shippingAddress, shippingMethod } = req.body;
        const userId = req.user.id; // Authenticated user
  
        // Check if cart exists for the user
        const cart = await Cart.findOne({ user: userId });
        if (!cart || cart.items.length === 0) {
          return res.status(400).json({ message: "Your cart is empty" });
        }
  
        // Create the order
        const order = new Order({
          user: userId,
          products,
          totalPrice,
          paymentMethod,
          shippingAddress,
          shippingMethod,
          status: 'Pending',
        });
  
        await order.save();
  
        // Clear the cart after placing the order
        await Cart.findOneAndUpdate({ user: userId }, { items: [] });
  
        res.status(201).json({ message: "Order placed successfully", order });
      } catch (err) {
        res.status(500).json({ message: "Error placing order", error: err.message });
      }
    }

  // Get all orders for the authenticated user
  async getUserOrders(req, res) {
    try {
      const userId = req.user.id;  // Authenticated user ID
      const orders = await Order.find({ user: userId }).populate('products.product');
    
      res.status(200).json({ orders });
    } catch (err) {
      res.status(500).json({ message: "Error fetching orders", error: err.message });
    }
  }

  // Get a specific order by ID
  async getOrderById(req, res) {
    try {
      const order = await Order.findById(req.params.orderId).populate('products.product');
    
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.status(200).json(order);
    } catch (err) {
      res.status(500).json({ message: "Error fetching order", error: err.message });
    }
  }

  // Update the status of an order
  async updateOrderStatus(req, res) {
    try {
      const { status } = req.body;
      const order = await Order.findById(req.params.orderId);
    
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      order.status = status;
      await order.save();

      res.status(200).json({ message: "Order status updated", order });
    } catch (err) {
      res.status(500).json({ message: "Error updating order status", error: err.message });
    }
  }

  // Delete an order (optional, in case you want this feature)
  async deleteOrder(req, res) {
    try {
      const order = await Order.findById(req.params.orderId);
    
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      await order.remove();
      res.status(200).json({ message: "Order deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Error deleting order", error: err.message });
    }
  }
}

export default new OrderController();  // Export an instance of the class
