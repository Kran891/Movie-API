const mongoose=require('mongoose')
const OTTSchema=new mongoose.Schema({
    name: {type:String,required:true}
})
const OTTs=mongoose.model("OTT",OTTSchema);
module.exports=OTTs