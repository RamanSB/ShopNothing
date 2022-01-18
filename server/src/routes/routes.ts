import express from 'express';
import stripeController from '../controllers/stripeController';
import authController from '../controllers/authController';
import productController from '../controllers/productController';
import authMiddleware from '../middleware/auth';

const router = express.Router();

router.route('/stripe-config')
    .get(stripeController.getStripePublisherKey);

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

router.route('/store-order-history')
    .post(authMiddleware.verifyJwt, productController.storeOrderHistory);
    
export default router;