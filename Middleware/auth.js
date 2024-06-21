const { validateToken } = require("../Service/auth");

function chechForAuthenticationCookie(cookieName){
  return (req, res, next)=> {
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) {
      return next();
    }

    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
      next();
    } catch (error) {
      return next(error); // Pass the error to the next middleware
    }
  }
}

module.exports = {
  chechForAuthenticationCookie
}