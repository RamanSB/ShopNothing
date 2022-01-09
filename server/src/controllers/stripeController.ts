import express, { Request, Response } from 'express';
import dotenv, { DotenvConfigOutput} from 'dotenv';

dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY_DEV);
let envConfig : DotenvConfigOutput = dotenv.config();

const getStripePublisherKey = (req: Request, res: Response) => {
    if (process.env.ENV === 'DEV') {
        return res.status(200).send(process.env.STRIPE_PUBLISHER_KEY_DEV);
    } else if(process.env.ENV === 'PROD') {
        return res.status(200).send(process.env.STRIPE_PUBLISHER_KEY_PROD);
    } else {
        console.log(`Env not recognized: ${process.env.ENV}`);
    }
}

const generatePaymentIntent = async (req: Request, res: Response) => {
    // request will contain information on items.
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 1241,
            currency: "gbp",
        });
        console.log(`Stripe: ${JSON.stringify(stripe)} || payment intents: ${paymentIntent}`);
        res.json({
            clientSecret: paymentIntent.client_secret
        });
    } catch (err) {
        console.log(`[Server] Error occurred within 'create-payment-intent: ${JSON.stringify(err)}`);
    }
}

const createCheckoutSession = async (req: Request, res: Response) => {
    try {
        console.log(`Request Body FROM SERVER: ${req.body}`);
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [
                {
                  "price_data": {
                    "currency": "gbp",
                    "product_data": {
                      "name": "Platinum Bars"
                    },
                    "unit_amount": 2500
                  },
                  "quantity": 2
                },
                {
                  "price_data": {
                    "currency": "gbp",
                    "product_data": {
                      "name": "Golden Nugget"
                    },
                    "unit_amount": 1500
                  },
                  "quantity": 1
                }
              ],
            success_url: `${process.env.SERVER_URL}/checkout/success`,
            cancel_url: `${process.env.SERVER_URL}/checkout/cancel`
        });
        res.json({url : session.url});
    } catch (err) {
        console.log(`An error occurred: ${JSON.stringify(err)}`);
    }
}

export default { getStripePublisherKey, generatePaymentIntent, createCheckoutSession };