import mongoose from 'mongoose';


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imgSrc: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    collectionName: {
        type: String,
        required: true
    }
})  

const Product = mongoose.model('Product', productSchema);
export default Product;