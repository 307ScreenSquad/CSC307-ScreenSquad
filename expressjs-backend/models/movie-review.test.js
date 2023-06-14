const mongoose = require("mongoose");
const MovieReview = require("./movie-review.js"); // Assuming the code is in a file named "MovieReview.js"
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

test("MovieReview model catches missing movieId", () => {
  const movieReview = new MovieReview({
    reviewText: "This is a review",
  });
  const validationError = movieReview.validateSync();
  expect(validationError.errors.movieId).toBeTruthy();
} 
);

test("MovieReview model catches missing reviewText", () => {
  const movieReview = new MovieReview({
    movieId: "123456",
  });
  const validationError = movieReview.validateSync();
  expect(validationError.errors.reviewText).toBeTruthy();
});


test("MovieServices getReviews returns an array", async () => {

  const movieReviews = await MovieServices.getReviews("123456");
  expect(movieReviews).toBeInstanceOf(Array);
}
);

test("MovieServices findReviewById returns a review", async () => {
  const movieReview = await MovieServices.findReviewById("647fc360baa6aeb62f0bb7b9");
  expect(movieReview).toBeInstanceOf(Object);
});

test("MovieServices findReviewById returns undefined for invalid id", async () => {
  const movieReview = await MovieServices.findReviewById("647fc360baa6aeb62f0bb7b8");
  expect(movieReview).toBeNull();
});

test("MovieServices addReview doesnt add a review becuast TS isnt logged in", async () => {
  const movieReview = await MovieServices.addReview({
    movieId: "123456",
    reviewText: "This is a review from the test suite",
  });
  expect(movieReview).toBe("Server error");
});

test("MovieServices addReview adds a review", async () => {
  const movieReview = await MovieServices.addReview({
    movieId: "123456",
    reviewText: "This is a review from the test suite",
    userId: "647fc360baa6aeb62f0bb7b9",
    posterName: "Test User",
    postedAt: "2021-04-01T15:30:00.000Z"
  });
  expect(movieReview).toBe("Review added successfully");
}
);

test("MovieServices editReview edits a review", async () => {
  const movieReview = await MovieServices.editReview("647fc360baa6aeb62f0bb7b9", {
    reviewText: "This is an edited review from the test suite",
  });
  expect(movieReview).toBeInstanceOf(Object);
  expect(movieReview.reviewText).toBe("This is an edited review from the test suite");
}
);

test("Movieservices findReviewsByUserId returns an array", async () => {
  const movieReviews = await MovieServices.findReviewsByUserId("647fc360baa6aeb62f0bb7b9");
  expect(movieReviews).toBeInstanceOf(Array);
});

test("Movieservices findReviewsByUserId returns an empty array for invalid id", async () => {
  const movieReviews = await MovieServices.findReviewsByUserId("647fc360baa6aeb62f0bb7b8");
  expect(movieReviews).toBeInstanceOf(Array);
  expect(movieReviews.length).toBe(0);
});

test("MovieServices findreviewsbyMovieId returns an array", async () => {
  const movieReviews = await MovieServices.findReviewsByMovieId("123456");
  expect(movieReviews).toBeInstanceOf(Array);
});

test("MovieServices findreviewsbyMovieId returns an empty array for invalid id", async () => {
  const movieReviews = await MovieServices.findReviewsByMovieId("1234567");
  expect(movieReviews).toBeInstanceOf(Array);
  expect(movieReviews.length).toBe(0);
});



const consoleErrorSpy = jest.spyOn(console, "error");

describe("Console Error Logging: addReview", () => {
  test("should log the error when an error occurs (addreview)", async () => {
    // Mock the console.error method
    consoleErrorSpy.mockImplementation();

    // Call the function that may log an error
    await MovieServices.addReview({
      movieId: "123456",
      reviewText: "This is a review from the test suite",
    });

    // Check if console.error was called with the expected error message
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));
  });

  test("should log the error when an error occurs (find by id)", async () => {
    // Mock the console.error method
    consoleErrorSpy.mockImplementation();

    // Mock the MovieReview.findById method to throw an error
    jest.spyOn(MovieReview, "findById").mockRejectedValue(new Error("Test error"));

    // Call the function that may log an error
    await MovieServices.findReviewById("647fc360baa6aeb62f0bb7b8");

    // Check if console.error was called with the expected error message
    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));

    // Restore the original methods
    consoleErrorSpy.mockRestore();
    MovieReview.findById.mockRestore();
  });
  test("should log the error when an error occurs", async () => {
    // Mock the console.error method
    consoleErrorSpy.mockImplementation();

    // Mock the MovieReview.findOneAndUpdate method to throw an error
    jest.spyOn(MovieReview, "findOneAndUpdate").mockRejectedValue(new Error("Test error"));

    // Call the function that may log an error
    const result = await MovieServices.editReview("647fc360baa6aeb62f0bb7b9", {
      reviewText: "This is an edited review from the test suite",
    });


    // Check if the result is false
    expect(result).toBe(false);

    // Restore the original methods
    consoleErrorSpy.mockRestore();
    MovieReview.findOneAndUpdate.mockRestore();
  });
  
});


