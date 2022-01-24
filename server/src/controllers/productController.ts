import { Request, Response } from 'express';
import Product from '../models/ProductData';
import OrderHistory from '../models/OrderHistory';
import User from '../models/User';

const getAllProducts = async (req: Request, res: Response) => {
    try {
        let products = await Product.find();
        console.log(`Products [Server]: ${JSON.stringify(products)}`);
        return res.status(200).json(products);
    } catch (err) {
        console.log(`An error occurred when attempting to fetch all products: ${err}`);
        return res.status(404).send("Could not find products");
    }
}

const storeOrderHistory = async (req: Request, res: Response) => {
    console.log(`ProductController: storeOrderHistory`);
    console.log(`Request Body: ${JSON.stringify(req.body)}`);
    const user = await User.findById(req.body.user._id);
    try {
        let email = user.email;
        let orderedAt = req.body.orderedAt;
        let products = req.body.products;
        let total : number = req.body.total;
        {/* console.log(`Email: ${email} | OrderedAt: ${orderedAt} | Products: ${JSON.stringify(products)} | Total: ${JSON.stringify(total)}}`); */}
        const orderHistory = new OrderHistory({
            email: email,
            [orderedAt]: orderedAt,
            orderedProducts: products,
            total: total
        });
        console.log(`About to persist the order history: ${JSON.stringify(orderHistory)}`);
        await orderHistory.save();
        return res.status(201).send("Order history successfully stored.");
    } catch (err) {
        console.log(`An error occurred when attempting to store order history: ${err}`);
        return res.status(404).send("Unable to store order history");
    }
}

export default { getAllProducts, storeOrderHistory }