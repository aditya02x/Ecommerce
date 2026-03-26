import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        index:true
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
        
        default:0
    },
    image:{
        type:String,
        default:""

    },
    category:{
        type:String,
        required:true,
        enum:["electronics","clothing","food","books"]
    }
},{timestamps:true})


export default mongoose.model("Product",productSchema)