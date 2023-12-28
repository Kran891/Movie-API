const express = require('express');
const wishListService = require('../services/WishListService');
const wishListController=express.Router()
wishListController.route('/addtowishlist')
.post(
    async (req,res) => {
        res.send(await wishListService.addToWishList(req.body))
    }
)

module.exports=wishListController;