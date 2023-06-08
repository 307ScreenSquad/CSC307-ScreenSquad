const Movie_User = require('./user.js');
const user_services = require('../controllers/user-services.js');
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



test('user services registers user successfully', async () => {
  const movie_user = new Movie_User({
    name: 'Test User',
    email: 'john@john.com',
    password: 'password',
    isAdmin: false,
  });
  
  const validationError = await user_services.addUser(movie_user);
  expect(validationError).toBe('User registered successfully');
  
}
);

test('user services find user by email', async () => {
  const movie_user = new Movie_User({
    __v: 0,
    name: 'Test User',
    email: 'john@john.com',
    password: 'password',
    isAdmin: false,
  });


  const validationError = await user_services.findUserByEmail('john@john.com');
  expect(validationError[0].email).toBe(movie_user.email);
  
}
);

test('user services find user by id', async () => {
  const movie_user = new Movie_User({
    __v: 0,
    name: 'Test User',
    email: 'john@john.com',
    password: 'password',
    isAdmin: false,
  });


  const hold_user = (await user_services.findUserByEmail('john@john.com'))[0];
  const validationError = (await user_services.findUserById(hold_user._id))[0];
  expect(validationError).toStrictEqual(hold_user);
  
}
);

test('user services find user by id fails', async () => {
  const movie_user = new Movie_User({
    __v: 0,
    name: 'Test User',
    email: 'john@john.com',
    password: 'password',
    isAdmin: false,
  });
  const validationError = await user_services.findUserById(7894423897);
  expect(validationError).toBe(undefined);
}
);

test('user services throw error for duplicate user', async () => {
  const movie_user = new Movie_User({
    __v: 0,
    name: 'Test User',
    email: 'john@john.com',
    password: 'password',
    isAdmin: false,
  });


  const validationError = await user_services.addUser(movie_user);
  expect(validationError).toBe('User already exists');
  
}
);

test('user services edit user name to Hello World', async () => {
  const movie_user = new Movie_User({
    __v: 0,
    name: 'Test User',
    email: 'john@john.com',
    password: 'password',
    isAdmin: false,
  });

  const movie_user_edits = {
    name: 'Hello World'
  }


  let foundUser = (await user_services.findUserByEmail(movie_user.email))[0];
  const validationError = await user_services.editUser(foundUser._id, movie_user_edits);
  expect(validationError.name).toBe('Hello World');
  
}
);

test('user services edit user name fails due to Id', async () => {
  const movie_user = new Movie_User({
    __v: 0,
    name: 'Test User',
    email: 'john@john.com',
    password: 'password',
    isAdmin: false,
  });

  const movie_user_edits = {
    name: 'Hello World'
  }


  let foundUser = (await user_services.findUserByEmail(movie_user.email))[0];
  const validationError = await user_services.editUser(1238904128, movie_user_edits);
  await user_services.removeUser(foundUser._id)
  expect(validationError).toBe(false);
  
}
);

test('user services remove user fails due to id', async () => {

  const validationError = await user_services.removeUser('148929821694')
  expect(validationError).toBe(null);
  
}
);

test('user services get all users', async () => {

  const validationError = await user_services.getAllUsers();
  expect(validationError.length).toBeGreaterThan(1);

}
);


test('user services get all users', async () => {
  
    const validationError = await user_services.getAllUsers();
    expect(validationError.length).toBeGreaterThan(1);
  
  }
  );