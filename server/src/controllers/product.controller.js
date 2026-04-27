import {imagekit} from "../middleware/image.middleware.js";
import Product from "../models/productmodel.js";
export const createProduct = async (req, res) => {
    try {
        console.log(req.files);
        const uploadPromises = req.files.map(file =>
            imagekit.upload({
                file: file.buffer,
                fileName: file.originalname,
                folder: "/products"
            })
        );
        const results = await Promise.all(uploadPromises);
        const imageUrls = results.map(r => r.url);

        const { name, description, price, category, stock } = req.body;
        const product = new Product({
            name,
            description,
            price,
            category,
            stock,
            images: imageUrls,
            userId: req.userId,
        });
        await product.save();
        res.status(201).json({ message: "Product created successfully", product });

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}