import {imagekit} from "../middleware/image.middleware.js";
import Product from "../models/productmodel.js";


//create product
export const createProduct = async (req, res) => {
    try {
        // console.log(req.files);
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

//get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate("userId", "name");
        res.status(200).json({ message:"Products fetched successfully",products });
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

//get product by id
export const getProductById = async (req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id).populate("userId", "name").select("-__v");
        if(!product){
            return res.status(404).json({message:"Product not found"});
        }
        res.status(200).json({ message:"Product fetched successfully",product });
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}