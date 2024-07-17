const products = require('../models/productModel')

//  get all products
exports.getAllProductsController = async(req,res)=>{
    console.log("inside getAllproductsController");
    try {
        const allProducts = await products.find()
        res.status(200).json(allProducts)
    } catch (err) {
        res.status(401).json(err)
    }
}

// view single product
exports.getAProductController = async(req,res)=>{
    console.log("inside getAProductController");
    const {id} = req.params
    try {
        const singleProduct = await products.findOne({id})
        res.status(200).json(singleProduct)
    } catch (err) {
        res.status(401).json(err)
    }
}