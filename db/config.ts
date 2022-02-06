import mongoose from "mongoose";
const dbConnection = async () => {
  try {
    console.log("Connecting to database...");
    await mongoose.connect(`${process.env.MONGODB_CNN}`);
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err);
    throw new Error("error connecting to database");
  }
};
export default dbConnection;
