import express from 'express';
import stripeController from '../controllers/stripeController';
import authController from '../controllers/authController';
import productController from '../controllers/productController';

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

router.route('/signout')
    .get(authController.signOutUser);

router.route('/protected')
    .get(authController.mockProtectedRouteExhibition);

router.route('/products')
    .get(productController.getAllProducts);
    
export default router;