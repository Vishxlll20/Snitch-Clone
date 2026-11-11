import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import {config} from "../config/config.js";

async function generateToken(user) {
    const token = {
        id: user._id,
        email: user.email,
        role: user.role
    };
    return jwt.sign(token, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRE });
}

export const registerUser = async (req, res) => {
    const { name, email, password, contact } = req.body;

    try{
        const existingUser = await userModel.findOne({ 
            $or: [{ email }, { contact }]
        });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = new userModel({
            fullname: name,
            email,
            password,
            contact
        });
        await user.save();
        const token = await generateToken(user);
        res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
}