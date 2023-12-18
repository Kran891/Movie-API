const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser')
const cors=require('cors')
const homeController = require('./controllers/HomeController')
const userController = require('./controllers/UserController')
const languageController = require('./controllers/LanguageController')
const movieController = require('./controllers/MovieController')
const genreController = require('./controllers/GenreController')
const movieTypeController = require('./controllers/MovieTypeController')
const typeController = require('./controllers/TypeController')

require('dotenv').config();

const app=express();

mongoose.connect("mongodb://localhost:27017/"+process.env.DBNAME)
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors({
    origin: '*',
    methods: '*',
    credentials: true, // You can include this line if you want to allow credentials (cookies) to be sent with the request
  }));

app.use("/",homeController)
app.use("/users",userController)
app.use("/languages",languageController)
app.use("/movies",movieController)
app.use("/genres",genreController)
app.use("/movietypes",movieTypeController)
app.use("/types",typeController)
app.listen(process.env.PORT,()=>{
    console.log("Running on PORT =>",process.env.PORT);
    console.log(`http://localhost:${process.env.PORT}/`);
})