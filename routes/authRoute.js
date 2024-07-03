const express = require('express');
const authController= require('../controller/authController');
const router = express.Router();
 const verifyJWT= require("../middleware/authMiddleware.js");





router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.get('/user', verifyJWT, authController.getUser);
router.patch('/update', verifyJWT, authController.updateInfo)

module.exports=router;