import { urlModel } from "../model/urls.model.js";
import { nanoid } from "nanoid";

export const createShortUrl = async ({ originalUrl,user}) => {
    console.log(user);
    if (!originalUrl) {
        throw new Error("URL required!!");
    }
    const shortUrl = nanoid(8);
    const shortUrlId=await urlModel.create({originalUrl,shortUrl,user});
    return {shortUrl,shortUrlId};
}