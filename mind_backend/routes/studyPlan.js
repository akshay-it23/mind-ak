const express=require('express')
const router=express.Router()

//define home page
router.get("/study-plan",(req,res)=>{
    res.send('home page')
})

router.post('/',(req,res)=>{
    const {subject,examDate}=req.body;
    if(!subject || !examDate){
        return res.status(400).json({
            success:failure,
            message:"subject and exam date requried"
        });
    }
    const studyPlan={
        subject,
        examDate,
        plan:[
            {day:1,topic:"Introduction"},
            {day:2,topi:"basics"},
            {day:3,topic:"practice"},],
        
    };
    res.status(200).json({
        success:true,
        message:"scces plan generated succesfully",
        data:studyPlan,
    });

});

//fetdch all stduy plan
router.get("/",async(req,res)=>{
    try{
        const plans=await studyPlan.find().sort({createdAt:-1});
        res.json({
            success:true,
            data:plans,
        });
        

    }
    catch(error){
        res.status(500).json({
            succes:false,
            message:"failed to fetch study plans",

        });
    }
});



module.exports=router