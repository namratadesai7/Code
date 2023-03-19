const express=require('express');
const {functions} = require('lodash');
const app= express();
const jwt=require('jsonwebtoken');
const JWT_KEY='edjjsndkeijdk';
const mongoose= require('mongoose');
// const JWT_KEY=require('./secrets');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const cookieParser=require('cookie-parser');  

//middleware function->used in post function to convert frontend msg into json
app.use(express.json()); //global middleware func
   
app.listen(3000);
app.use(cookieParser());   //used through middleware func so that we can acess cookies from anywhere(reqand resobj )
// let users=[
//     {
//         id: 1,
//         name: "Abhishek",
//     },
//     {
//         id: 2,
//         name: "Namrata",
//     },
//     {
//         id: 3,
//         name: "Karthik",
//     },
// ];
//mini app      
const userRouter=require('./Routers/userRouter');

//for signup page
//const authRouter=express.Router(); //when authrouter is in same file.
const authRouter=require('./Routers/authRouter');
//base route, router to use
app.use("/user",userRouter);
app.use("/auth",authRouter);





     