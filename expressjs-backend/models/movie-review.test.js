const mongoose = require("mongoose");
const MovieReview = require("./movie-review.js"); // Assuming the code is in a file named "MovieReview.js"
const MovieServices = require("../controllers/movie-review-services.js");

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

// test("MovieServices editReview returns false for invalid id", async () => {
//   const movieReview = await MovieServices.editReview("647fc360baa6aeb62f0bb7b8", {
//     reviewText: "This is an edited review from the test suite",
//   });
//   expect(movieReview).toBe(false);
// }
// );

// test("MovieServices removeReview removes a review", async () => {
//   const movieReview = await MovieServices.removeReview("647fc360baa6aeb62f0bb7b9");
//   expect(movieReview).toBeInstanceOf(Object);
// }
// );


const consoleErrorSpy = jest.spyOn(console, "error");

describe("Console Error Logging: addReview", () => {
  test("should log the error when an error occurs", async () => {
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
});

describe("Console Error Logging - findreviewbyId", () => {
  test("should log the error when an error occurs", async () => {
    consoleErrorSpy.mockImplementation();

    await MovieServices.findReviewById("647fc360baa6aeb62f0bb7b8");

    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));
  });
});

describe("Console Error Logging - findreviewbyId", () => {
  test("should log the error when an error occurs", async () => {
    consoleErrorSpy.mockImplementation();

    await MovieServices.findReviewById("647fc360baa6aeb62f0bb7b8");

    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.any(Error));
  });
});


