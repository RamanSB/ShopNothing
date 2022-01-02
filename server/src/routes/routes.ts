import express from 'express';
import stripeController from '../controllers/stripeController';
import authController from '../controllers/authController';

const router = express.Router();

router.route('/stripe-config')
    .get(stripeController.getStripePublisherKey);

router.route('/create-payment-intent')
    .post(stripeController.generatePaymentIntent)

router.route('/create-checkout-session')
    .post(stripeController.createCheckoutSession);

router.route('/signup')
    .post(authController.signUpUser)

router.route('/signin')
    .post(authController.signInUser);

export default router;