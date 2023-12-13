const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')
const homeController = require('./controllers/HomeController')
const userController = require('./controllers/UserController')
const languageController = require('./controllers/LanguageController')
const movieController = require('./controllers/MovieController')
const genreController = require('./controllers/GenreController')
const movieTypeController = require('./controllers/MovieTypeController')

require('dotenv').config();

const app=express();

mongoose.connect("mongodb://localhost:27017/"+process.env.DBNAME)
app.use(bodyParser.json())
app.use(cookieParser())
app.use("/",homeController)
app.use("/users",userController)
app.use("/languages",languageController)
app.use("/movies",movieController)
app.use("/genres",genreController)
app.use("/movietypes",movieTypeController)
app.listen(process.env.PORT,()=>{
    console.log("Running on PORT =>",process.env.PORT);
})