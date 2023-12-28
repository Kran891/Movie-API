const movieimage = require("../models/Images")

var movieImageService={}
movieImageService.addnewImage=async (file)=>{
    const image=new movieimage({
        data:file.buffer,
        contentType:file.mimetype
    })
   await image.save();
   return image._id;
}
module.exports=movieImageService;