import OrderModel from "../models/Order.model.js";

class OrderRepository {
  constructor() {
    this.model = OrderModel;
  }

  // Create a new order
  async createOrder(order) {
    const existingOrder = await this.model.findOne({
      userId: order.userId,
      status: "pending",
    });

    if (existingOrder) {
      // add order
      let orderItems = order.items;
      return this.addToOrder(existingOrder._id, orderItems);
    }
    console.log("Creating new order");
    return this.model.create(order);
  }

  // Get all orders
  async getOrders(limit, offset) {
    return this.model.find().limit(limit).skip(offset);
  }

  // Get order details
  async getOrder(userId) {
    return this.model.find({ userId: userId });
  }

  // Add new product to an order
  async addToOrder(id, items) {
    const order = await this.model.findById(id);
    if (!order) {
      throw new Error("Order not found");
    }
    console.log(items);
    items.forEach((item) => {
      if (item) order.items.push(item);
    });

    return order.save();
  }

  // Remove a product from an order
  async removeProductFromOrder(id, productId) {}

  // Update product quantity in an order
  async updateProductQuantity(id, productId) {}

  // Cancel an order
  async cancelOrder(id) {}

  // Pay for an order
  async payForOrder(id, paymentDetails) {}
}

export default OrderRepository;
