
const express=require('express');
const userRouter=express.Router();
const userModel=require('../models/userModel');  
const cookieParser=require('cookie-parser');
// const protectRoute=require('./authHelper');
const mongoose= require('mongoose');
const{getUser,getUserById,postUser,deleteUser,patchUser}=require('../controller/userController');
const{signup ,login,isAuthorised,protectRoute,resetpassword,forgetpassword,logout}=require('../controller/authController');
const { update } = require('lodash');
const jwt=require('jsonwebtoken');
const JWT_KEY='edjjsndkeijdk';
// const JWT_KEY=require('./secrets');
// userRouter
// .route('/')    //path specific middleware
// .get(protectRoute,getUsers)
// .post(postUser)
// .patch(patchUser)
// .delete(deleteUser);    
// // userRouter
// // .route("/getCookies")
// // .get(getCookies);

// // userRouter
// // .route("/setCookies")
// // .get(setCookies);

// userRouter.route("/:id").get(getUserById);



//user k options
userRouter.route('/:id')
.post(postUser)
.patch(patchUser)
.delete(deleteUser);
// userRouter.post('/', (req, res) => {
//     // Callback function implementation
//   })
  

userRouter.route('/signup')
.post(signup)

// userRouter.post('/signup',signup);


userRouter.route('/login')
.post(login); 

userRouter
.route('/forgetpassword')
.post(forgetpassword);

userRouter
.route('/resetpassword/:token')
.post(resetpassword);

//profile page
userRouter.use(protectRoute)
userRouter
.route('/userProfile')
.get(getUser);

//admin specific func
userRouter.use(isAuthorised(['admin']));
userRouter
.route('/')
.get(getallUser);

userRouter  
.route('/logout')
.get(logout);

// app.get('/users',(req,res)=>{
//     res.send(users);
// })
//mountingin expr- dont need to write this callbackfunc
//app.get('/users');

// app.post('/users',(req,res)=>{
//    console.log(req.body);
//    users=req.body;
//    res.json({
//     message:"data received successfully",
//     user:req.body
//    });
// });
//app.post('/users');
//update -->patch
//app.patch('/users');

//to delete a data

//app.delete('/users');

//params
//app.get('/user/:id',(req,res)=>{

//});


 module.exports=userRouter;       