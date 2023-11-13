import mongoose from "mongoose";

let isConnected = false; // track the connection

const mongoDBUri = process.env.MONGODB_URI;

if (!mongoDBUri) {
  throw new Error("MongoDB details are not defined");
}

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(mongoDBUri, {
      dbName: "share_prompt",
    });

    isConnected = true;

    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
