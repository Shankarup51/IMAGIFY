import mongoose from "mongoose";

const connectToMongoDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
  });

await mongoose.connect(`${process.env.MONGODB_URI}/imagify`)
};

export default connectToMongoDB;