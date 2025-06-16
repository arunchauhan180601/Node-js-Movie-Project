const JWT = require("jsonwebtoken");

const secret = "$mapArun$123456";

function createTokenForUser(user){
  const payload = {
    _id: user._id,
    email: user.Email,
    profileImageUrl: user.ProfileImageUrl,
    role: user.Role
  }

  const token = JWT.sign(payload, secret);
  return token;
}

function validateToken(token){
  try {
    const payload = JWT.verify(token, secret);
    return payload;
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    throw error; // You might want to handle or propagate this error appropriately
  }
}

module.exports = {
  createTokenForUser,
  validateToken
}