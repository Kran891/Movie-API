const genres = require("../models/Genre");

var genreServices = {};
genreServices.addGenre = async (name) => {
    const genre = new genres({ name: name })
    await genre.save()
    console.log(genre);
    return genre._id;
}
genreServices.findGenreByName = async (name) => {
    let genre = (await genres.findOne({ name: name }, { _id: 1 }))
    return genre
}
// genreServices.findMovieByGenreName = async (name) => {
//     let movies = await genres.aggregate([
//         {
//             $match: { "name": name }
//         },
//         {
//             $lookup: {
//                 from: "moviegenres",
//                 localField: "_id",
//                 foreignField: "genreId",
//                 as: "genreMovies"
//             }
//         },
//         {
//             $lookup: {
//                 from: "movies",
//                 localField: "genreMovies.movieId",
//                 foreignField: "_id",
//                 as: "movies"
//             }
//         },
//         {
//             $lookup:{
//                 from: "movietypes",
//                 localField:"movies.typeId",
//                 foreignField:"_id",
//                 as : "movietypes"
//             }
//         },
//         {
//             $project: {
//                 movies : "$movies",
//                 movieTypes : "$movietypes.name"
//             }
//         }
//     ]);
//     return movies;

// }
module.exports = genreServices

