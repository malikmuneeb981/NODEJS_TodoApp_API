const express = require("express");
const router = express.Router();
const morgan = require("morgan");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const userjwt = require("../middleware/user_jwt");
const user_jwt = require("../middleware/user_jwt");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");
const { default: mongoose } = require("mongoose");
//const User = require('../models/User')
//const { JsonWebTokenError } = require('jsonwebtoken')

router.get("/", userjwt, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      msg: "Server Error",
    });
    next();
  }
});

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({
      email: email,
    });
    if (!user) {
      res.status(400).json({
        success: false,
        msg: "user does not exists register first",
        token: null,
        user: null,
      });
    }
    const passmatch = await bcrypt.compare(password, user.password);
    if (!passmatch) {
      res.status(400).json({
        success: false,
        msg: "Invalid Password!",
        token: null,
        user: null,
      });
    }
    const payload = {
      id: user.id,
    };
    jwt.sign(
      payload,
      process.env.jwtusersecret,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        else {
          res.status(200).json({
            success: true,
            msg: "Correct User",
            token: token,
            user: user,
          });
        }
        // jwt.sign(payload,process.env.jwtusersecret,{
        //                 expiresIn:360000
        //             },(err,token)=>{
        //                 if (err) throw err;
        //                 res.status(200).json({
        //                     success:true,
        //                     token:token
        //                 })
        //             })
      }
    );
  } catch (err) {
    console.log(err);
  }
});
router.post("/register", async (req, res, next) => {
  const { email, username, password } = req.body;
  try {
    const isuser = await User.findOne({
      email: email,
    });
    if (isuser) {
      return res.json({
        success: false,
        msg: "User already exists",
        user: null
      });
    }
    else
    {
    const user = new User();
    user.username = username;
    user.email = email;
    const pass_encrypt = await bcrypt.genSalt(10);
    user.password= await bcrypt.hash(password, pass_encrypt);
    // const encryptpass = await bcrypt.getSalt(10);
    // user.password = await bcrypt.hash(password, encryptpass);
    let size = 200;
    user.avatar = "https://gravatar.com/avatar/?s=" + size + "&d=retro";
    await user.save();
    return res.json({
      msg: "Register Success",
      success: true,
      user: user,
    });
  } 
  } catch (err) {
    console.log(err);
  }
});

// router.post('/register',async(req,res,next)=>{

//     const {email,password,username}=req.body
//     try{
//         const finduser=await User.findOne({
//             email:email
//         })
//         if(finduser)
//         {
//             res.status(400).json({
//                 success:false,
//                 msg:"User already exists"
//             })
//         }
//         const user=new User()
//         user.email=email
//         user.username=username
//         
//         let size=200
//         user.avatar="https://gravatar.com/avatar/?s="+size+'&d=retro'
//         await user.save()
//             res.json({

//                 msg:"Register Success",
//                 success:true,
//                 user:user
//             })
//     }
//     catch(err)
//     {
//         console.log(err);
//     }

// })
module.exports = router;

// router.post('/login',async(req,res,next)=>{

//    const {email,password}=req.body
//     const user = await User.findOne({
//         email:email
//     })
//     if(!email)
//     {
//         res.status(400).json({
//             success:false,
//             msg:"user not registered please register first"
//         })
//     }
//     const passmatch=await bcrypt.compare(password,user.password)
//     if(!passmatch)
//     {
//         res.status(400).json({
//             success:false,
//             msg:"Incorrect password"
//         })

//     }
//     const payload={
//         id:user.id
//     }
//     jwt.sign(payload,process.env.jwtusersecret,{
//         expiresIn: 360000
//     },(err,token)=>
//     {
//         if (err) throw err;
//         else
//         {
//             res.status(200).json({
//                 success:true,
//                 msg:'User logged in',
//                 token:token,
//                 user:user
//             })
//         }

//     })

// })

// router.post('/register',async(req,res,next)=>{

//     const {username,email,password}=req.body
//     try{
//         let user_exists=await User.findOne({email:email})
//         if(user_exists)
//         {
//             res.json({
//                 msg:"User already exists",
//                 success:false
//             })

//         }
//         let user=new User()
//         user.username=username
//         user.email=email
//         const pass_encrypt=await bcrypt.genSalt(10)
//         user.password=await bcrypt.hash(password,pass_encrypt)
//         let size=200
//         user.avatar="https://gravatar.com/avatar/?s="+size+'&d=retro'
//         await user.save()

//         const payload={
//             user:{
//                 id:user.id
//             }
//         }
//         jwt.sign(payload,process.env.jwtusersecret,{
//             expiresIn:360000
//         },(err,token)=>{
//             if(err) throw err;
//             else{
//                 res.status(200).json({
//                     success:true,
//                  token:token
//                 })
//             }
//         })

//         // const payload={
//         //     user:{
//         //         id:user.id
//         //     }
//         // }

//         // jwt.sign(payload,process.env.jwtusersecret,{
//         //     expiresIn:360000
//         // },(err,token)=>{
//         //     if (err) throw err;
//         //     res.status(200).json({
//         //         success:true,
//         //         token:token
//         //     })
//         // })

//         // res.json({

//         //     msg:"Register Success",
//         //     success:true,
//         //     user:user
//         // })

//     }
//     catch(err){

//         console.log(err);

//     }

// })

// const express=require('express')

// const router=express.Router()
// const User=require('../models/User')
// const bcrypt=require('bcryptjs')
// //const mongoose = require('mongoose')

// router.post('/register',async(req,res,next)=>{

// const {username,email,password}=req.body

// try{

// const user_exists=await User.findOne({email:email})
// if(user_exists)
// {
//     res.json({

//         msg:"User already exists",
//         success:false

//         })

// }
// let user=new User()
// user.username=username
// user.email=email
// const pass_encrypt=await bcrypt.genSalt(10)
// user.password=await bcrypt.hash(password,pass_encrypt)

// let size=200
// user.avatar="https://gravatar.com/avatar/?s="+size+'&d=retro'
// await user.save()
// res.json({

//     success:true,
//     msg:'User registered',
//     user:user

// })

// }
// catch(err){

// console.log(err);
// }

// })
// module.exports=router
