import mongoose,{ Schema, model } from "mongoose";

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    urls:[{
        type: mongoose.Types.ObjectId,
        ref: "urls",
    }]
})


export const userModel = model("users", UserSchema);