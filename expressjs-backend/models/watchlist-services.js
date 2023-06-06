const mongoose = require("mongoose");
const MyWatchlist = require("./watchlist");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

dotenv.config();

mongoose 
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PWD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .catch((error) => console.log(error));

async function getWatchlist(userId) {
    return await findMoviesByUserId(userId);
}

async function findMovieById(movieId) {
    try {
      return await MyWatchlist.findById(movieId);
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

async function addMovie(movie) {
  try {
    const newMovieAdded = new MyWatchlist(movie);
    await newMovieAdded.save();
    return "Movie added successfully";
  } catch (error) {
    console.log(error);
    return 'Server error';
  }
}

async function findMoviesByUserId(userId) {
    return await MyWatchlist.find({ userId: userId});
}

async function removeMovies(movieId) {
  try {
    const deleteMovie = await MyWatchlist.findByIdAndDelete(movieId);
    return deleteMovie;
  } catch (error) {
    console.log(error);
    return false;
  }
}

module.exports = {
  getWatchlist,
  findMovieById,
  addMovie,
  findMoviesByUserId,
  removeMovies
};