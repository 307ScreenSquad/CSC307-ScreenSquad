const mongoose = require("mongoose");
const MyWatchlist = require("./watchlist.js"); 
const watchlist_services = require("../controllers/watchlist-services.js");


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

test("MovieReview model catches missing movieId", () => {
  const watchlist = new MyWatchlist({
    title: "The Matrix",
    poster_path: "/1234.jpg",
    userId: "123456789"
  });
  const validationError = watchlist.validateSync();
  expect(validationError.errors.movieId).toBeTruthy();
}
);

test("watchlist services getWatchlist returns an array", async () => {
  const watchlist = await watchlist_services.getWatchlist("123456789");
  expect(watchlist).toBeInstanceOf(Array);
}
);

test("watchlist services findMovieById returns a movie", async () => {
  const watchlist = await watchlist_services.findMovieById("12345");
  expect(watchlist).toBeInstanceOf(Object);
}
);


test("watchlist services addMovie adds a movie", async () => {
  const watchlist = await watchlist_services.addMovie({
    movieId: "502356",
    title: "The Super Mario Bros. Movie",
    poster_path: "/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
    userId: "647ea0fe08ddada2a0206ac3"
  });
  expect(watchlist).toBe("Movie added successfully");
}
);


test("watchlist services addMovie doesnt add a movie because TS isnt logged in", async () => {
  const watchlist = await watchlist_services.addMovie({
    movieId: "502356",
    title: "The Super Mario Bros. Movie",
    poster_path: "/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
  });
  expect(watchlist).toBe("Server error");
}
);

test("watchlist services addMovie doesnt add a movie because TS is already logged in", async () => {
  const watchlist = await watchlist_services.addMovie({
    movieId: "502356",
    title: "The Super Mario Bros. Movie",
    poster_path: "/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
    userId: "647ea0fe08ddada2a0206ac3"
  });
  expect(watchlist).toBe("Movie added successfully");
}
);

test("watchlist services deleteMovie removes a movie", async () => {
  const result = await watchlist_services.removeMovie("12345");
  expect(result).toBe(false);
}
);

test("watchlist services deleteMovie doesnt remove a movie because TS isnt logged in", async () => {
  const result = await watchlist_services.removeMovie("12345");
  expect(result).toBe(false);
});
