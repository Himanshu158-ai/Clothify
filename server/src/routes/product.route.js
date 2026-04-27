import express from "express";
import { upload } from "../middleware/image.middleware.js";
import { createProduct,getAllProducts } from "../controllers/product.controller.js";
import isSeller from "../middleware/seller.middleware.js";

const router = express.Router();

router.post("/", isSeller, upload.array("images", 4), createProduct);
router.get("/",getAllProducts);
// router.get("/:id",getProductById);
// router.put("/:id",updateProduct);
// router.delete("/:id",deleteProduct);

export default router;