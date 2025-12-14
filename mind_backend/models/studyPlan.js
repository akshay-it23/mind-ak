const mongoose=require("mongoose");

 const studyPlanSchema= new mongoose.Schema({
    subject:{
        type:String,
        required:true,
    },
    examDate:{
        type:String,
        required:true,
    },
    plan:{
        type:Array,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
 });


 module.exports=mongoose.model("StudyPlan",studyPlanSchema);