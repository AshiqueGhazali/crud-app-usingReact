const express= require('express')
const router = express.Router();
const userController = require('../Controller/controller')
const adminController = require('../Controller/adminController')
const middleware = require('../Middleware/middleware')



router.post('/createUser',userController.createUser)
router.post('/login',userController.userLogin)
router.get('/getUserData',userController.getUserData)
router.patch('/updateProfile',userController.updateProfile)
router.post('/updateImage',userController.updateImage)


// admin
router.post('/adminLogin',adminController.adminLogin)
router.get('/getUserDetails',middleware.routeProtect,adminController.getUserDetails)
router.post('/addNewUser',middleware.routeProtect,adminController.addNewUser)
router.delete('/deleteUser',middleware.routeProtect,adminController.deleteUser)
router.patch('/adminEditProfile',middleware.routeProtect,adminController.adminEditProfile)


module.exports=router;