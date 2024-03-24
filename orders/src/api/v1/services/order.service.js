import OrderRepository from "../db/repository/order.repository.js";

class OrderService {
  constructor() {
    this.repository = new OrderRepository();
  }

  // Create a new order
  async createOrder(order) {
    return this.repository.createOrder(order);
  }

  // Get order details
  async getOrder(id) {
    return this.repository.getOrder(id);
  }
  
  // Add new product to an order
  async addToOrder(id, items) {
    return this.repository.addToOrder(id, items);
  }

  // Get all orders
  async getOrders(limit, offset) {
    return this.repository.getOrders(limit, offset);
  }

  // Remove a product from an order

  // Update product quantity in an order

  // Cancel an order

  // Pay for an order

}

export default OrderService;
