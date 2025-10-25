const users = require("../models/amountModel")
const stripe = require('stripe')('sk_test_51RSxz22LjIoQ1c2H6yVtyvIwv1PtlVO1yqkVIjwqEaa8ssQQprsEy1PnstUWkjTx4jeSmUlYJ2TtUfVscK74JVND00e61U3ItQ')

exports.paymentController = async (req, res) => {
    console.log(req.body)

    const  {data}  = req.body
    try {


        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "Custom Payment",
                        },
                        unit_amount: data * 100, 
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
           /// success_url: "https://medstore-frontend-o7dr.vercel.app/payment-success",
           //// cancel_url: "https://medstore-frontend-o7dr.vercel.app/payment-error",

            success_url: "http://localhost:5174/payment-success",
           
        });

        res.json({ url: session.url }); 
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}
