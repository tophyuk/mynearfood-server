const jwt = require("jsonwebtoken");
const YOUR_SECRET_KEY = process.env.SECRET_KEY;

module.exports = {
  checkTokens(token) {
    try {
      return jwt.verify(token, YOUR_SECRET_KEY);
      // console.log(decoded)
    } catch (err) {
      return null;
    }
  },
};
