const movieOTTs = require("../models/MovieOTT");
const ottService = require("./OTTService");

var movieOTTService = {};

movieOTTService.addMovieOTTs = async (movieId, ott) => {
    let ottId;
    let url;
  
        ottId = await ottService.findOTTByName(ott.name);
        url = ott.url;
        if(!ottId){
            ottId = await ottService.addOTT(ott.name);
        }
        movieOTTService.addMovieOTT(movieId,ottId,url);
}
movieOTTService.addMovieOTT = async (movieId, ottId, movieUrl) => {
    const movieOTT= new movieOTTs({ movieId: movieId, ottId: ottId, movieUrl: movieUrl });
    await movieOTT.save();
    return movieOTT._id;
}
movieOTTService.getMovieOttByMovieId=async(movieId)=>{
    return await movieOTTs.findOne({movieId:movieId},{movieUrl:1,ottId:1}).populate('ottId');
}

module.exports = movieOTTService;