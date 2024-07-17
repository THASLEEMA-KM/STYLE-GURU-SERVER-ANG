const cartItems = require('../models/cartModel')

// add to cart
exports.addToCart = async(req,res)=>{
    const {id,title,image,price,quantity} = req.body
    const userId = req.payload
    try {
        const existingProduct = await cartItems.findOne({id,userId})
        if(existingProduct){
            existingProduct.quantity +=1
            existingProduct.totalPrice = existingProduct.quantity * existingProduct.price
            await existingProduct.save()
            res.status(200).json("items Added to your Cart")
        }else{
            const newProduct = new cartItems({
                id,title,price,image,quantity,totalPrice:price,userId
            })
            await newProduct.save()
            res.status(200).json("Item Added to your Cart")
        }
    } catch (error) {
        res.status(401).json(error)
    }
}
// get cart
exports.getCart = async(req,res)=>{
    const userId = req.payload
    try {
        const allProducts = await cartItems.find({userId})
        res.status(200).json(allProducts)
    } catch (error) {
        res.status(401).json(error)
    }
}

// remove cart
exports.removeCart = async(req,res)=>{
    const {id} = req.params
    try {
        const removeItem = await cartItems.findByIdAndDelete({_id:id})
        res.status(200).json(removeItem)
    } catch (error) {
        res.status(401).json(error)
    }
}

// empty cart
exports.emptyCart = async(req,res)=>{
    const userId = req.payload
    try {
        const result = await cartItems.deleteMany({userId})
        res.status(200).json("All Items Removed from your cart")
    } catch (error) {
        res.status(401).json(error)
    }
}
// increment
exports.incrementCart = async(req,res)=>{
    const {id} = req.params
    try {
        const selectedProduct = await cartItems.findOne({_id:id})
        selectedProduct.quantity += 1
        selectedProduct.totalPrice = selectedProduct.quantity * selectedProduct.price
        await selectedProduct.save()
        res.status(200).json(selectedProduct)

    } catch (error) {
        res.status(401).json(error)
    }
}
// decrement
exports.decrementCart = async(req,res)=>{
    const {id} = req.params
    try {
        const selectedProduct = await cartItems.findOne({_id:id})
        selectedProduct.quantity -= 1
       if(selectedProduct.quantity==0){
            await cartItems.deleteOne({_id:id})
            res.status(200).json("Item removed")
       }else{
        selectedProduct.totalPrice = selectedProduct.quantity * selectedProduct.price
        await selectedProduct.save()
        res.status(200).json(selectedProduct)
       }

    } catch (error) {
        res.status(401).json(error)
    }
}