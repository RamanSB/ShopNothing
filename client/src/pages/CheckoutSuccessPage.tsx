import React, { useEffect } from 'react';
import ProductService from '../api/ProductService';
import { GlobalAppStateContext } from '../contexts/GlobalAppStateContext';
import { StripePaymentItemFormat } from '../types/StripePaymentItemFormat';


const CheckoutSuccessPage = () => {

    const {globalState,setGlobalState} = React.useContext(GlobalAppStateContext);
    
    useEffect(() => {
        let globalStateString : string | null = localStorage.getItem('globalState');
        if (globalStateString) {
            setGlobalState(JSON.parse(globalStateString));
        }
        return () => {
            console.log(`Clean up function invoked on component will unmount.`);
            setGlobalState((prevGlobalState: any) => ({...prevGlobalState, basket: []}));
        }
    }, []);

    let lineItems : Array<any> = globalState?.lineItems;
    (async function () {
        await ProductService.storePurchasedProducts(lineItems, new Date());
    })();
    return (
        <>
        <div id="checkout-success-container">
            <h1 className="confirmation-heading">Order Confirmation</h1>
            <p>Payment successful</p>
            <p>Thank you for your order.</p>
            <p>You will receive nothing.</p>
            <p>Thank you for your order</p>
            <ul id="item-summary-list">
                {lineItems?.length !== 0 ? (
                    lineItems?.map((lineItem: StripePaymentItemFormat, idx: number) => {
                        return (
                            <li key={idx}>{lineItem['quantity']} x {lineItem['price_data']['product_data']['name']}</li>
                        );
                })) : <></>}
            </ul>
        </div>
        <p id="thank-you-msg">Thank you for shopping with Nothing.</p>
    </>
    );
}

export default CheckoutSuccessPage;