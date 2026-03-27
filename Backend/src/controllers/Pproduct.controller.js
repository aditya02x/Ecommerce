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


export const getAllProducts = async (req, res) => {
    try {
        // pagination
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const skip = (page - 1) * limit;

        // fetch products
        const products = await Product.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        // total count (for frontend pagination)
        const totalProducts = await Product.countDocuments();

        return res.status(200).json({
            message: "Products fetched successfully",
            currentPage: page,
            totalPages: Math.ceil(totalProducts / limit),
            totalProducts,
            products
        });

    } catch (error) {
        console.error(error.message);

        return res.status(500).json({
            message: "Server error"
        });
    }
};


export const getProductById = async (req,res)=>{
    try {

        const {id } = req.params;
        const product = await Product.findById(id)
        if(!product){
            return res.status(400).json({message:"Product not found"})
        }

        return res.status(200).json({message:"product fetched sucessfully",
            product
        })
        
    } catch (error) {
        console.error(error.message);

        return res.status(500).json({
            message:"server error"
        })
        
    }
}
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const userId = req.user.id;

    // validate input
    if (!productId) {
      return res.status(400).json({
        message: "Product ID is required",
      });
    }

    // check product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // find user's cart
    let cart = await Cart.findOne({ user: userId });

    // if no cart → create new
    if (!cart) {
      cart = new Cart({
        user: userId,
        products: [{ productId, quantity }],
      });
    } else {
      // check if product already exists in cart
      const existingProduct = cart.products.find(
        (item) => item.productId.toString() === productId
      );

      if (existingProduct) {
        // increase quantity
        existingProduct.quantity += quantity;
      } else {
        // add new product
        cart.products.push({ productId, quantity });
      }
    }

    // save cart
    await cart.save();

    return res.status(200).json({
      message: "Product added to cart",
      cart,
    });

  } catch (error) {
    console.error(error.message);

    return res.status(500).json({
      message: "Server error",
    });
  }
};