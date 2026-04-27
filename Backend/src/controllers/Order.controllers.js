import mongoose from "mongoose";
import Order from '../models/Order.model.js'
import Cart from '../models/Cart.model.js'


export const placeOrder = async (req,res) =>{
    try {
        const userId = req.user.id,

        //get user cart + product detail
        const cart = await Cart.findOne({user:userId}).populate("products.productId")

        if(!cart || cart.products.length === 0){
            return res.status(400).json({message:"Cart is empty"})
        }
        
    } catch (error) 
    {
        console.error(error.message)
        return res.status(500).json({message:"Internal Server Error"})
        
    }
}