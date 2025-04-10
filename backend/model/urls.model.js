import mongoose,{ Schema, model } from 'mongoose';

const urlSchema = new Schema({
    originalUrl: {
        type: String,
        required: true,
    },
    shortUrl: {
        type: String,
        required: true,
        unique:true,
    },
    clickCount: {
        type: Number,
        default: 0,
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: "users",
    }
},
    { timestamps: true }
)
export const urlModel = model('urls', urlSchema);