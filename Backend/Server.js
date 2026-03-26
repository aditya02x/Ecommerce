import express from 'express'
import { connectDb } from './src/config/DB.js'
import dotenv from 'dotenv'
dotenv.config()
const app = express()


const PORT = process.env.PORT || 3000

const startServer = async ()=>{
    try {
        await connectDb();
        app.listen(PORT,()=>{
            console.log(`server is running on port ${PORT}`)
        })
        
        
    } catch (error) {
        console.log(`Server Error ${error}`)
        
    }
}
startServer()