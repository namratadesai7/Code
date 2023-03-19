const jwt=require('jsonwebtoken');
const JWT_KEY=require('secrets.js'); 


//let flag=false; //user logged in or not
 
    
//     function protectRoute(req,res,next){
//         if(req.cookies.login){
//     //     // let a= req.cookies.isLoggedIn;   for getuser function to be accessed by loggrdin user
//             console.log(req.cookies);
//             let isVerified=jwt.verify(req.cookies.login,JWT_KEY);
//             if(isVerified){
//             next();
//         }
//         else{
//             return res.json({
//                 message:'user not verified'
//             })
//         }
//     }
    
//     else{
//         return res.json({
//             message:'Operation not allowed'
//         })
//     }
// }                             moved function to authcontroller
module.exports=protectRoute;