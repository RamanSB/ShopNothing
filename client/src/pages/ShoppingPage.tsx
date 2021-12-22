import CollectionHeader from '../components/CollectionHeader';
import goldenNuggetProduct from '../assets/images/gold-nugget.jpeg';
import christmasGift from '../assets/images/christmas-gift.jpeg';
import iceCube from '../assets/images/product-ice-cube.jpeg';
import platinumIngot from '../assets/images/platinum-showdown.jpeg';
import goldTap from '../assets/images/fohen-gold-product.jpeg';
import metalPipe from "../assets/images/metal-pipe-products.jpeg";
import ikeaSofa from "../assets/images/ikea-sofa.jpeg";
import ProductCard from "../components/ProductCard";

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
                    <ProductCard 
                        price={420} 
                        productName="Golden Nugget"
                        imgSrc={goldenNuggetProduct}
                        description="Nature’s first green is gold,
                        Her hardest hue to hold.
                        Her early leaf’s a flower;
                        But only so an hour.
                        Then leaf subsides to leaf.
                        So Eden sank to grief,
                        So dawn goes down to day.
                        Nothing gold can stay." />
                    <ProductCard 
                        price={999} 
                        productName="Platinum Bars"
                        imgSrc={platinumIngot}
                        description="Nature’s first green is gold,
                        Her hardest hue to hold.
                        Her early leaf’s a flower;
                        But only so an hour.
                        Then leaf subsides to leaf.
                        So Eden sank to grief,
                        So dawn goes down to day.
                        Nothing gold can stay." />
                </div>
           
            <div>
                <div style={{minWidth: "20%", border: "1px solid white", margin: "0 0 0 0"}}></div>
                <div style={{minWidth: "40%", border: "1px solid darkgray", margin: "24px 0 0 0"}}></div>
                <div style={{minWidth: "60%", border: "1px solid white", margin: "24px 0 0 0"}}></div>
                <div style={{minWidth: "80%", border: "1px solid darkgray", margin: "24px 0 48px 0"}}></div>
            </div>            

            <CollectionHeader>Standard Collection</CollectionHeader>
            <div className="product-collection-container">
            <ProductCard 
                price={350} 
                productName="Empty Sofa"
                imgSrc={ikeaSofa}
                description="Nature’s first green is gold,
                Her hardest hue to hold.
                Her early leaf’s a flower;
                But only so an hour.
                Then leaf subsides to leaf.
                So Eden sank to grief,
                So dawn goes down to day.
                Nothing gold can stay." />
            <ProductCard 
                price={239} 
                productName="Gold Tap"
                imgSrc={goldTap}
                description="Nature’s first green is gold,
                Her hardest hue to hold.
                Her early leaf’s a flower;
                But only so an hour.
                Then leaf subsides to leaf.
                So Eden sank to grief,
                So dawn goes down to day.
                Nothing gold can stay." />
            <ProductCard 
                price={129} 
                productName="Metal Pipe"
                imgSrc={metalPipe}
                description="Nature’s first green is gold,
                Her hardest hue to hold.
                Her early leaf’s a flower;
                But only so an hour.
                Then leaf subsides to leaf.
                So Eden sank to grief,
                So dawn goes down to day.
                Nothing gold can stay." />
            </div>
            <div>
                <div style={{minWidth: "20%", border: "1px solid white", margin: "0 0 0 0"}}></div>
                <div style={{minWidth: "40%", border: "1px solid darkgray", margin: "24px 0 0 0"}}></div>
                <div style={{minWidth: "60%", border: "1px solid white", margin: "24px 0 0 0"}}></div>
                <div style={{minWidth: "80%", border: "1px solid darkgray", margin: "24px 0 48px 0"}}></div>
            </div>
            <CollectionHeader>Common Collection</CollectionHeader>
            <div className="product-collection-container">
                <ProductCard 
                    price={25} 
                    productName="Melted Ice"
                    imgSrc={iceCube}
                    description="Nature’s first green is gold,
                    Her hardest hue to hold.
                    Her early leaf’s a flower;
                    But only so an hour.
                    Then leaf subsides to leaf.
                    So Eden sank to grief,
                    So dawn goes down to day.
                    Nothing gold can stay." />

                <ProductCard 
                    price={55} 
                    productName="Empty Present"
                    imgSrc={christmasGift}
                    description="Nature’s first green is gold,
                    Her hardest hue to hold.
                    Her early leaf’s a flower;
                    But only so an hour.
                    Then leaf subsides to leaf.
                    So Eden sank to grief,
                    So dawn goes down to day.
                    Nothing gold can stay." />
            </div>
        </>
    );
}

export default ShoppingPage;



