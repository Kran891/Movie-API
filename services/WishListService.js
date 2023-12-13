const wishLists = require("../models/Wishlist");

var wishListService = {};

wishListService.addToWishList = async (userId,movieId) => {
   let wishList = await wishLists.findOne({userId:userId,movieId:movieId},{_id:1})
   if(!wishList){
        wishList = new wishLists({
            userId : userId,
            movieId: movieId
        });
        await wishList.save();
        return wishList;
   } 
   return wishList;
};
wishListService.deleteFromWishList = async (id) => {
   let wishList = await wishLists.findById(id)
   if(wishList){
        wishList = await wishLists.deleteOne(wishList,{_id:1})
        return wishList;
   } 
   return wishList._id;
};
wishListService.getAllWishListsByUser = async (userId) => {
    const userWishLists = await wishLists.find({userId:userId}).populate("movieId");
    let userWishListMovieIds = []
    userWishLists.forEach(userWishList => {
        userWishListMovieIds.push(userWishList.movieId);
    });
    return userWishListMovieIds;
} 