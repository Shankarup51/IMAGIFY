import express from "express";
import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import razorpay from "razorpay";
import transactionModel from "../models/transactionModel.js";
import dotenv from "dotenv";
dotenv.config();

// Register a new user
const registerUser = async (req, res) => {
    try {
        console.log("Request Body:", req.body); // Debugging line
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ success: false, message: "Email already registered" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({ name, email, password: hashedPassword });
        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: { name: user.name, email: user.email },
            token
        });
    } catch (error) {
        console.error("Error in registerUser:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// Login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: { name: user.name, email: user.email },
            token
        });
    } catch (error) {
        console.error("Error in loginUser:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};


const userCredits = async (req, res) => {
    try {
      const  userId  = req.user.id;
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            credits: user.creditBalance,
            user: { name: user.name ,_id:user._id}
        });
    } catch (error) {
        console.error("Error in userCredits:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const paymentRazorpay = async (req, res) => {
  try {
    const { userId, planId } = req.body;

    if (!userId || !planId) {
      return res.status(400).json({ success: false, message: "Missing details" });
    }

    const userData = await userModel.findById(userId);
    if (!userData ) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    let credits, plan, amount ;
    switch (planId) {
      case 'Basic':
        credits = 100;
        plan = "Basic";
        amount = 10;
        break;
      case 'Advanced':
        credits = 500;
        plan = "Advanced";
        amount = 50;
        break;
      case 'Business':
        credits = 5000;
        plan = "Business";
        amount = 250;
        break;
      default:
        return res.status(400).json({ success: false, message: "Invalid plan selected" });
    }

    const date = Date.now();
    const transactionData = { userId, planId, amount, credits, date };
    const newTransaction = await transactionModel.create(transactionData);

    const options = {
      amount: amount * 100,
      currency: process.env.CURRENCY || "INR",
      receipt: newTransaction._id,
    };

    const order = await razorpayInstance.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error in paymentRazorpay:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const verifyRazorpay = async(req,res)=>{
  try{

    const {razorpay_order_id} = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if(orderInfo.status === 'paid'){
      const transactionData = await transactionModel.findById(orderInfo.receipt);
      if(transactionData.payment){
        return res.json({success:false, message:'Payement Failed'})
      }
      const userData = await userModel.findById(transactionData.userId);
      
      const creditBalance = userData.creditBalance + transactionData.credits;
      await userModel.findByIdAndUpdate(userData._id, {creditBalance});
      await transactionModel.findByIdAndUpdate(transactionData._id, {payment:true});

      res.json({success:true, message:'Payment Successful , Credits added'});

    }
    else{
      res.json({success:false, message:'Payment Failed'});
    }
  }
  catch(error){
    console.error("Error in verifyRazorpay:", error);
    res.json({success:false , message:error.message});
  }
}

export { registerUser, loginUser, userCredits,paymentRazorpay,verifyRazorpay};
