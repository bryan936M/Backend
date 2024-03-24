import ProductService from "../services/product.service.js";
import { consumeMessage } from "../../../utils/Broker/rabbitMQ.js";

const service = new ProductService();

consumeMessage(service);