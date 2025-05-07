const jwt = require("jsonwebtoken");
const { users } = require("../config/database");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const saltRounds = 10;

exports.register = async (username, email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    let newUser = {
      id: uuidv4(),
      username,
      email,
      password: hashedPassword,
      participatedProjects: [],
      ownedProjects: [],
    };
    users.push(newUser);
    return { ...newUser };
  } catch (err) {
    throw new Error("Regiter failed");
  }
};

const secret_key = "asdfghjkl";

exports.login = (email, password) => {
  const foundUser = users.find(
    (user) => user.email === email && user.password === password
  );
  if (!foundUser) {
    return null;
  }

  const token = jwt.sign(foundUser, secret_key, { expiresIn: "1h" });
  return { token, id: foundUser.id };
};

exports.getAllUsers = () => {
  return users;
};

exports.getUserById = (id) => {
  const user = users.find((user) => user.id === id);
  if (!user) {
    throw new Error("User not found!");
  }
  return { ...user };
};
