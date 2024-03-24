import Logger from "../../../utils/Logger/dev-logger.js";
import ProductRepository from "../db/repository/product.repository.js";

class ProductService {
  constructor() {
    this.repository = new ProductRepository();
  }

  async createProduct(product) {
    return this.repository.createProduct(product);
  }

  async getProducts(limit, offset) {
    return this.repository.getProducts(limit, offset);
  }

  async getProduct(id) {
    return this.repository.getProduct(id);
  }

  async updateProduct(id, product) {
    return this.repository.updateProduct(id, product);
  }

  async deleteProduct(id) {
    return this.repository.removeProduct(id);
  }

  async updateProductQuantity(data) {
    Logger.info(`updating product quantity: ${data}`);
  }

  async subscribeToProductEvents(payload) {
    const { event, data } = payload;
    Logger.info(`Received message: ${payload}`);
    switch (event) {
      case "order-created":
        this.updateProductQuantity(data);
      default:
        return;
    }
  }
}

export default ProductService;
