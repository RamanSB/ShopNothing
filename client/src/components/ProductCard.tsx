import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalAppStateContext } from "../contexts/GlobalAppStateContext";

type ProductType = {
    imgSrc: string,
    productName: string,
    price: number,
    description: string
}

const ProductCard = ({imgSrc, productName, price, description}: ProductType) => {
    let navigate = useNavigate();
    const [qty, setQty] = useState(0);
    const onIncrement = (e: React.MouseEvent<HTMLButtonElement>) => {
        setQty(qty+1);
    }
    const onDecrement = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (qty === 0) {
            return;
        }
        setQty(qty-1);
    }
    
    const { globalState, setGlobalState } = React.useContext(GlobalAppStateContext);
    const handleAddToBasket = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!globalState.isSignedIn) {
            navigate('/signin');
        }
        setGlobalState((prevState: any) => {
            if (qty !== 0) {
                let existingBasket = prevState.basket;
                setQty(0);
                if (Object.keys(existingBasket).includes(productName)) {
                    existingBasket[productName] += qty;
                    return {
                        ...prevState,
                        basket: existingBasket
                    }
                } else {
                    existingBasket[productName] = 1;
                    return {
                        ...prevState,
                        basket: existingBasket
                    }
                }
            } else {
                return prevState;
            }
        });
    }

    return (
    
        <div id="card">
            <img width="560" id="product-header" alt="" src={imgSrc}/>
            <div className="product-header">
                <h2>{productName}</h2>
                <h2>£{price}</h2>
            </div>
                
            <p>{description}</p>
            <div className="qty-buy">
                <div id="qty-container">
                    <button onClick={onDecrement}><i className="fas fa-minus"></i></button>
                    <span>{qty}</span>
                    <button onClick={onIncrement}><i className="fas fa-plus"></i></button>
                </div>
                <button onClick={handleAddToBasket} style={{backgroundColor: "transparent", borderColor: "none", border: "none"}}><p style={{fontFamily: "Montserrat", fontSize: "1.25em", color: "white"}}>ADD <i className="fas fa-shopping-cart"></i></p></button>
            </div>
        </div>
    )
}

export default ProductCard