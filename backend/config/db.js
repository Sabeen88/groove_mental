import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Attempting to connect to MongoDB...");
    const conn = await mongoose.connect(
      "mongodb+srv://sabindaspariyar:sabin123@fyp.hjd0j.mongodb.net/?retryWrites=true&w=majority&appName=FYP",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    console.log("Make sure your MongoDB URI is correct.");
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
