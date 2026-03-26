import User from '../models/User.model.js'
import bcrypt from 'bcrypt'

export const register = async (req,res)=>{
    const {name , email , password} = req.body 
    if(!name || !email || !password){
        return res.status(400).json({message:"all field are requied"})


    }

    const existUser = await User.findOne({email});
    if(existUser)
        {
            return res.status(400).json({message:"User already exist"})

    }

    const haspaasword = await bcrypt.hash(password,10)
    const User = await User.create({
        name,
        email,
        password:haspaasword
    })

    res.status(201).json({message:"user has been register sucessfuly"})


}