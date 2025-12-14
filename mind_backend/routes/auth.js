// task 28 jwt authneticatoon 
//login pe jwt generate kero
//protected routes concept smjho
const express= require('express')
    const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken")
const user=require("../models/user")
const router=express.Router();

router.post("/register",async(req,res)=>{
    try{
        const{ name,email,password}=req.body;
        
    }
})
)