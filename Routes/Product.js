const Product =  require('../Models/productModels');
const mongoose = require ('mongoose')
const express = require('express')
// import data from '../data'

const fileUpload = require('../middleware/file-upload');
const router = express.Router();

//@get all products
router.get("/", async (req, res) => {

    try {
        const products = await Product.find({});
        if (products.length) {
            res.send(products);
        }
    } catch (error) {
        res.status(404).send({ message: "Product Not Found." });
    }
    // res.send(data.products);
});

//@get current porduct details
router.get("/:id", async (req, res) => {

    const product = await Product.findOne({ _id: req.params.id });
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ message: "Product Not Found." });
    }
});

//@create a new product
router.post("/", fileUpload.single('image'), async (req, res) => {

    const product = new Product({
        id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        brand: req.body.brand,
        category: req.body.category,
        inStock: req.body.inStock,
        description: req.body.description,
        rating: req.body.rating,
        review: req.body.review,
        image: (req.body.image) ? req.body.image : 'default-image.jpg'
    });

    const newProduct = await product.save();
    if (newProduct) {
        return res.status(201).send({ message: 'New Product Created', data: newProduct });
    }
    return res.status(500).send({ message: ' Error in Creating Product.' });
});

//@edit product
router.put("/:id", fileUpload.single('image'), async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
        product.name = req.body.name;
        product.price = req.body.price;
        product.image = (req.body.image) ? req.body.image : 'default-image.jpg';
        product.brand = req.body.brand;
        product.category = req.body.category;
        product.inStock = req.body.inStock;
        product.description = req.body.description;
        const updatedProduct = await product.save();
        if (updatedProduct) {
            return res.status(200).send({ message: 'Product Updated', data: updatedProduct });
        }
    }
    return res.status(500).send({ message: ' Error in Updating Product.' });

});

//@delete product by id
router.delete("/:id", async (req, res) => {
    try{
        // console.log('id -- ',req.params.id);
        await Product.findOneAndRemove({ _id: req.params.id });
        res.send({ msg: 'product Deleted!' });
    }
    catch {
        res.send("Error in Deletion.");
    }
});

module.exports = router;