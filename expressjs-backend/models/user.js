const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.toString().indexOf('@') == -1)
          throw new Error("Invalid email, must contain '@' to be valid email");
        if (value.toString().indexOf('.com') == -1 && value.toString().indexOf('.edu') == -1 && value.toString().indexOf('.org') == -1)
          throw new Error("Invalid email, must contain '.com' to be valid email");
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (value.length < 8)
          throw new Error("Invalid job, must be at least 8 characters.");
      },
    },
  },
  { collection: "movie_users_list" }
);

const Movie_User = mongoose.model("User", UserSchema);

module.exports = Movie_User;
