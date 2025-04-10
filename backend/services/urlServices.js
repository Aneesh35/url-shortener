import { urlModel } from "../model/urls.model.js";
import { nanoid } from "nanoid";
import { userModel } from "../model/user.model.js";

export const createShortUrl = async ({ originalUrl,userId}) => {
    if (!originalUrl) {
        throw new Error("URL required!!");
    }
    try{
        const shortUrl = nanoid(8);
        const shortUrlId=await urlModel.create({originalUrl,shortUrl,userId});
        const  user=await userModel.findById(userId);
        user.urls.push(shortUrlId._id);
        await user.save();
        return {shortUrl};
    }
    catch(error){
        throw new Error(error)
    }
}