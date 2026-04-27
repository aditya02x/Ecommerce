
dotenv.config()

export  const connectDb = async ()=>{
   try {
    
     const connect = await mongoose.connect(process.env.MONGO_URL)
    console.log("Mongo db has been connect sucessfyly")
   } catch (error) {
    console.log("Mongo db not connected")
    
   }
}

connectDb()

