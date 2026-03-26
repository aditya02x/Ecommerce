import User from "../models/User.model.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // validation
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // check existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // response
        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};