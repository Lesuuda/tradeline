import Order from "../models/orderModel.js";

class OrderController {
  // Create a new order
  async createOrder(req, res) {
    try {
      const { products, totalPrice, paymentMethod, shippingAddress } = req.body;
      const userId = req.user._id;  // Assuming the user object is attached to the request after authentication

      const order = new Order({
        user: userId,
        products,
        totalPrice,
        paymentMethod,
        shippingAddress,
      });

      await order.save();
      res.status(201).json({ message: "Order created successfully", order });
    } catch (err) {
      res.status(500).json({ message: "Error creating order", error: err.message });
    }
  }

  // Get all orders for the authenticated user
  async getUserOrders(req, res) {
    try {
      const userId = req.user._id;  // Authenticated user ID
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
