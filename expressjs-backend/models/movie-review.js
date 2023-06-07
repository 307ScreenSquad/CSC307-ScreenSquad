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
    userId: {
      type: String,
      required: true,
      trim: true,
    },
    postedAt: {
      type: Date,
      required: true,
      trim: true,
    },
    posterName: {
      type: String,
      trim: true,
    },
  },
  { collection: "movie_reviews" }
);

const MovieReview = mongoose.model("MovieReview", MovieReviewSchema);

module.exports = MovieReview;
