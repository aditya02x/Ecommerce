import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    products:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
                required:true
            }
        }
    ]
},{timestamps:true})