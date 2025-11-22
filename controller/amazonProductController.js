const productlist = require("../models/amazonproduct")
const cartlists = require("../models/amazonCartModel")

exports.productController = async (req, res) => {
    try {
        //console.log("hai")
        const newproductlist = await productlist.find()
        console.log(newproductlist)
        res.status(200).json(newproductlist)

    } catch (error) {
        res.status(500).json(error)
    }

}

//add to cart

exports.cartController = async (req, res) => {
    try {
        console.log("hai")
        console.log(req.body)
        const { _id, name, brand, description, image, price, rating, category, reviews, pid } = req.body.data
        const { email } = req.body
        console.log(_id, name, brand, description, image, price, rating, category, reviews, pid, email)
        // Check if same product already exists for this email
        const alreadyAdded = await cartlists.findOne({ email, pid })
        console.log(alreadyAdded)
        if (alreadyAdded) {
            return res.status(400).json("Already Added to cart") // <-- Return stops execution
        }
        else {
            // Add new item
            const newCartItem = new cartlists({
                name, brand, description, image, price, rating, category, reviews, email, pid
            });

            await newCartItem.save();

            return res.status(200).json(newCartItem);
        }


    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }

}
exports.getcartController = async (req, res) => {
    try {
        const email = req.query.email
        console.log(email)


    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }

}