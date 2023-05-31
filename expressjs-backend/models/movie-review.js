const mongoose = require("mongoose");


const MovieReviewSchema = new mongoose.Schema(
  {
    movieId: {
      type: String,
      required: true,
      trim: true,
    },
    reviewText: {
      type: String,
      required: true,
      trim: true,
    },
    // postTime: {
    //     type: Date,
    //     required: true,
    //     trim: true,
    //   },
  },
  { collection: "movie_reviews" }
);

const MovieReview = mongoose.model("MovieReview", MovieReviewSchema);

module.exports = MovieReview;