const express= require('express')
const router = express.Router();
const userController = require('../Controller/controller')
const adminController = require('../Controller/adminController')
const middleware = require('../Middleware/middleware')



router.post('/createUser',userController.createUser)
router.post('/login',userController.userLogin)
router.patch('/updateProfile',userController.updateProfile)
router.post('/updateImage',userController.updateImage)

// admin
router.post('/adminLogin',adminController.adminLogin)
router.get('/getUserDetails',adminController.getUserDetails)


module.exports=router;