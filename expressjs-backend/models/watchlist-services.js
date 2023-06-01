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

async function getWatchlist() {
    return await findMoviesByMovieId();
}

async function findMovieById() {
    try {
      return await MyWatchlist;
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

async function findMoviesByMovieId(movieId) {
  return await MyWatchlist.find();
}

module.exports = {
  getWatchlist,
  findMovieById,
  addMovie,
  findMoviesByMovieId
};