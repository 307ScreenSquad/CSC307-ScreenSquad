const Movie_User = require('./user.js');
const mongoose = require('mongoose');

test('Movie_User model works as expected', () => {
    const movie_user = new Movie_User({
        name: "Test User",
        email: "johns@jon.com",
        password: "password",
        isAdmin: false,
    });
    expect(movie_user.name).toBe("Test User");
    expect(movie_user.email).toBe("johns@jon.com");
    expect(movie_user.password).toBe("password");
    expect(movie_user.isAdmin).toBe(false);
});

