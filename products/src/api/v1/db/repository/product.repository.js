import ProductModel from "../models/Product.model.js";

class ProductRepository {
  constructor() {
    this.model = ProductModel;
  }

  async createProduct(product) {
    const newProduct = new this.model(product);
    return newProduct.save();
    // return this.model.create(product);
  }

  async getProducts(limit, offset) {
    return this.model.find().limit(limit).skip(offset);
  }

  async getProduct(id) {
    return this.model.findById(id);
  }

  async updateProduct(id, product) {
    return this.model.findByIdAndUpdate(id, product, { new: true });
  }

  async removeProduct(id) {
    return this.model.findByIdAndDelete(id);
  }

  async updateProductQuantity(data) {
    // const { id, quantity } = data;
    // const product = await this.model.findById(id);
    // product.quantity -= quantity;
    // return product.save();
    return
  }
}

export default ProductRepository;