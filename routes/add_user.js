const express = require('express');

const router = express.Router();

const add_userController=require('../controllers/add_user');
const Authenticate=require('../middleware/authorization')


router.post('/newuser/:id?', add_userController.register_new);
// router.post('/login',userController.loginUser)
router.get('/edit/:userId',add_userController.edituser);
// getuser_with pagination
router.post('/get_user',add_userController.getalluser)
router.get('/get_roles',add_userController.get_roles)
router.post('/blockuser/:userId',add_userController.blockeduser)
router.get('/useractivelist',add_userController.user_list)
router.get('/userdropdown',add_userController.user_dropdown)
module.exports=router

