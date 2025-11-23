//import the express
const express = require('express')


//create instance  for class
const route = new express.Router()

const amountController = require('./controller/amountController')
const userController = require('./controller/userController')
const blogController = require('./controller/blogController')
const jwtMiddleware = require('./middlware/jwtMiddleware')
const multerConfig = require('./middlware/multerMiddleware')
const amazonuserController = require('./controller/amazonuserController')
const otpController = require('./controller/otpController')
const amazonProductController = require('./controller/amazonProductController')

route.post('/amount', amountController.paymentController)
route.post('/register', userController.registerController)

//path for login
route.post('/login', userController.loginController)

route.post('/add-blog', jwtMiddleware, multerConfig.single('uploadedImage'), blogController.addBlogController)
route.get('/all-blogs', blogController.getHomeBlogContoller)
route.get('/all-user-blogs', jwtMiddleware, blogController.getUserBlogContoller)
//edit medicine path
route.put('/update-blogs', jwtMiddleware, multerConfig.single('imageurl'), blogController.updateBlogController)
route.delete('/delete-blog/:id', jwtMiddleware, blogController.deleteController)


//amazon

route.post('/amazonregister', amazonuserController.registerController)
route.post('/amazonrloginemail', otpController.otpamazonController)
route.get('/amazonrlogin', amazonuserController.loginController)
route.post('/amazonrpassword', amazonuserController.loginpasswordController)
route.get('/amazonallProduct', amazonProductController.productController)
route.post('/cart', amazonProductController.cartController)
route.get('/getCart', amazonProductController.getcartController)
//path to delete medicine
route.delete('/deleteitem/:id',amazonProductController.deleteItemController)
route.put('/updatequantity',amazonProductController.quantityUpdateItemController)
route.put('/updateorderStatus',amazonProductController.updateorderStatusController)
//path for google login
route.post('/GoogleRegister', amazonuserController.googleLoginController)
route.get('/orderlist', amazonProductController.orderListController)

module.exports = route