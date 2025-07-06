const { User, Task } = require("../models/index.js");
const { asyncWrapper } = require("../middlewares/asyncWrapper.middleware.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signUp = asyncWrapper(async function (req, res) {
  const { username, email, password } = req.body;
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  const userData = {
    id: user.id,
    username: user.username,
    email: user.email,
  };

  res.status(201).send({ token, user: userData });
});

exports.logIn = asyncWrapper(async function (req, res) {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.status(401).send("Invalid email or password");
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).send("Invalid email or password");
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  const taskCount = await Task.count({ where: { userId: user.id } });

  const userData = {
    id: user.id,
    username: user.username,
    email: user.email,
    taskCount,
  };

  res.status(200).send({ token, user: userData });
});
