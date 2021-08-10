import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

const productData = [
    {

        name: 'Nike Slim Shirt',
        category: 'Shirts',
        image: 'https://picsum.photos/200',
        price: 120,
        countInStock: 10,
        brand: 'Nike',
        rating: 4.5,
        numReviews: 10,
        description: 'high quality product',
    },
    {

        name: 'Adidas Fit Shirt',
        category: 'Shirts',
        image: 'https://picsum.photos/200',
        price: 100,
        countInStock: 20,
        brand: 'Adidas',
        rating: 4.0,
        numReviews: 10,
        description: 'high quality product',
    },
    {

        name: 'Lacoste Free Shirt',
        category: 'Shirts',
        image: 'https://picsum.photos/200',
        price: 220,
        countInStock: 0,
        brand: 'Lacoste',
        rating: 4.8,
        numReviews: 17,
        description: 'high quality product',
    },
    {

        name: 'Nike Slim Pant',
        category: 'Pants',
        image: 'https://picsum.photos/200',
        price: 78,
        countInStock: 15,
        brand: 'Nike',
        rating: 4.5,
        numReviews: 14,
        description: 'high quality product',
    },
    {

        name: 'Puma Slim Pant',
        category: 'Pants',
        image: 'https://picsum.photos/200',
        price: 65,
        countInStock: 5,
        brand: 'Puma',
        rating: 4.5,
        numReviews: 10,
        description: 'high quality product',
    },
    {

        name: 'Adidas Fit Pant',
        category: 'Pants',
        image: 'https://picsum.photos/200',
        price: 139,
        countInStock: 12,
        brand: 'Adidas',
        rating: 4.5,
        numReviews: 15,
        description: 'high quality product',
    },
];
const productRouter = express.Router();

productRouter.get('/', expressAsyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.send(products);
}));

productRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    await Product.remove({});
    const createProducts = await Product.insertMany(productData);
    res.send({ createProducts })
}))


productRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: "Product not Found" })
    }
}))
export default productRouter;