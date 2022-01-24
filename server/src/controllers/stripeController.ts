import express, { Request, Response } from 'express';
import dotenv, { DotenvConfigOutput} from 'dotenv';

dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY_PROD);
let envConfig : DotenvConfigOutput = dotenv.config();

const getStripePublisherKey = (req: Request, res: Response) => {
    if (process.env.ENV === 'development') {
        return res.status(200).send(process.env.STRIPE_PUBLISHER_KEY_DEV);
    } else if(process.env.ENV === 'production') {
        return res.status(200).send(process.env.STRIPE_PUBLISHER_KEY_PROD);
    } else {
        console.log(`Env not recognized: ${process.env.ENV}`);
    }
}


const createCheckoutSession = async (req: Request, res: Response) => {
    try {
        console.log(`Headers: ${JSON.stringify(req.headers)}`);
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [...req.body],
            success_url: `${process.env.SERVER_URL}/checkout/success`,
            cancel_url: `${process.env.SERVER_URL}/checkout/cancel`
        });
        res.json({url : session.url});
    } catch (err) {
        console.log(`An error occurred: ${JSON.stringify(err)}`);
    }
}

export default { getStripePublisherKey, createCheckoutSession };