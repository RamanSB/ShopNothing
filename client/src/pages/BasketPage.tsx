import React from "react";
import { GlobalAppStateContext } from "../contexts/GlobalAppStateContext";
import { useNavigate } from "react-router-dom";
import staticProductData from '../static-data/product-data.json';
import { QuantityButton } from "../components/QuantityButton";
import { Link } from "react-router-dom";


/**
 * If the global app state context has an empty map for baskets, we will render, "Your basket is empty, click here to add some products". Otherwise
 * render a grid that has columns:
 * - Product/Image
 * - Quantity
 * - Price
 */


const BasketPage = (props: any) => {

    const {globalState } = React.useContext(GlobalAppStateContext);
    console.log(`Basket: ${JSON.stringify(globalState.basket)}`)
    return (
        <div id="basket-page">
            {JSON.stringify(globalState.basket) === "{}" ? 
            (<div className="empty-basket-container">
                <p>Your basket is empty.<br/> Click <Link to="/shop">here</Link> to add some products.</p>
            </div>) : <BasketGrid/>}  
        </div>
    );
}

const BasketGrid = (props: any) => {
    const {globalState} = React.useContext(GlobalAppStateContext);
    let basketItems = globalState.basket;
    let grandTotal = 0;
    for (let itemName in basketItems) {
        grandTotal += basketItems[itemName] * staticProductData.products.filter(data => data.name === itemName)[0].price
    }
    return (
        <>
            <h2 style={{marginTop: "96px", alignSelf: "center", fontFamily: "Montserrat", letterSpacing: "0.08em", fontSize: "4rem", color: "white"}}>My Basket</h2>
            <div id="basket-grid">
                <h1>Product</h1>
                <h1>Description</h1>
                <h1>Quantity</h1>
                <h1 style={{justifySelf: "center"}}>Price</h1>
                {Object.keys(basketItems).map((itemName, idx) => {
                    let productData = staticProductData.products.filter(data => data.name === itemName)[0];
                    return (
                        basketItems[itemName] !== 0 ? 
                        <>
                            <img alt="Unavailable" width="200" src={productData['imgSrc']}/>
                            <p style={{alignSelf: "center"}}>{productData['description']}</p>
                            <div className="quantity-column">
                                <QuantityButton type="decrement" productName={productData['name']}><i className="fas fa-minus-circle fa-2x"></i></QuantityButton>
                                <p style={{justifySelf: "center", margin: "0 12px 0 12px"}}>{basketItems[itemName]}</p>
                                <QuantityButton type="increment" productName={productData['name']}><i className="fas fa-plus-circle fa-2x"></i></QuantityButton>
                            </div>
                            <p style={{justifySelf: "center", alignSelf: "center"}}>{productData['price']}</p>
                        </> : <></>
                    );
                })}
                <p></p>
                <p></p>
                <h2 style={{textDecoration: "none"}}>Grand Total</h2>
                <h2 style={{justifySelf: "center"}}>£{grandTotal}</h2>
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