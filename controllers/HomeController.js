const express=require("express")
const homeController=express.Router()
homeRouter.route("/")
.get(async function(req,res){
    res.send("<center><h1>Conntected to MovieBuzz API</h1></center>")
})
module.exports=homeController