const mongoose = require("mongoose");
const userModel = require("./user");
const dotenv = require("dotenv")
const bcrypt = require('bcrypt');
//mongoose.set("debug", true);
dotenv.config();

mongoose
  .connect("mongodb://127.0.0.1:27017/users", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((error) => console.log(error));

/*
async function getUsers(name, job) {
  let result;
  if (name === undefined && job === undefined) {
    result = await userModel.find();
  } else if (name && !job) {
    result = await findUserByName(name);
  } else if (job && !name) {
    result = await findUserByJob(job);
  }
  else if (name && job) {
    result = await findUserByNameAndJob(name, job);
  }
  return result;
}
*/
async function findUserByEmail(email) {
  return await userModel.find({email: email });
}

async function getAllUsers(email) {
  let result = await userModel.find();
  return result;
}


async function findUserById(id) {
  try {
    let user = await userModel.find({ _id: id });
    //console.log('found user', user);
    return user;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

async function addUser(user) {
  try {
    // check if user with the same email already exists
    const existingUser = await findUserByEmail(user.email);
    if (existingUser.length > 0) {
      //return res.status(400).json({ message: 'User already exists' });
      return 'User already exists';
    }

    // create a new user document and save it to the database
    const newUser = new userModel(user);
    await newUser.save();
    //return res.status(201).json({ message: 'User registered successfully' });
    return 'User registered successfully';
  } catch (err) {
    console.error(err);
    //res.status(500).json({ message: 'Server error' });
    return 'Server error';
  }
}

async function loginUser(email, password){
  try {
    // find user by email
    const user = await findUserByEmail(email);
    if (!user) {
      return 'Invalid email or password'
    }
    // compare password with hashed password in database
    let i = 0;
    for(i = 0; i < user.length; i++){
      let individual_user = user[i];
      let passwordMatch = await bcrypt.compare(password, individual_user.password);
      if(passwordMatch){
        break;
      }
    }
    if (i == user.length) {
      return 'Invalid email or password'
    }
    return 'Login successful'
  } catch (err) {
    console.error(err);
    return 'Server error';
  }
}

async function removeUser(user_id) {
  try {
    const userToDelete = await userModel.findByIdAndDelete({_id: user_id});
    return userToDelete;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function findUserByName(name) {
  return await userModel.find({ name: name });
}

async function findUserByJob(job) {
  return await userModel.find({ job: job });
}

async function findUserByNameAndJob(name, job) {
  return await userModel.find({ name: name, job: job });
}

async function findUserByEmail(email) {
  return await userModel.find({ email: email });
}

async function editUser(id, bodyData){
  try {
    const userToUpdate = await userModel.findOneAndUpdate({_id: id}, bodyData);
    console.log('user', userToUpdate)
    return userToUpdate;
  } catch (error) {
    console.log(error);
    return false;
  }
}



//exports.getUsers = getUsers;
exports.findUserById = findUserById;
exports.addUser = addUser;
exports.removeUser = removeUser;
exports.loginUser = loginUser;
exports.getAllUsers = getAllUsers;
exports.editUser = editUser;
exports.findUserByEmail = findUserByEmail;
