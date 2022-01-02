import React from 'react';
import { GlobalAppStateContext } from '../contexts/GlobalAppStateContext';


const CheckoutSuccessPage = () => {

    const {globalState} = React.useContext(GlobalAppStateContext);
    const basketItems = globalState.basket;
    console.log(`GlobalState [CheckoutSuccessPage]: ${JSON.stringify(globalState)}`);
    
    return (
        <>
        <div id="checkout-success-container">
            <h1 className="confirmation-heading">Order Confirmation</h1>
            <p>Payment successful</p>
            <p>Thank you for your order</p>
            <ul id="item-summary-list">
                {Object.keys(basketItems).map((productName: string, idx: number) => {
                    return (
                        <li key={idx}>{basketItems[productName]} x {productName}</li>
                    )
                })}
            </ul>
            <p>Payment Total: {globalState.grandTotal}</p>
        </div>
        <p id="thank-you-msg">Thank you for shopping with Nothing.</p>
    </>
    );
}

export default CheckoutSuccessPage;