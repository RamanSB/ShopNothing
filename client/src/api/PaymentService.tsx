import axios from 'axios';
import { StripePaymentItemFormat } from '../types/StripePaymentItemFormat';

const makePayment = async (itemPaymentData: Array<StripePaymentItemFormat>) => {
    try {
        let res = await axios.post("http://localhost:6942/create-checkout-session", itemPaymentData);
        console.log(`Response in PaymentService: ${JSON.stringify(res.data)}`)
        return res;
    } catch (err) {
        console.log(`An error occurred whilst making the payment: ${JSON.stringify(err)}`);
    }
}

export default { makePayment }


