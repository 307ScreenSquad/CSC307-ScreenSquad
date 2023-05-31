const mongoose = require("mongoose");
const MovieReview = require("./movie-review.js"); // Assuming the code is in a file named "MovieReview.js"


test("MovieReview model works as expected", () => {
  const movieReview = new MovieReview({
    movieId: "12345",
    reviewText: "This is a review",
  });
  expect(movieReview.movieId).toBe("12345");
  expect(movieReview.reviewText).toBe("This is a review");
}
);
