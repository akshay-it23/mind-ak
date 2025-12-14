
const express=require('express');
const app= express();
const port =3000
app.use(express.json());
const mongoose=require('mongoose');
const dotenv=require("dotenv");
dotenv.config();
mongoose.connect(process.env.MONGDB_URI)
.then(()=>console.log("mongodb connected"))
.catch((err)=> console.error("mongoDb error:",err));

const studyrouter=require('./routes/studyPlan')
app.get('/',(req,res)=>{
    res.send("task one comepleted")

})







app.use("/study-plan", studyrouter);

app.listen(port,()=>{
    console.log(`task 1 completed listend at port ${port}`)
})