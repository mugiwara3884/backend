const express = require('express');

const router = express.Router();

const add_userController=require('../controllers/add_user');
const Authenticate=require('../middleware/authorization')


router.post('/newuser',add_userController.register_new);
// router.post('/login',userController.loginUser)
router.get('/edit/:userId',add_userController.edituser);
router.post('/get_user',add_userController.getalluser)

module.exports=router

