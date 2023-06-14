const mongoose = require("mongoose");
const MovieReview = require("./movie-review.js");
const MovieServices = require("../controllers/movie-review-services.js");
const dotenv = require("dotenv");


test("MovieReview model works as expected", () => {
  const movieReview = new MovieReview({
    movieId: "123456",
    reviewText: "This is a review",
  });
  expect(movieReview.movieId).toBe("123456");
  expect(movieReview.reviewText).toBe("This is a review");
}
);


