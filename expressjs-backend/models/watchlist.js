const mongoose = require("mongoose");

const MyWatchlistSchema = new mongoose.Schema(
    {
        movieId: {
            type: String,
            required: true,
            trim: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        poster_path: {
            type: String,
            required: true,
            trim: true,
        },
    },
    { collection: "watchlist"}
);

const MyWatchlist = mongoose.model("MyWatchlist", MyWatchlistSchema);
module.exports = MyWatchlist;