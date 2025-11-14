//import the express
const express = require('express')


//create instance  for class
const route = new express.Router()

const amountController = require('./controller/amountController')
const userController = require('./controller/userController')
const blogController=require('./controller/blogController')
const jwtMiddleware = require('./middlware/jwtMiddleware')
const multerConfig = require('./middlware/multerMiddleware')


route.post('/amount', amountController.paymentController)
route.post('/register', userController.registerController)

//path for login
route.post('/login', userController.loginController)

route.post('/add-blog', jwtMiddleware, multerConfig.single('uploadedImage'),blogController.addBlogController)
route.get('/all-blogs',blogController.getHomeBlogContoller)
route.get('/all-user-blogs',jwtMiddleware,blogController.getUserBlogContoller)
//edit medicine path
route.put('/update-blogs',jwtMiddleware, multerConfig.single('imageurl'),blogController.updateBlogController)
route.delete('/delete-blog/:id',jwtMiddleware,blogController.deleteController)


module.exports = route