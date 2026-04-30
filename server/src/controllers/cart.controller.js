import Cart from "../models/cartmodel.js";
export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const cart = new Cart({
            userId: req.userId,
            items: [{ productId, quantity }],
        });
        await cart.save();
        res.status(201).json({ message: "Product added to cart successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}   