import axios from 'axios';
import { StripePaymentItemFormat } from '../types/StripePaymentItemFormat';

const makePayment = async (itemPaymentData: Array<StripePaymentItemFormat>) => {
    try {
        let res = await axios.post("https://nothing-commerce.herokuapp.com/create-checkout-session", itemPaymentData, {withCredentials: true});
        return res;
    } catch (err) {
        console.log(`An error occurred whilst making the payment: ${JSON.stringify(err)}`);
    }
}

const PaymentService = {makePayment}

export default PaymentService;


