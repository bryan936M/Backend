import Config from "../../../config/dev.config.js";
import { BadRequestError } from "../../../utils/ErrorHandling/App-errors.js";
import OrderService from "../services/order.service.js";

const service = new OrderService();

const newOrder = async (req, res, next) => {
  const order = await service
    .createOrder(req.body)
    .catch((error) => next(error));

  // notify the product service
  req.exchangeServices.publishOrderToExchange(
    req.channel,
    Config.PRODUCT_SERVICE,
    "order-created",
    // order,
    JSON.stringify(order.items[order.items.length - 1])
  );

  return res.status(201).json(order);
};

const getCustomerOrder = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    next(new BadRequestError("Order ID is required", 400));
  }

  const order = await service.getOrder(id).catch((error) => next(error));
  return res.status(200).json(order);
};

const getOrders = async (req, res, next) => {
  const { limit, offset } = req.query;

  const orders = await service
    .getOrders(limit, offset)
    .catch((error) => next(error));
  return res.status(200).json(orders);
};

const addProductToOrder = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    next(new BadRequestError("Order ID is required", 400));
  }

  const order = await service
    .addToOrder(id, req.body)
    .catch((error) => next(error));
  return res.status(200).json(order);
};

export { newOrder, getCustomerOrder, getOrders, addProductToOrder };
