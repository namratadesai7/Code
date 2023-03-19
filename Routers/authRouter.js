const express=require('express');
const authRouter=express.Router();
const cookieParser=require('cookie-parser');  
const userModel=require('../models/userModel');
const jwt=require('jsonwebtoken');
// const JWT_KEY=require('./secrets').JWT_KEY;
const JWT_KEY='edjjsndkeijdk';
const mongoose= require('mongoose');
// //for signup page
// authRouter
// .route( '/Signup' )
// .get(getSignup)
// .post(postSignup);

// //auth login page
// authRouter          Earlier there was /auth root for signup and login but now we changed it to /users and moved it to usercontroller
// .route('/login')
// .post(loginUser);


function getSignup(req,res){
    res.sendFile('/foodApp/public/index.html',{root:__dirname});
}
// async function postSignup(req,res){         //below functions shifted to authcontroller
//         let dataObj=req.body;   
//         let   user=await userModel.create(dataObj);
//         console.log('backend',user);                               
        
//        res.json({message:'list of all users',
//        data:user});
//  } 




// async function loginUser(req,res){ 
//   try{
//   let data=req.body;
//   if(data.email){
//   let user=await userModel.findOne({email:data.email});
//   if(user){
//     //bcrypt--> compare 
//     if(user.password==data.password){
//       let uid=user['_id']; //uid
//       let token=jwt.sign({payload:uid},JWT_KEY);    //Synchronous Sign with default (HMAC SHA256)
//      // res.cookie('isLoggedIn',true,{httpOnly:true});  //for user toh check if we can give access for getuser
//       res.cookie('login',token,{httpOnly:true});
//       return res.json({
//         message:'User has logged in',
//         userDetails:data
//       });
//   }
//     else{
//       return res.json({
//         message:'wrong credentials'
//       })
//   }
// }
//   else{
//     return res.json({
//       message:'User not found'
//   })}
// }
// else{
//   return res.json({
//     message:'Empty field found'
// })
// } }
//   catch(err) {
//     return res.json({
//       message:"error"
//     })
// }
// }
   
module.exports=authRouter;    