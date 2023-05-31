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

test('user model catches password too short', () => {
    const movie_user = new Movie_User({
      name: 'Test User',
      email: 'john@john.com',
      password: 'pass',
      isAdmin: false,
    });
    
    const validationError = movie_user.validateSync();
  
    expect(validationError.errors.password).toBeTruthy();
  });
  
test('user model catches invalid email (no @)', () => {
    const movie_user = new Movie_User({
      name: 'Test User',
      email: 'johnjohn.com',
      password: 'password',
      isAdmin: false,
    });
    
    const validationError = movie_user.validateSync();
  
    expect(validationError.errors.email).toBeTruthy();
  }
);

test('user model catches invalid email (no .com)', () => {
    const movie_user = new Movie_User({
      name: 'Test User',
      email: 'john@john',
      password: 'password',
      isAdmin: false,
    });
    
    const validationError = movie_user.validateSync();
  
    expect(validationError.errors.email).toBeTruthy();
  }
);