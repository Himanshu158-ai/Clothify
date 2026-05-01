import { Router } from "express";
import { addToCart } from "../controllers/cart.controller.js";
import verifyTokenCart from "../middleware/cart.middleware.js";

const router = Router();

router.post("/", verifyTokenCart, addToCart);
// router.get("/", getAllCart);
// router.put("/:id", updateCart);
// router.delete("/:id", deleteCart);

export default router;