const router = require('express').Router();
const productController = require('../controllers/productController')

router.post('/create', productController.createProduct)

//fetch all product
router.get('/get_all_products', productController.getAllProducts)

module.exports = router