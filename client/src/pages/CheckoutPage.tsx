import {useStripe, useElements, CardElement } from '@stripe/react-stripe-js';    

const CheckoutPage = () => {
    
    return (
        <>
            <form>
                
                <CardElement/>
                <button>Submit</button>
                
            </form>
        </>
    )
};


export default CheckoutPage;