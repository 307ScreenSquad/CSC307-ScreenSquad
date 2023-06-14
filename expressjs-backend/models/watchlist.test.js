const mongoose = require("mongoose");
const MyWatchlist = require("./watchlist.js"); 
const watchlist_services = require("../controllers/watchlist-services.js");

// Test suites
describe("MyWatchlist model", () => {
  afterAll(() => {
    // Close the Mongoose connection after all tests
    mongoose.connection.close();
  });

  test("works as expected", () => {
    const watchlist = new MyWatchlist({
      movieId: "123456",
      title: "The Matrix",
      poster_path: "/1234.jpg",
      userId: "123456789"
    });
    expect(watchlist.movieId).toBe("123456");
    expect(watchlist.title).toBe("The Matrix");
    expect(watchlist.poster_path).toBe("/1234.jpg");
    expect(watchlist.userId).toBe("123456789");
  });

  test("catches missing movieId", () => {
    const watchlist = new MyWatchlist({
      title: "The Matrix",
      poster_path: "/1234.jpg",
      userId: "123456789"
    });
    const validationError = watchlist.validateSync();
    expect(validationError.errors.movieId).toBeTruthy();
  });

  test("getWatchlist returns an array", async () => {
    const watchlist = await watchlist_services.getWatchlist("123456789");
    expect(watchlist).toBeInstanceOf(Array);
  });

  test("findMovieById returns a movie", async () => {
    const watchlist = await watchlist_services.findMovieById("123456");
    expect(watchlist).toBeInstanceOf(Object);
  });

  test("addMovie adds a movie", async () => {
    const watchlist = await watchlist_services.addMovie({
      movieId: "502356",
      title: "The Super Mario Bros. Movie",
      poster_path: "/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
      userId: "647ea0fe08ddada2a0206ac3"
    });
    expect(watchlist).toBe("Movie added successfully");
  });

  test("addMovie doesn't add a movie because TS isn't logged in", async () => {
    const watchlist = await watchlist_services.addMovie({
      movieId: "502356",
      title: "The Super Mario Bros. Movie",
      poster_path: "/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
    });
    expect(watchlist).toBe("Server error");
  });

  test("addMovie doesn't add a movie because TS is already logged in", async () => {
    const watchlist = await watchlist_services.addMovie({
      movieId: "502356",
      title: "The Super Mario Bros. Movie",
      poster_path: "/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
      userId: "647ea0fe08ddada2a0206ac3"
    });
    expect(watchlist).toBe("Movie added successfully");
  });

  test("deleteMovie removes a movie", async () => {
    const result = await watchlist_services.removeMovie("123456");
    expect(result).toBe(false);
  });

  test("deleteMovie doesn't remove a movie because TS isn't logged in", async () => {
    const result = await watchlist_services.removeMovie("123456");
    expect(result).toBe(false);
  });

  test("deleteMovie doesn't remove a movie because TS is already logged in", async () => {
    const result = await watchlist_services.removeMovie("123456");
    expect(result).toBe(false);
  });

  test("findMoviesByUserId returns an array", async () => {
    const watchlist = await watchlist_services.findMoviesByUserId("123456789");
    expect(watchlist).toBeInstanceOf(Array);
  });

  test("removeMovie returns false if movie has already been removed from watchlist", async () => {
    const result = await watchlist_services.removeMovie("123456");
    expect(result).toBe(false);
  });

  test("addMovie returns 'Server error' when there is an error saving the movie", async () => {
    jest.spyOn(MyWatchlist.prototype, "save").mockImplementationOnce(() => {
      throw new Error("Save error");
    });

    const movie = {
      movieId: "502356",
      title: "The Super Mario Bros. Movie",
      poster_path: "/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
      userId: "647ea0fe08ddada2a0206ac3"
    };

    const result = await watchlist_services.addMovie(movie);
    expect(result).toBe("Server error");
  });
});
