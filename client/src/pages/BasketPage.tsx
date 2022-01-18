import React, { useLayoutEffect } from "react";
import { GlobalAppStateContext } from "../contexts/GlobalAppStateContext";
import { useNavigate } from "react-router-dom";
import { QuantityButton } from "../components/QuantityButton";
import { Link } from "react-router-dom";
import ProductService from "../api/ProductService";
import { Product } from "../types/Product";
import { StripePaymentItemFormat } from "../types/StripePaymentItemFormat";


const BasketPage = (props: any) => {
    console.log(`BasketPage`);
    const { globalState } = React.useContext(GlobalAppStateContext);    
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
    let [basketState, setBasketState] : [any, Function] = React.useState([]);
    const {globalState} = React.useContext(GlobalAppStateContext);
    let basketItems = globalState.basket;
    
    useLayoutEffect(() => {
        (async function fetchData(){
            let response = await ProductService.getAllProducts();
            setBasketState(response);
        })();
    }, [basketItems]);

    let grandTotal = 0;
    for (let itemName in basketItems) {
        grandTotal += basketItems[itemName] * basketState.filter((data: Product) => data.name === itemName)[0]?.price
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
                    let productData: any = basketState.filter((product: Product) => product?.name === itemName)[0];
                    return (
                        basketItems[itemName] !== 0 ? 
                        <>
                            <img alt="Unavailable" width="200" src={productData?.imgSrc}/>
                            <p style={{alignSelf: "center"}}>{productData?.description}</p>
                            <div className="quantity-column">
                                <QuantityButton type="decrement" productName={productData?.name}><i className="fas fa-minus-circle fa-2x"></i></QuantityButton>
                                <p style={{justifySelf: "center", margin: "0 12px 0 12px"}}>{basketItems[itemName]}</p>
                                <QuantityButton type="increment" productName={productData?.name}><i className="fas fa-plus-circle fa-2x"></i></QuantityButton>
                            </div>
                            <p style={{justifySelf: "center", alignSelf: "center"}}>{productData?.price}</p>
                        </> : <></>
                    );
                })}
                <p></p>
                <p></p>
                <h2 style={{textDecoration: "none"}}>Grand Total</h2>
                <h2 style={{justifySelf: "center"}}>£{grandTotal}</h2>
                <CheckoutButton priceData={basketState}>Checkout</CheckoutButton>
            </div>
        </>
    );
}

const CheckoutButton = (props: any) => {
    const { globalState, setGlobalState } = React.useContext(GlobalAppStateContext);
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
    };

    let navigate = useNavigate();
    const priceData: Array<PriceData> = props.priceData.map((productData: any) : PriceData => {
        delete productData._id;
        delete productData.imgSrc;
        delete productData.collectionName
        delete productData.description
        return productData;
    });

    let basket = globalState.basket;
    const orderQtySet = new Set(Object.values(basket));
    let shouldDisableCheckoutButton : boolean = (orderQtySet.size === 1) && orderQtySet.values().next().value === 0;
    let lineItems : Array<StripePaymentItemFormat> = [];
    if (!shouldDisableCheckoutButton) {
        lineItems = constructLineItems(basket, priceData);
    }

    return (<button style={checkoutButtonStyle} disabled={shouldDisableCheckoutButton} onClick={() => { 
        setGlobalState((prevState: any) => ({...prevState, lineItems: lineItems}))
        navigate('/checkout')
        }}>
            {props.children}
        </button>)
}

function constructLineItems(basket: any, priceData: Array<PriceData>) : Array<StripePaymentItemFormat> {
    return Object.entries(basket).map((keyVal, idx) => {
        console.log(`Parameters: ${keyVal} | Idx: ${idx}`)
        return (
                {
                    price_data: {
                        currency: 'gbp',
                        product_data: {
                            name: keyVal[0]
                        },
                        unit_amount: priceData.filter(product => product.name === keyVal[0]).reduce((prevPrice, currentPrice) => currentPrice, {price: 0})?.price
                    },
                    quantity: Number(keyVal[1])
                }
            )}
        );
}

interface PriceData {
    name: string;
    price: number;
}


export default BasketPage;
