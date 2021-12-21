import React, {useState} from 'react';

const ProductCard = ({imgSrc, productName, price, description}: any) => {
    
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

    const handleAddToBasket = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log(``);
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