import express from "express";
import {
  addItemToCart,
  getCart,
  updateCartItem,
  removeItemFromCart,
  clearCart,
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(protect, addItemToCart)
  .get(protect, getCart)
  .delete(protect, clearCart);
router
  .route("/:productId")
  .put(protect, updateCartItem)
  .delete(protect, removeItemFromCart);

export default router;
