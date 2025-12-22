
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';






const app= express();
const port = process.env.PORT || 8000
app.use(express.json());




dotenv.config();


//permisstion for froented ot conenect iwht abkcend
// Middleware
app.use(
  cors({
    origin: [
      "https://mind-mentor-pearl.vercel.app",
      "https://mind-mentor.kartiklabhshetwar.me",
      "http://localhost:3000",
      "https://www.mind-mentor.ink",
      "https://mind-mentor.ink",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


// Apply routes directly without auth middleware
app.use('/generate-plan', generatePlanRouter);
app.use('/curate-resources', curateResourcesRouter);
app.use('/pdf', pdfChatRouter);

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests from this IP, please try again after 15 minutes',
  // Add trusted proxy configuration
  trustProxy: true
});
app.use(limiter);




const studyrouter=require('./routes/studyPlan')
app.get('/',(req,res)=>{
    res.send("task one comepleted")

})




// Apply routes directly without auth middleware
app.use('/generate-plan', generatePlanRouter);
app.use('/curate-resources', curateResourcesRouter);
app.use('/pdf', pdfChatRouter);







//basic heatlh check up
app.get('/',(req,res)=>{
    res.status(200).json({status:'ok',message:'mind mentor api is running'});

});



//light weight
app.get('/health',(req,res)=>{
    res.status(200).json({
        status:'ok',
        message:'mind mentor aoi is running',
        timestamp: new Data().toISOSting()
    });

});








//connect to mongogb
mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log('connected to mmognodb'))
.catch((err)=>console.error('mongodb connection error'))








//error handling middleware

app.use((err, req, res) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});




//port 

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});


// taks 34-39 smjh he na a rh ab to  mtlb kasie yaad tohsi to m
// //tdadsk 34m
