import { Router } from "express";
import { addToCart, deleteCart, getAllCart } from "../controllers/cart.controller.js";
import verifyTokenCart from "../middleware/cart.middleware.js";

const router = Router();

router.post("/", verifyTokenCart, addToCart);
router.get("/", verifyTokenCart, getAllCart);
// router.put("/:id", updateCart);
router.delete("/:productId",verifyTokenCart, deleteCart);

export default router;