import Product from "../models/Product.model.js";

export const addProduct = async (req, res) => {
    try {
        const { title, description, price, stock, image, category } = req.body;

        // validation (fix for 0 values)
        if (!title || !description || price == null || stock == null || !category) {
            return res.status(400).json({
                message: "All required fields must be provided"
            });
        }

        const newProduct = await Product.create({
            title,
            description,
            price,
            stock,
            image,
            category
        });

        return res.status(201).json({
            message: "Product added successfully",
            product: newProduct
        });

    } catch (error) {
        console.error(error.message);

        return res.status(500).json({
            message: "Server error"
        });
    }
};