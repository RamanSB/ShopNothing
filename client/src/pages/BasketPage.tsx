import React from "react";
import { GlobalAppStateContext } from "../contexts/GlobalAppStateContext";
import goldenNuggetImage from "../assets/images/gold-nugget.jpeg";
import { useNavigate } from "react-router-dom";


/**
 * If the global app state context has an empty map for baskets, we will render, "Your basket is empty, click here to add some products". Otherwise
 * render a grid that has columns:
 * - Product/Image
 * - Quantity
 * - Price
 */


const BasketPage = (props: any) => {

    const {globalState } = React.useContext(GlobalAppStateContext);
    const basketPageStyle = {
        width: "100%",
        height: "100%"
    }
    
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
    const {globalState} = React.useContext(GlobalAppStateContext);
    let basketItems = globalState.basket;
    return (
        <>
            <h2 style={{marginTop: "96px", alignSelf: "center", fontFamily: "Montserrat", letterSpacing: "0.08em", fontSize: "4rem", color: "white"}}>My Basket</h2>
            <div id="basket-grid">
                <h1>Product</h1>
                <h1>Description</h1>
                <h1>Quantity</h1>
                <h1>Price</h1>
                {Object.keys(basketItems).map((itemName, idx) => {
                    return (
                        <>
                            <img alt="" width="200" src={goldenNuggetImage}/>
                            <p>{basketItems['description']}</p>
                            <p style={{justifySelf: "center"}}>{basketItems[itemName]}</p>
                            <p style={{justifySelf: "center"}}>{basketItems['price']}</p>
                        </>
                    );
                })}
                <p></p>
                <p></p>
                <h2 style={{textDecoration: "none"}}>Grand Total</h2>
                <h2>£2002</h2>
                <CheckoutButton>Checkout</CheckoutButton>
            </div>
        </>
        );
}

const CheckoutButton = (props: any) => {
    const checkoutButtonStyle = {
        gridColumnStart: 1,
        gridColumnEnd: 5,
        padding: "24px",
        fontSize: "1.25em",
        fontFamily: "Montserrat",
        color: "white",
        backgroundColor: "transparent",
        border: "2px solid white",
        boxShadow: "4px 4px 0px 0px #011627",
        letterSpacing: "0.08em",
        animationName: "animate-shop-button",
        animationDuration: "1s",
        animationIterationCount: "infinite",
        animationDirection: "alternate",
        cursor: "pointer"
    }
    let navigate = useNavigate();
    return (<button style={checkoutButtonStyle} onClick={() => navigate('/checkout')}>{props.children}</button>)
}


export default BasketPage;