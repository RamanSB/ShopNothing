import { useEffect, useState, useContext } from 'react';
import { LoadingSpinner } from '../components/LoadingSpinner';
import PaymentService from '../api/PaymentService';
import { GlobalAppStateContext } from '../contexts/GlobalAppStateContext';


const CheckoutPage = () => {
    
    const [loading, isLoading] = useState(true);
    const { globalState } = useContext(GlobalAppStateContext);

    useEffect(() => {
        (async function(){
            try {
                localStorage.setItem('globalState', JSON.stringify(globalState));
                let res = await PaymentService.makePayment(globalState.lineItems);
                console.log(`Response: ${JSON.stringify(res)}`);
                isLoading(false);
                window.location = res?.data.url;
            } catch (err) {
                console.log(`Error: ${JSON.stringify(err)}`);
            }
        })();
    }, [globalState]);

    if (loading) {
        return <LoadingSpinner></LoadingSpinner>
    } else {
        return (
            <>
                
            </>
        );
    }
};

export default CheckoutPage;