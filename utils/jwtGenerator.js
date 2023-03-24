const jwt = require("jsonwebtoken");
require("dotenv").config();

function jwtGenerator(user_id,name,email) {
  const payload = {
    user: {
      id: user_id,
      name:name,
      email:email
    },
  };

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1w" });
}

module.exports = jwtGenerator;
