import CollectionHeader from '../components/CollectionHeader';
import ProductCard from "../components/ProductCard";
import { useState, useLayoutEffect } from 'react';
import ProductService from '../api/ProductService';
import { Product } from '../types/Product';

const headingStyle = {
    fontFamily: "Montserrat",
    fontSize: "4em",
    color: "white",
    opacity: "0",
    letterSpacing: "0.075em",
    textShadow: "3px 3px #011627",
    animationName: "text-appear",
    animationDuration: "3s",
    animationDelay: "1s",
    animationIterationCount: "1",
    animationDirection: "normal",
    animationFillMode: "forwards",
    display: "inline"
}

const headingStyleWithDelay = {
    fontFamily: "Montserrat",
    fontSize: "5em",
    color: "white",
    opacity: "0",
    letterSpacing: "0.075em",
    textShadow: "3px 3px #011627",
    animationName: "text-appear",
    animationDelay: "2s",
    animationDuration: "3s",
    animationFillMode: "forwards",
    animationIterationCount: "1",
    animationDirection: "normal",
}

const dividerStyles = {
    opacity: "0",
    animationName: "text-appear",
    animationDelay: "0s",
    animationDuration: "0.5s",
    animationFillMode: "forwards",
    animationDirection: "normal",
    animationIterationCount: "1"
}

const ShoppingPage = () => {
    
    let [shoppingState, setShoppingState] = useState([]);

    useLayoutEffect(() => {
        (async function fetchData(){
            let response = await ProductService.getAllProducts();
            setShoppingState(response);
        })();
    }, []);
    

    return (
        <>
            <div style={{"margin": "96px 0 0 0"}}>
                <h1 style={headingStyle} className="align-center">BUY</h1>
                <h1 style={headingStyleWithDelay} className="align-center">NOTHING</h1>
            </div>

                <div style={Object.assign({minWidth: "20%", border: "1px solid white", margin: "0 0 0 0"}, dividerStyles, {animationDelay: "0.9s"})}></div>
                <div style={Object.assign({minWidth: "40%", border: "1px solid darkgray", margin: "24px 0 0 0"}, dividerStyles, {animationDelay: "0.6s"})}></div>
                <div style={Object.assign({minWidth: "60%", border: "1px solid white", margin: "24px 0 0 0"}, dividerStyles, {animationDelay: "0.3s"})}></div>
                <div style={Object.assign({minWidth: "80%", border: "1px solid darkgray", margin: "24px 0 48px 0"}, dividerStyles)}></div>
                <CollectionHeader>Luxury Collection</CollectionHeader>
                <div className="product-collection-container">
                {shoppingState
                        .filter((product: Product) => product.collectionName === 'Luxury')
                        .map((product: Product) => <ProductCard 
                                                        price={product.price} 
                                                        productName={product.name} 
                                                        imgSrc={product.imgSrc} 
                                                        description={product.description}/>)}
                    
                </div>
           
            <div>
                <div style={{minWidth: "20%", border: "1px solid white", margin: "0 0 0 0"}}></div>
                <div style={{minWidth: "40%", border: "1px solid darkgray", margin: "24px 0 0 0"}}></div>
                <div style={{minWidth: "60%", border: "1px solid white", margin: "24px 0 0 0"}}></div>
                <div style={{minWidth: "80%", border: "1px solid darkgray", margin: "24px 0 48px 0"}}></div>
            </div>            

            <CollectionHeader>Standard Collection</CollectionHeader>
            <div className="product-collection-container">
                {shoppingState
                    .filter((product: Product) => product.collectionName === 'Standard')
                    .map((product: Product) => <ProductCard 
                                                    price={product.price}
                                                    productName={product.name}
                                                    imgSrc={product.imgSrc}
                                                    description={product.description}/>)}
            </div>
            <div>
                <div style={{minWidth: "20%", border: "1px solid white", margin: "0 0 0 0"}}></div>
                <div style={{minWidth: "40%", border: "1px solid darkgray", margin: "24px 0 0 0"}}></div>
                <div style={{minWidth: "60%", border: "1px solid white", margin: "24px 0 0 0"}}></div>
                <div style={{minWidth: "80%", border: "1px solid darkgray", margin: "24px 0 48px 0"}}></div>
            </div>
            <CollectionHeader>Common Collection</CollectionHeader>
            <div className="product-collection-container">
                {shoppingState
                    .filter((product: Product) => product.collectionName === 'Common')
                    .map((product: Product) => <ProductCard 
                                                    price={product.price}
                                                    productName={product.name}
                                                    imgSrc={product.imgSrc}
                                                    description={product.description}/>)}
            </div>
        </>
    );
}

export default ShoppingPage;



