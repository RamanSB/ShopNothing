import axios from 'axios';
import { StripePaymentItemFormat } from '../types/StripePaymentItemFormat';

const makePayment = async (itemPaymentData: Array<StripePaymentItemFormat>) => {
    try {
        let res = await axios.post("/create-checkout-session", itemPaymentData, {
            headers: {
                "Authorization": `Bearer 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`
            }
        });
        return res;
    } catch (err) {
        console.log(`An error occurred whilst making the payment: ${JSON.stringify(err)}`);
    }
}

const PaymentService = {makePayment}

export default PaymentService;


