import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
        min:0 // shoiuld not be negative
    },
    stock:{
        type:Number,
        required:true,
        default:0
    },
    image:{
        type:String,

    },
    category:{
        type:String,
        required:true
    }
},{timestamps:true})


export default mongoose.model("Product",productSchema)