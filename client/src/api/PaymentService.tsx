import axios from 'axios';
import { StripePaymentItemFormat } from '../types/StripePaymentItemFormat';

const makePayment = async (itemPaymentData: Array<StripePaymentItemFormat>) => {
    try {
        let res = await axios.post("/create-checkout-session", itemPaymentData, {withCredentials: true});
        console.log(`Response in PaymentService: ${JSON.stringify(res.data)}`)
        return res;
    } catch (err) {
        console.log(`An error occurred whilst making the payment: ${JSON.stringify(err)}`);
    }
}

export default { makePayment }


