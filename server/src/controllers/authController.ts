import { Request, Response } from "express";
import User from '../models/User';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

const signUpUser = async (req: Request, res: Response) => {
    try {
        let user = req.body;
        let hash;
        let userFound = await User.find({ email: user.email.trim() });
        if (!userFound.length) {
            const salt = await bcrypt.genSalt(10);
            hash = await bcrypt.hash(req.body.password, salt);
            req.body.password = hash;
            const newUser = new User(req.body);
            await newUser.save();
            return res.status(201).json({ ...newUser });
        } else {
            return res.status(409).json({
                error: `Unable to create user. ${user.email} already exists.`
            });
        }
    } catch (err) {
        console.log(`An error occurred during sign-up: ${err}`);
        return res.send(404).json({
            error: `An error occurred during sign-up: ${err}`
        });
    }
}

const signInUser = async (req: Request, res: Response) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        // Check if the user exists
        if (!user) {
            return res.status(404).send(`No account exists for user: ${user.email}`);
        }
        // Check if password is correct
        const isPasswordValid: boolean = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send("Invalid password");
        }
        // If password is correct and account exists, generate JWT to return back to client (which will be used to authorize subsequent requests).
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET_KEY);
        res.cookie('jsonwebtoken', token, {
            maxAge: Date.now() + 86.4E6 / 96,
            httpOnly: true,
            sameSite: 'none',
            secure: true
        });
        return res.status(200).send(token);
    } catch (err) {
        console.log(`An error occurred during sign-in: ${err}`);
        return res.send(404).json({
            error: `An error occurred during sign-in: ${err}`
        });
    }
}

const signOutUser = async (req: Request, res: Response) => {
    console.log(`[Server] Signing out user...`);
    return res.clearCookie('jsonwebtoken').status(200).json({message: "Successfully signed out."});
}

const mockProtectedRouteExhibition = (req: Request, res: Response) => {
    if (!req.cookies.jsonwebtoken) {
        return res.status(401).send("Cookie is not present, user is unauthorized");
    } else {
        console.log(`Nice cookie`);
    }
}

export default { signUpUser, signInUser, signOutUser, mockProtectedRouteExhibition }