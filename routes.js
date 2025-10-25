//import the express
const express = require('express')


//create instance  for class
const route = new express.Router()

const amountController = require('./controller/amountController')
route.post('/amount', amountController.paymentController)

module.exports = route