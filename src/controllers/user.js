const bcrypt = require("bcryptjs");
const User = require("../models/User");

async function createUser(user) {
  try {
    const password = user.password;

    user.password = await bcrypt.hash(password, 10);
    const newUser = await User.create(user);
    return newUser;
  } catch (err) {
    return err.message;
  }
}

// async function getUser(condition) {
//     try{
//         const users = await User.findAll(condition)
//         return users;
//     } catch(err) {
//         return err.message;
//     }
// }

module.exports = {
  // getUser,
  createUser,
};
