const express = require("express");
const { handleGetUserSignupForm, handleUserSignup, handleGetUserSigninForm, handleUserSignin, handleDoLogout } = require("../Controllers.js/userController");

const router = express.Router();


router.get("/signup", handleGetUserSignupForm);
router.post("/user/signup", handleUserSignup);

router.get("/signin", handleGetUserSigninForm);
router.post("/user/signin", handleUserSignin)
router.get("/logout", handleDoLogout)
module.exports = router;