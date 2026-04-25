import User from "../models/usermodel.js";
import { config } from "../config/config.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


export const registerUser = async (req,res) => {
    try{
        const {name,email,password,contactNo} = req.body;
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message:"User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const user = await User.create({
            name,
            email,
            password:hashedPassword,
            contactNo
        })
        const token = jwt.sign({id:user._id},config.jwt_secret,{expiresIn:'2d'});
        res.cookie("token",token,{httpOnly:true,maxAge:2*24*60*60*1000});
        res.status(201).json({user:{
            _id:user._id,
            name:user.name,
            email:user.email,
            contactNo:user.contactNo
        },message:"User created successfully",token});
    }
    catch(err){
        res.status(500).json({message:"Internal server error"+err.message});
    }
}

export const loginUser = async (req,res) => {
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({message:"Invalid credentials"});
        }
        const token = jwt.sign({id:user._id},config.jwt_secret,{expiresIn:'2d'});
        res.cookie("token",token,{httpOnly:true,maxAge:2*24*60*60*1000});
        res.status(200).json({user:{
            _id:user._id,
            name:user.name,
            email:user.email,
            contactNo:user.contactNo
        },message:"User logged in successfully",token});
    }
    catch(err){
        res.status(500).json({message:"Internal server error"+err.message});
    }
}

export const getProfile = async (req,res) => {
    try{
        const user = await User.findById(req.userId).select('-password');
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        res.status(200).json({user});
    }
    catch(err){
        res.status(500).json({message:"Internal server error"+err.message});
    }
}