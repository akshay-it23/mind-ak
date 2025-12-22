const jwt= require("jsonwebtoken");
//user,password.mname vertofy ->token generated no passsword in it , expire time and

const authmiddleare=(req,res,next)=>{
    const authheader= req.headers.authorisation;

    if(!authheader || ! authheader.startswith("Bearer")){
        return res.status(400).json({message: "unauhtorised"})
    }


const token= authheader.split(" ")[1];

try{
    const decode=jwt.verify(token,process.env.JWT_SCERET);
    req.userId=decode.userId;
    next();
}
catch(err){
    return res.status(401).json({message:"error"});
}









};



module.exports=authmiddleare;
