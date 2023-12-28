const mongoose=require('mongoose')
const ImageSchema=new mongoose.Schema({
    data:Buffer,
    contentType:String
})
const movieimage=mongoose.model("movieimage",ImageSchema);
module.exports=movieimage;