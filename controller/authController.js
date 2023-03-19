const express=require('express');
const userModel=require('../models/userModel');
const jwt=require('jsonwebtoken');
// const JWT_KEY=require('./secrets');
const JWT_KEY='edjjsndkeijdk';
const mongoose= require('mongoose');
//signup user
module.exports.signup =async function signup(req,res){
  // return res.json({message:'user signed up'});
        try{
        let dataObj=req.body;   
        console.log(dataObj); //testing
              // userModel.create(dataObj); 
        let b =await userModel.create(dataObj); 
        console.log(b);  //testing
        if(b){
            return res.json({message:'user signed up',
            data:b,
                             
            }); }
        else{
            res.json({
                message:'error while signing up',
            });
        }} 
        catch(err){
          console.error(err);
            res.status(500); 
          res.json({ message:"error"});
        }
  };

//login user
module.exports.login=async function login(req,res){ 
    try{
    let data=req.body;
    if(data.email){
    let user=await userModel.findOne({email:data.email});
    if(user){
      //bcrypt--> compare 
      if(user.password==data.password){
        let uid=user['_id']; //uid
        let token=jwt.sign({payload:uid},JWT_KEY);    //Synchronous Sign with default (HMAC SHA256)
       // res.cookie('isLoggedIn',true,{httpOnly:true});  //for user toh check if we can give access for getuser
        res.cookie('login',token,{httpOnly:true});
        return res.json({
          message:'User has logged in',
          userDetails:data
        });
    }
      else{
        return res.json({
          message:'wrong credentials'
        })
    }
  }
    else{
      return res.json({
        message:'User not found'
    })}
  }
  else{
    return res.json({
      message:'Empty field found'
  })
  } }
    catch(err) {
      return res.json({
        message:"error"
      })
  }
  }

//isAuthorised--> to check user's role[admin,user,restaurant,deliveryman]

module.exports.isAuthorised=function isAuthorised(roles){
    return function(req,res,next){
      if(roles.includes(req.role)==true){
        next();
      }
      else{
        res.status(401).json({
          message:"operation not allowed"
        })
      }
    }
}

//protectRoute

module.exports.protectRoute=async function protectRoute(req,res,next){
  try{
  let token;
  if(req.cookies.login){  
//     // let a= req.cookies.isLoggedIn;   for getuser function to be accessed by loggrdin user
      console.log(req.cookies);
       token=req.cookies.login;
      let payload=jwt.verify(token,JWT_KEY);
      if(payload){
        console.log('payload token',payload);
      const user=await userModel.findById(payload.payload);   
      req.role=user.role;
      req.id=user.id;
      console.log('role',req.role);
      console.log('id',req.id);
      next();
      // return res.json({ 
      //   message:"user  verifiled"
      //    })
      }
      else{
        //browser
        const client=req.get('user-Agent');
        if(client.includes("Mozrilla")==true){
          return res.redirect('/login');  
        }
        //postman
        return res.json({ message:"please login"
        })
      }}}
catch(err){
  return res.json({
      message:err.message,
      
  })
}
} 

//forgetpassword
module.exports.forgetpassword=async function forgetpassword(req,res){ 
  let {email}=req.body;
  try{
 const user=await userModel.findOne({email:email});
 if(user){
  //createresetToken is used to create new token 
 http://abc.com/resetpassword/resetToken
//  let resetpasswordLink='${req.protocol}://'${req.get,('host')}/resetpassword/$,{req,.resetToken}';     
 var resetPasswordLink = `${req.protocol}://${req.get('host')}/resetpassword/${req.resetToken}`;

//send email to user
//nodemailer
  }
else{
  return res.json({
    message:"please signup"
  });
}
  }
  catch(err){
    res.status(500).json({
      message:err.message
    });
  }
}

//resetpassword
module.exports.resetpassword=async function resetpassword(req,res){
  try{
  const token=req.parms;
  let{password,confirmpassword}=req.body;
const user=await userModel.findOne(
  {resetToken:token});
  if(user){
    //resetpasswordhandler will update user in db
    user.resetPasswordHandler(password,confirmpassword);
    awaituser.save();
    res.json({
      message:"password changed successfully please login again"
    })}
  else{
    res.json({
      message:"user not found"
    })
  }
  }
catch(err){
  res.json({
    message:err.message
  });
}  
}

module.exports=function logout(req,res){
  res.cookie('login',' ',{maxAge:1});
  res.json({
    message:"user logged out successfully"
  })
}





  

