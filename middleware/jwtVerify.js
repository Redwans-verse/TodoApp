const jwt = require("jsonwebtoken");
const profileModel = require("../model/profileModel");

const verifyToken = async (req, res, next) => {
  const { token } = req.headers;

  try {
    const tokenV = await jwt.verify(token, process.env.SECRET_KEY);

    const profile = await profileModel.findOne({ username: tokenV.username });
    const userName = profile.username;
    req.headers.username = userName;
    // console.log(userName)

    next();
  } catch (error) {
    res.status(401).json({status:"auth faild",data:error.message})
  }
};

module.exports = verifyToken;
