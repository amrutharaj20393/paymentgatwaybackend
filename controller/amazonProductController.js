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
        const alreadyAdded = await cartlists.findOne({ email, pid, status: "Added" })
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
        const { email } = req.query;
        console.log("Email:", email);

        console.log("inside cart")
        const allCart = await cartlists.find({ email, status: "Added" })
        console.log(allCart)
        if (allCart.length == 0) {
            ///console.log("inside 401")
            res.status(401).json('no data')
        } else {
            //console.log("inside 200")
            res.status(200).json({ cartItems: allCart })
        }



    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }






}
//delete a medicine
exports.deleteItemController = async (req, res) => {
    const { id } = req.params
    try {

        await cartlists.findByIdAndDelete({ _id: id })
        res.status(200).json('deleted')
    }
    catch (error) {
        res.status(500).jsone(error)
    }
}

exports.quantityUpdateItemController = async (req, res) => {
    console.log(req.body)



    try {
        const { email, quantities } = req.body;

        console.log("Email:", email);
        console.log("Quantities:", quantities);

        // Loop through each item ID and update
        for (const id in quantities) {
            const qty = quantities[id];
            const item = await cartlists.findOne({ _id: id, email, status: "Added" })
            // console.log(item)
            if (item) {


                await cartlists.findOneAndUpdate(
                    { _id: id, email, status: "Added" },      // ensure correct user
                    { quantity: qty }, { new: true }
                );
                return res.status(200).json({ message: "All quantities updated successfully" });
            }

        }


    }



    catch (err) {
        res.status(500).json({ error: err.message });
    }
}





exports.updateorderStatusController = async (req, res) => {
    try {
        const { email } = req.body;
console.log("hai")
console.log(email)
        // Update all cart items of the user from "Added" to "Ordered"
        const result = await cartlists.updateMany(
            { email, status: "Added" },
            {
                status: "Ordered"
            }
        );

        res.status(200).json({
            message: "Order placed successfully",
            updatedCount: result.modifiedCount
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }


}

exports.orderListController = async (req, res) => {
    try {
        const { email } = req.query;
        console.log("Email:", email);

        console.log("inside cart")
        const allCart = await cartlists.find({ email, status: "Ordered" })
        console.log(allCart)
        if (allCart.length == 0) {
            ///console.log("inside 401")
            res.status(401).json('no data')
        } else {
            //console.log("inside 200")
            res.status(200).json({ cartItems: allCart })
        }



    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }






}
