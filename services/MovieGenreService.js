const movieGenres = require("../models/MovieGenre");
const genreServices = require("./GenreService");

var movieGenreService = {};
movieGenreService.addMovieGenres = async (movieId, genrenames) => {
   console.log(genrenames);
    genrenames.forEach(async element => {
        let genre = await genreServices.findGenreByName(element)
        
        if (!genre) {
            genre = await genreServices.addGenre(element)
            console.log("G",genre);
        }
       await movieGenreService.addMovieGenre(movieId, genre)

    });
}
movieGenreService.addMovieGenre = async (movieId, genreId) => {
    return await (new movieGenres({ movieId: movieId, genreId: genreId }).save())._id
}
movieGenreService.getGenresByMovieId=async(movieId)=>{
    const genresList=await movieGenres.find({movieId:movieId},{genreId:1,_id:0}).populate("genreId");
    return genresList.map(x=>x.genreId.name)
}
movieGenreService.findMovieByGenreName = async (name) => {
    let genreId = await genreServices.findGenreByName(name);
    let movies = await movieGenres.find({genreId:genreId},{movieId:1}).populate('movieId')
    
    return movies;
} 
module.exports=movieGenreService