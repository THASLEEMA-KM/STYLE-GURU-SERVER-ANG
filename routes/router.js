const express = require('express')
const productController = require('../controllers/productController')
const userController = require('../controllers/userController')
const jwtmiddleware = require('../middlewares/jwtmiddleware')
const wishlistController = require('../controllers/wishlistController')
const cartController = require('../controllers/cartController')

const router = new express.Router()

router.get('/allProducts',productController.getAllProductsController)

router.get('/:id/view',productController.getAProductController)

// register
router.post('/register',userController.registerController)

// login
router.post('/login',userController.loginController)

// add to wishlist
router.post('/addToWishlist',jwtmiddleware,wishlistController.addtoWishlist)

// getwishlist
router.get('/getWishlist',jwtmiddleware,wishlistController.getWishlist)

// removewishlist 
router.delete('/wishlist/:id/remove',jwtmiddleware,wishlistController.removeWishlist)

// addto cart
router.post('/addToCart',jwtmiddleware,cartController.addToCart)

// get cart
router.get('/getCart',jwtmiddleware,cartController.getCart)

// remove cart
router.delete('/cart/:id/remove',jwtmiddleware,cartController.removeCart)

// increment Cart
router.get('/cart/:id/increment',jwtmiddleware,cartController.incrementCart)

// decrement Cart
router.get('/cart/:id/decrement',jwtmiddleware,cartController.decrementCart)

// empty Cart
router.delete('/emptyCart',jwtmiddleware,cartController.emptyCart)


module.exports = router