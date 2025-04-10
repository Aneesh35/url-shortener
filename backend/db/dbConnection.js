import mongoose from "mongoose";

export const connectDatabase = async () => {
    try {
        const result = await mongoose.connect(`${process.env.MongoDbUri}`);
        console.log("mongoDb connection Success!!");
    }
    catch (error) {
        console.log("mongoDb connection failed!!");
    }
}