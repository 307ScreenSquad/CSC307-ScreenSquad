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

async function editReview(id, bodyData){
  try {
    const reviewToUpdate = await MovieReview.findOneAndUpdate({_id: id}, bodyData);
    return reviewToUpdate;
  } catch (error) {
    console.log(error);
    return false;
  }
}

// // Uncomment this function if you need to remove a review
// async function removeReview(reviewId) {
//   try {
//     const deletedReview = await MovieReview.findByIdAndDelete(reviewId);
//     return deletedReview;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// }

async function findReviewsByMovieId(movieId) {
  return await MovieReview.find({ movieId: movieId });
}

async function findReviewsByUserId(userId) {
  return await MovieReview.find({ userId: userId });
}


module.exports = {
  getReviews,
  findReviewById,
  addReview,
  // removeReview, // Uncomment this line if you need to remove a review
  findReviewsByMovieId,
  findReviewsByUserId,
  editReview
};
