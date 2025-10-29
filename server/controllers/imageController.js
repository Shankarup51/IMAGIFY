// import { createSecretKey } from "crypto";
// import FormData from "form-data";
// import axios from "axios";
// import userModel from "../models/userModel.js";

// export const generateImage = async (req, res) => {
//     try {

//         const { userId, prompt } = req.body;
//         const user = await userModel.findById(userId);
//         if (!user || !prompt) {
//             return res.status(400).json({ success: false, message: "missing details" });
//         }
//         if (user.creditBalance <= 0) {
//             return res.status(403).json({ success: false, message: "Insufficient credits", creditBalance: user.creditBalance });
//         }

//         const formData = new FormData();
//         formData.append("prompt", prompt);
//         const {data} = await axios.post('https://clipdrop-api.co/cleanup/v1', formData, {
//             headers: {
//                 'x-api-key': process.env.CLIPDROP_API,
//             },
//             responseType: 'arraybuffer'
//         })

//         const base64Image = Buffer.from(data, 'binary').toString('base64');
         
//         const resultImage = `data:image/png;base64,${base64Image}`;

//         // Deduct user credits
//        await userModel.findByIdAndUpdate(user._id, { creditBalance: -1 });
//        res.status(200).json({ success: true, message: "Image generated successfully", image: resultImage, creditBalance: user.creditBalance - 1 });

//     }
//     catch (error) {
//         console.error("Error in generateImage:", error);
//         res.status(500).json({ success: false, message: "Server Error" });
//     }

// }

import axios from "axios";
import FormData from "form-data";
import userModel from "../models/userModel.js";

export const generateImage = async (req, res) => {
    try {
        
        const userId = req.user?.id;
        const { prompt } = req.body;
        
        // Validate input
        if (!userId || !prompt) {
            return res.status(400).json({ success: false, message: "Missing details" });
        }

        // Fetch user
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Check credit balance
        if (user.creditBalance <= 0) {
            return res.status(403).json({
                success: false,
                message: "Insufficient credits",
                creditBalance: user.creditBalance
            });
        }

        // Prepare form data for Clipdrop's text-to-image endpoint
        const formData = new FormData();
        formData.append("prompt", prompt);

        const { data } = await axios.post("https://clipdrop-api.co/text-to-image/v1", formData, {
            headers: {
                ...formData.getHeaders(),
                "x-api-key": process.env.CLIPDROP_API
            },
            responseType: "arraybuffer"
        });

        const base64Image = Buffer.from(data, "binary").toString("base64");
        const resultImage = `data:image/png;base64,${base64Image}`;

        // Deduct one credit
        await userModel.findByIdAndUpdate(user._id, { $inc: { creditBalance: -1 } });

        res.status(200).json({
            success: true,
            message: "Image generated successfully",
            image: resultImage,
            creditBalance: user.creditBalance - 1
        });
    } catch (error) {
        console.error("Error in generateImage:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
