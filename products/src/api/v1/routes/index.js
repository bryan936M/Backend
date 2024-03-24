import { Router } from "express";
import redisMiddleware from "../../../middlewares/cache.middleware.js";
import { authMiddleware, adminMiddleware } from "../../../middlewares/auth.middleware.js";
import {
  getAllProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const apiV1Router = Router();

// Define routes
apiV1Router.get("/", getAllProducts);
apiV1Router.get("/:id", redisMiddleware(), getProduct);
apiV1Router.post("/", authMiddleware, adminMiddleware, addProduct);
apiV1Router.put("/:id", updateProduct);
apiV1Router.delete("/:id", deleteProduct);

export default apiV1Router;
