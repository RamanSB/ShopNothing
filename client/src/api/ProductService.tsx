import axios from "axios"

const getAllProducts = async () => {
    try {
        let response = await axios.get("/products");
        return response.data
    } catch (err) {
        console.log(`An error occurred when fetching the products: ${err}.`);
    }
}

const storePurchasedProducts = async (lineItems: Array<any>, orderDate: Date) => {
    try {
        let orderedProducts = lineItems?.map(lineItem => {
            return ({
                productName: lineItem['price_data']['product_data']['name'],
                quantity: lineItem['quantity']
        })});
        
        let totalPrice = lineItems.length > 1 ? lineItems.reduce((l1, l2) => {
            if (Object.keys(l1).length === 0) {
                return l1 + (l2['price_data']['unit_amount'] * l2['quantity'])
            } else {
                return (l1['price_data']['unit_amount'] * l1['quantity'] + l2['price_data']['unit_amount'] * l2['quantity'])
            }
        }) : lineItems[0]['price_data']['unit_amount'] * lineItems[0]['quantity'];

        await axios.post("/store-order-history", {
            orderedAt: orderDate,
            products: orderedProducts,
            total: totalPrice
        }, {withCredentials: true});
    } catch (err) {
        console.log(`An error occurred when persisting the order history: ${err}`);
    }
}

const ProductService = { getAllProducts, storePurchasedProducts };

export default ProductService;