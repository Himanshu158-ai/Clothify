import Cart from "../models/cartmodel.js";


//add to cart
export const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        let cart = await Cart.findOne({ userId: req.userId });

        if (cart) {
            const itemIndex = cart.items.findIndex(
                item => item.productId.toString() === productId
            );

            if (itemIndex > -1) {
                // 👉 product already hai → quantity increase
                cart.items[itemIndex].quantity += quantity;
            } else {
                // 👉 new product add
                cart.items.push({ productId, quantity });
            }

            await cart.save();

        } else {
            // 3️⃣ cart nahi hai → new create
            cart = await Cart.create({
                userId: req.userId,
                items: [{ productId, quantity }]
            });
        }

        res.status(200).json({
            message: "Cart updated successfully",
            cart
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//get all cart
export const getAllCart = async (req, res) => {
    const userId = req.userId;
    try {
        const cart = await Cart.findOne({ userId })
            .populate("items.productId");
        if (!cart) {
            return res.status(200).json({ items: [] });
        }
        
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}   
