const mongoose = require("mongoose");
const MyWatchlist = require("./watchlist.js"); 

test("Watchlist model works", () => {
  const watchlist = new MyWatchlist({
    movieId: "10101",
    title: "The Matrix",
    poster_path: "/abcdefg.jpg",
    userId: "123abc",
  });
  expect(watchlist.movieId).toBe("10101");
  expect(watchlist.title).toBe("The Matrix");
  expect(watchlist.poster_path).toBe("/abcdefg.jpg");
  expect(watchlist.userId).toBe("123abc");
}
);
