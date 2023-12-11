const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser');
const homeRouter = require('./controllers/HomeController');

require('dotenv').config();

const app=express();

mongoose.connect("mongodb://localhost:27017/"+process.env.DBNAME)
app.use(bodyParser.json())
app.use("/",homeRouter)
app.listen(process.env.PORT,()=>{
    console.log("Running on PORT =>",process.env.PORT);
})