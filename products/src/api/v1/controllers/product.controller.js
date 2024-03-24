import { InternalError } from "../../../utils/ErrorHandling/App-errors.js";
import ProductService from "../services/product.service.js";

export const service = new ProductService();



const addProduct = async (req, res, next) => {
  const { name, description, category, seller, quantity, price } = req.body;
  const product = {
    name,
    description,
    seller,
    category,
    quantity,
    price,
  };

  const newProduct = await service
    .createProduct(product)
    .catch((error) => next(error));
  return res.status(201).json(newProduct);
};
const getAllProducts = async (req, res, next) => {
  try {
    const products = await service
      .getProducts(100, 0)
      .catch((error) => next(error));
    return res.status(200).json(products);
  } catch (error) {
    return next(new InternalError(error.message, error.stack));
  }
};
const getProduct = async (req, res, next) => {
  const { id } = req.params;
  const product = await service.getProduct(id).catch((error) => next(error));
  return res.status(200).json(product);
};
const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { name, description, category, seller, quantity, price } = req.body;
  const product = {
    name,
    description,
    seller,
    category,
    quantity,
    price,
  };

  const updatedProduct = await service
    .updateProduct(id, product)
    .catch((error) => next(error));
  return res.status(200).json(updatedProduct);
};
const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  const deletedProduct = await service
    .deleteProduct(id)
    .catch((error) => next(error));
  return res.status(200).json(deletedProduct);
};

export { getAllProducts, getProduct, updateProduct, deleteProduct, addProduct };
