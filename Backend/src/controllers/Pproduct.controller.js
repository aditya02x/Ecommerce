import Product from "../models/Product.model.js";
import Cart from '../models/Cart.model.js'

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
import Cart from "../models/Cart.model.js";
import Product from "../models/Product.model.js";

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


export const getCart = async (req,res)=>{
    try {

        const userId = req.user.id

        //find cart
        const cart = await cart.findOne({user:userId}).populate("products.productId");

        // if no cart 

        if(!cart){
            return res.status(404).json({message:"Cart does not exist"})
        }
        return res.status(200).json({
            message:"Cart fetched sucessfully",
            cart
        });


        
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message:"Server Error"
        })
    }
}

export const removeFromCart = async (req,res)=>{
    try {
        const {productId} = req.body
        const userId = req.user.id
       
        //validate
        if(!productId){
            return res.status(400).json({
                message:"Product id is required"
            })
        }

        if(!cart){
            return res.status(404).json({
                message:"cart not found"
            })
        }

        //reomve 
        cart.products = cart.products.filter((item)=> item.productId.toString() !== productId)

        await cart.save()
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({
            message:"Server Error"
        })
    }
}