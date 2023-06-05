const mongoose = require("mongoose");
const MovieReview = require("../models/movie-review"); // Assuming you have a "movie-review" model for movie reviews
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

async function getReviews(movieId) {
  return await findReviewsByMovieId(movieId);
}

async function findReviewById(reviewId) {
  try {
    return await MovieReview.findById(reviewId);
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function addReview(review) {
  try {
    const newReview = new MovieReview(review);
    await newReview.save();
    return 'Review added successfully';
  } catch (err) {
    console.error(err);
    return 'Server error';
  }
}

// Uncomment this function if you need to remove a review
// async function removeReview(reviewId) {
//   try {
//     const reviewToDelete = await MovieReview.findByIdAndDelete(reviewId);
//     return reviewToDelete;
//   } catch (error) {
//     console.log(error);
//     return false;
//   }
// }

async function findReviewsByMovieId(movieId) {
  return await MovieReview.find({ movieId: movieId });
}


module.exports = {
  getReviews,
  findReviewById,
  addReview,
  // removeReview, // Uncomment this line if you need to remove a review
  findReviewsByMovieId
};
