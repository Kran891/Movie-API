const { default: mongoose } = require("mongoose");



const GenreSchema=new mongoose.Schema({
    name:String
})
const genres=mongoose.model("genre",GenreSchema);
module.exports=genres