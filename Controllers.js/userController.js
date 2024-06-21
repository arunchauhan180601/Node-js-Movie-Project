const User = require("../Models/userModel");


function handleGetUserSignupForm(req, res){
  try {
    return res.render("signup");
  } catch (error) {
     console.log(error);
     return res.status(500).json({msg: "Internal Server Error"});
  }
}

async function handleUserSignup(req, res){
  try {
    const body = req.body;

    if(!body ||
       !body.fullName ||
       !body.email ||
       !body.password
    ){
      return res.status(400).json({msg:"All Fields Are Required"});
    }

    await User.create({
      FullName: body.fullName,
      Email: body.email,
      Password: body.password
    })

    return res.redirect("/")
  } catch (error) {
    console.log(error);
    return res.status(500).json({msg: "Internal Server Error"});
  }
}

function handleGetUserSigninForm(req, res){
  try {
    return res.render("signin");
  } catch (error) {
     console.log(error);
     return res.status(500).json({msg: "Internal Server Error"});
  }
}

async function handleUserSignin(req, res){
  const {email, password} = req.body;
  try {
   
  const token = await User.matchPasswordAndGenerateToken(email, password);

  return res.cookie("token", token).redirect("/")

  } catch (error) {
    return res.render("signin", {
      error: "Invalid Email or Password"
    });
  }
}
function handleDoLogout(req, res){
  res.clearCookie("token").redirect("/")
}

module.exports = {
  handleGetUserSignupForm,
  handleUserSignup,
  handleGetUserSigninForm,
  handleUserSignin,
  handleDoLogout
}