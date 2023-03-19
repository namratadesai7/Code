const mongoose=require('mongoose');
mongoose.set('strictQuery', true);
const emailValidator=require('email-validator');
const bcrypt=require('bcrypt');
const crypto=require('crypto');
//mongodb
const db_link= 'mongodb+srv://admin:SME0fVOwPnlhGmHw@cluster0.nkygqfr.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
  // console.log(db);
   console.log('db connected');
})
.catch(function(err){
   console.log(err);
}); 
const userSchema=mongoose.Schema({
       name:{
           type:String,
           required:true,
       },
       email:{
           type:String,
           required:true,
           unique:true,
           validate:function(){
               return emailValidator.validate(this.email);
          }
       },
      password:{
           type:String,
           required:true,
           minlength:8,
           
   },
       ConfirmPassword:{
           type:String,
        //    required:true,
           minlength:8,
           validate:function(){
               return this.ConfirmPassword==this.password
           },
       },
       role:{
        type:String,
        enum:['admin','user','restauratowner','deliveryboy'],
        default:'user',
    },
    profileimage:{
        type:String,
        default:'img/users/default.jpeg'
    },

    resetToken:String
})
//before save event occurs in db
// userSchema.pre('save',function(){
//     console.log('before saving in db',this);
// });
//after save event occurs in db
// userSchema.post('save',function(doc){
//     console.log('after saving in db',doc);
// });
//remove-explore on your own

userSchema.pre('save',function(){
   this.ConfirmPassword=undefined;
});

    // userSchema.pre('save',async function(){
    //     let salt=await bcrypt.genSalt();
    //     let hashedString=await bcrypt.hash(this.password,salt);
    //     console.log(hashedString);
    //     this.password=hashedString;
    
// })

userSchema.methods.createResetToken=function(){
    //creating unique token using npm i crypto
    const resetToken=crypto.randomBytes(32).toString("hex");
    this.resetToken=resetToken //resettoken made in schema
    return resetToken;
}


userSchema.methods.resetPasswordHandler=function(password,confirmpassword){
    this.password=password;
    this.confirmpassword=confirmpassword;
    this.resetToken=undefined;
}


//model
const userModel=mongoose.model('userModel',userSchema);
module.exports=userModel;


// (async function createuser(){
//     let user={
//         name:'Jasbir',
//         email:'abcd@gmail.com', 
//         password:'123456789',
//         ConfirmPassword:'123456789',

//     };
//     let data=await userModel.create(user); 
//     console.log(data);
// }) ();