const express= require('express');
const router=express.Router();
const verifyToken=require("../middleware/jwtVerify")

const{profileRegister,profileLogin,selectProfile,updateProfile}=require('../controller/profile');

//todo import

const {makeTodo,selectTodo,updateTodo,updateStatus,removeTodo,findbyDate,findbyStatus}=require('../controller/todos')

// profile router

router.post('/register',profileRegister)
router.post('/login',profileLogin)

router.get('/select',verifyToken,selectProfile)
router.post('/update',verifyToken,updateProfile)

//todo router

router.post('/makeTodo',verifyToken,makeTodo)
router.get('/selectTodo',verifyToken,selectTodo)
router.post('/updateTodo',verifyToken,updateTodo)
router.post('/updateStatus',verifyToken,updateStatus)
router.post('/removeTodo',verifyToken,removeTodo)
router.get('/findbyDate',verifyToken,findbyDate)
router.get('/findbyStatus',verifyToken,findbyStatus)





module.exports=router