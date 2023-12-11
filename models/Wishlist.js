const { default: mongoose } = require("mongoose");

const WishListSchema=new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
    movieId:{type:mongoose.Schema.Types.ObjectId,ref:"movie"}
})
const wishlists=mongoose.Schema("wishlist",WishListSchema)
module.exports=wishlists