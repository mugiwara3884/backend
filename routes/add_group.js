const express = require('express');

const router = express.Router();

const add_userController=require('../controllers/add_group');
const Authenticate=require('../middleware/authorization')


router.post('/add_group',add_userController.add_group);


module.exports=router