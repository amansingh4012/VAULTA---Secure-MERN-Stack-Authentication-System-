import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    
    if (!mongoUri) {
      console.error("MONGO_URI environment variable is not set!");
      process.exit(1);
    }

    await mongoose.connect(mongoUri, {
      dbName: "MERNAuthentication",
    });

    console.log("MongoDb connected successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDb;
