
import { validationResult } from "express-validator";
import { createUser, findUser } from "../services/userServices.js";
import jwt from 'jsonwebtoken'

export const signUpController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await createUser(req.body);
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        return res.status(200).json({ user, token })
    } catch (error) {
        return res.status(400).json({ error });
    }
}
export const signInController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await findUser(req.body);
        if (user) {
            delete user._doc.password;
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            return res.status(200).json({ user, token })
        }
        return res.status(400).json("Invalid credentials!!");
    } catch (error) {
        return res.status(400).json({ error });
    }
}

export const ProfileController = async (req, res) => {
    res.status(200).json({ user: req.user })
}