import React from "react";
import { GlobalAppStateContext } from "../contexts/GlobalAppStateContext";


/**
 * If the global app state context has an empty map for baskets, we will render, "Your basket is empty, click here to add some products". Otherwise
 * render a grid that has columns:
 * - Product/Image
 * - Quantity
 * - Price
 */


const BasketPage = (props: any) => {

    const {globalState } = React.useContext(GlobalAppStateContext);
    
    return (
        <div id="basket-page">
            {Object.is(globalState.basket, {}) ? 
            <div>
                <p>Your basket is empty. Click here to add some products.</p>
            </div> : <BasketGrid/>}
            
        </div>
    );
}

const BasketGrid = (props: any) => {
    const {globalState, setGlobalState} = React.useContext(GlobalAppStateContext);
    let basketItems = globalState.basket;
    return (
        <div>
            {basketItems.map()}
        </div>
    )

}


export default BasketPage;