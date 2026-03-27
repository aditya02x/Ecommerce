import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    products:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
                required:true
            },
            quantity:{
                type:Number,
                required:true,
                min:1
            },
            price:{
                type:Number,
                required:true
            }
        }
    ],
    totalAmount:{
        type:Number,
        min:0,
        required:true
    },
    Status:{
        required:true,
        enum:["pending","paid","shipped","delivered"],
        default:"pending"

    }
},{timestamps:true})

export default mongoose.model("Order",orderSchema)