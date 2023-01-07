const profileModel = require("../model/profileModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Register

exports.profileRegister = async (req, res) => {
  const { name, username, password, phone, email } = req.body;
  try {
    //exit user
    const exit = await profileModel.findOne({ username: username });
    if (exit) {
      return res.status(404).json("username already exit");
    }
    //password length

    if (password.length < 6) {
      return res.status(404).json("password is too short");
    }

    //hass password
    const hasspass = await bcrypt.hash(password, 10);

    const user = await profileModel.create({
      name: name,
      username: username,
      password: hasspass,
      phone: phone,
      email: email,
    });
    return res.status(200).json({ status: "success", data: user });
  } catch (error) {
    return res.status(400).json({ status: "faild", data: error });
  }
};

//login profile

exports.profileLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    //exit user
    const isExist = await profileModel.findOne({ username: username });
    if (!isExist) {
      return res.status(404).json("user not exist");
    }

    //unhash password
    const match = await bcrypt.compare(password, isExist.password);

    //pass not match

    if (!match) {
      return res.status(404).json("unauthorized login");
    }

    //generate token
    const token = await jwt.sign(
      { username: isExist.username },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res
      .status(201)
      .json({ status: "login success", data: isExist, token: token });
  } catch (error) {
    res.status(401).json({ status: "login fails", data: error });
  }
};

//select profile

exports.selectProfile = async (req, res) => {
  const username = req.headers.username;

  try {
    const select = await profileModel.find({ username: username });
    if (select) {
      return res.status(201).json({ status: "success", data: select });
    }
  } catch (error) {
    return res.status(404).json(error);
    console.log(error);
  }
};

//Update profile profile

exports.updateProfile = async (req, res) => {
  const username = req.headers.username;

  try {
    const update = await profileModel.updateMany(
      { username: username },
      {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
      }
    );

    const updateData = await profileModel.findOne({ username: username });
    return res.status(201).json({ status: update, dataData: updateData });
  } catch (error) {
    return res.status(401).json({ status: "faild", data: error.message });
  }
};
