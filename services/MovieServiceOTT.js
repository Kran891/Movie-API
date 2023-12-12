const movieOTTs = require("../models/MovieOTT");
const ottService = require("../services/OTTService");

var movieServiceOTT;

movieServiceOTT.addMovieOTTs = async (movieId, otts) => {
    let ottId;
    let url;
    otts.forEach(async element => {
        ottId = await ottService.findOTTByName(element.name);
        url = element.url;
        if(!ottId){
            ottId = await ottService.addOTT(element.name);
        }
        movieServiceOTT.addMovieOTT(movieId,ottId,url);
    });
}
movieServiceOTT.addMovieOTT = async (movieId, ottId, movieUrl) => {
    return (await movieOTTs.create({ movieId: movieId, ottId: ottId, movieUrl: movieUrl }))._id
}