import { Request, Response } from 'express';
import Product from '../models/ProductData';

const getAllProducts = async (req: Request, res: Response) => {
    try {
        let products = await Product.find();
        console.log(`Products: ${JSON.stringify(products)}`);
        return res.status(200).json(products);
    } catch (err) {
        console.log(`An error occurred when attempting to fetch all products: ${err}`);
        return res.status(404).send("Could not find products");
    }
}

export default { getAllProducts }