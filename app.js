const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')
const homeController = require('./controllers/HomeController')
const userController = require('./controllers/UserController')
const languageController = require('./controllers/LanguageController')

require('dotenv').config();

const app=express();

mongoose.connect("mongodb://localhost:27017/"+process.env.DBNAME)
app.use(bodyParser.json())
app.use(cookieParser())
app.use("/",homeController)
app.use("/users",userController)
app.use("/languages",languageController)
app.listen(process.env.PORT,()=>{
    console.log("Running on PORT =>",process.env.PORT);
})