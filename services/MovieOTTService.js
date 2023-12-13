const movieOTTs = require("../models/MovieOTT");
const ottService = require("./OTTService");

var movieOTTService = {};

movieOTTService.addMovieOTTs = async (movieId, otts) => {
    let ottId;
    let url;
    otts.forEach(async element => {
        ottId = await ottService.findOTTByName(element.name);
        url = element.url;
        if(!ottId){
            ottId = await ottService.addOTT(element.name);
        }
        movieOTTService.addMovieOTT(movieId,ottId,url);
    });
}
movieOTTService.addMovieOTT = async (movieId, ottId, movieUrl) => {
    const movieOTT= new movieOTTs({ movieId: movieId, ottId: ottId, movieUrl: movieUrl });
    await movieOTT.save();
    return movieOTT._id;
}

module.exports = movieOTTService;