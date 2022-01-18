import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

function verifyJwt(req: Request, res: Response, next: Function) {
    const token: string = req.cookies.jsonwebtoken;
    if (!token) {
        return res.status(401).send("Access denied");
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.body.user = verified;
        next();
     } catch (err) {
         res.status(400).json({error: `Invalid token: ${JSON.stringify(err)}`});
     }
}

// async function checkUser(req: Request, res: Response, next: Function) {
//     const token = req.cookies.jsonwebtoken;
//     if (!token) {
//         return res.redirect('/signin');
//     }
//     try {
//         const verifiedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
//         console.log(`Verified User: ${JSON.stringify(verifiedUser)}`);
//         let user = await User.findById(verifiedUser._id);
//         next();
//     } catch (err) {
//         return res.redirect('/signin');
//     }
// }

export default { verifyJwt }