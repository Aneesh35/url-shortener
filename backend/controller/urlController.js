import { validationResult } from "express-validator";
import { createShortUrl } from "../services/urlServices.js";
import { urlModel } from "../model/urls.model.js";

export const createShortUrlController = async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        res.status(401).json({ error: "Invalid data format!!" });
    }
    try {
        const userId = req.user;
        const { originalUrl } = req.body;
        const {shortUrl} = await createShortUrl({ originalUrl, userId });
        console.log(shortUrl)
        return res.status(200).json({ shortUrl });
    }
    catch (error) {
        console.log(error)
        return res.status(401).json({ error });
    }
}

export const redirectController = async (req, res) => {
    try {
        const { redirectId } = req.params;
        const entry = await urlModel.findOne({ shortUrl: { $regex: `${redirectId}$` } });
        if (!entry) {
            return res.status(404).json({ message: 'Short URL not found' });
        }
        entry.clickCount += 1;
        await entry.save();
        return res.json({ originalUrl: entry.originalUrl });
    } catch (error) {
        return res.status(401).json({ error });
    }
};
