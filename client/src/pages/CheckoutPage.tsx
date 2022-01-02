import {CardElement} from '@stripe/react-stripe-js';    
import axios from 'axios';
import { useEffect, useState } from 'react';

const CheckoutPage = () => {
    
    const [loading, isLoading] = useState(true);

    useEffect(() => {
        (async function(){
            try {
                let res = await axios.post("http://localhost:6942/create-checkout-session");
                console.log(`Response: ${JSON.stringify(res)}`);
                isLoading(false);
                window.location = res.data.url;
            } catch (err) {
                console.log(`Error: ${JSON.stringify(err)}`);
            }
        })();
        
    }, []);

    if (loading) {
        return <Spinner/>
    } else {
        return (
            <>
                
            </>
        );
    }
};


function Spinner() {
    return (
        <div id="spinner">
            <i className="fas fa-mortar-pestle scale"></i>          
        </div>
    )
}


export default CheckoutPage;