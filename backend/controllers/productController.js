const path = require("path")
const productModel = require('../models/productModel');

const createProduct = async (req, res) => {
    //check incoming data
    console.log(req.body)
    console.log(req.files);

    //Destructurni the body data (Jason)
    const { productName,
        productPrice,
        productCategory,
        productDescription
    } = req.body;

    //Validation 
    if (!productName || !productPrice || !productCategory || !productDescription)
        return res.status(400).json({
            "success": false,
            "message": "Please enter all fields"
        })

    //validation if there is image
    if (!req.files || !req.files.productImage) {
        return res.status(400).json({
            "success": false,
            "message": "Please enter all fields"
        })
    }
    const { productImage } = req.files;

    //**upload Image**
    //1. Generate new image name (abc.png) -> (2131231-abc.png)
    const imageName = `${Date.now()}-${productImage.name}`;

    //2. Make a upload path (/path/upload - directory)
    const imageUploadPath = path.join(__dirname, `../public/products/${imageName}`)


    //3. Move to that directory (await, try-catch)
    try {
        await productImage.mv(imageUploadPath)

        //save to database
        const newProduct = new productModel({
            productName: productName,
            productPrice: productPrice,
            productDescription: productDescription,
            productImage: imageName,
            productCatogory: productCategory
        })
        const product = await newProduct.save()
        res.status(201).json({
            "success": true,
            "message": "Product Created Successfully!",
            "data": product
        })

    } catch (error) {
        console.log(error)
        res.json({
            "success": false,
            "message": "Internal Server Error!!",
            "error": error
        })
    }

}


//Fetch all product
const getAllProducts = async (req, res) => {

    //try catch
    try {
        const allProducts = await productModel.find({})
        res.status(201).json({
            "success": true,
            "message": "Product Fetched successfully!",
            "products": allProducts
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            "success": false,
            "message": "Internal server error",
            "error": error
        })
    }

    //fetch all products

    //send response
}




module.exports = {
    createProduct,
    getAllProducts
}