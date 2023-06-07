const mongoose = require("mongoose");
const MyWatchlist = require("./watchlist.js"); 


test("MovieReview model works as expected", () => {
  const watchlist = new MyWatchlist({
    movieId: "12345",
    title: "The Matrix",
    poster_path: "/1234.jpg",
    userId: "123456789"
  });
  expect(watchlist.movieId).toBe("12345");
  expect(watchlist.title).toBe("The Matrix");
  expect(watchlist.poster_path).toBe("/1234.jpg");
  expect(watchlist.userId).toBe("123456789");
}
);
