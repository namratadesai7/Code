const express=require('express');
const userModel = require("../models/userModel");
const jwt=require('jsonwebtoken');
const JWT_KEY='edjjsndkeijdk';
const mongoose= require('mongoose');
// const JWT_KEY=require('./secrets');


module.exports.getUser=async function getallUser(req,res){     
    //console.log(req.query);
    let allusers=await userModel.find();
   // let allusers=await userModel.findOne({name:'Abhishek'});
    res.json({message:'list of all users',
    data:allusers});
}
module.exports.getUser=async function getUser(req,res){     //CRUD-lec16  for post we can use postuser or post signup func.
    //console.log(req.query);
    let users=await userModel.find();
   // let allusers=await userModel.findOne({name:'Abhishek'});
    res.json({message:'list of all users',
    data:users});
}
module.exports.postUser=function postUser(req,res){
    console.log(req.body);
    users=req.body;
    res.json({
        message:"data received successfully",
        users:req.body
    });
}
module.exports.patchUser=async function patchUser(req,res){
    //console.log("req.body-->", req.body);
    //update data in user obj
    try{
    let id=req.params.id;
    console.log(id);
    let user=await userModel.findById(id);
    console.log(user);
    
    let dataToBeUpdated= req.body;
    console.log(dataToBeUpdated);
    if(user){
        const keys=[];
        for(let key in dataToBeUpdated){
            keys.push(key);
        };
        for(let i=0;i<keys.length;i++){
        user[keys[i]]=dataToBeUpdated[keys[i]];      }
            const updatedData=await user.save();
            res.json({
                message:"data updated successfully",
                data:updatedData    ,
            });
        }
     else{
        return res.json({
            message:"user not found"
        })
     }
    }
    catch(err){
        res.json({
            message:err.message,
        })
    }

    // let user=await userModel.findOneAndUpdate(dataToBeUpdated);
}

module.exports.deleteUser=function deleteUser(req,res){
    users={};
    res.json({
        message:"data has beem deleted"
    });
// }

module.exports =async function getUserById(req,res){
    // console.log(req.params.id);
    // let paramId=req.params.id;
    // let obj={};
    // for(let i=0;i<users.length;i++){
    //     if(users[i]['id']=paramId){
    //         obj=users[i];
    //     }
    // }
    // res.json({
    //     message:"req received",
    //     data:obj
    // });
let users=await userModel.find();
if(users){
    res.json({
        message:'users retrived',
        data:users
    });
}
res.send("user  id received");
};

// function setCookies(req,res){
//     //  res.setHeader('set-cookie','isLoggedIn=true'); //below written res.cokkie used instead
//        res.cookie('isLoggedIn',true,{maxAge:1000*60*60*24,secure:true,httpOnly:true});  //httponly we can not acess cookie by document.console on front end.   
//       // res.cookie('isPrimeMember',true);
//        res.send('cookies has been set');
//         }
   
// function getCookies(req,res){    //to start our server
//        let cookie=req.cookies;
//        console.log(cookie);
//        res.send('cookies received');
   
    //         
}