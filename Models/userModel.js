const mongoose = require("mongoose");
const {createHmac, randomBytes} = require("crypto");
const { createTokenForUser } = require("../Service/auth");
const userSchema = new mongoose.Schema({
  FullName: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true
  },
  Salt: {
    type: String,
    required: false
  },
  Password: {
    type: String,
    required: true
  },
  ProfileImageUrl: {
    type : String,
    default: "/Images/default.jpg"
  },
  Role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER"
  }
},{
  timestamps: true
});


userSchema.pre("save", function(next){
  const user = this;

  if(!user.isModified("Password")) return ;

  const Salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", Salt).update(user.Password).digest("hex");

  this.Salt = Salt;
  this.Password = hashedPassword;

  next();
})

userSchema.static("matchPasswordAndGenerateToken", async function(email, password){
  const user =  await this.findOne({Email: email});

  if(!user) throw new Error("User Not Found!");

  const salt = user.Salt;
  const hashedPassword = user.Password

  const userProvidedHash = createHmac("sha256", salt).update(password).digest("hex");
 
  if(hashedPassword !== userProvidedHash) throw new Error("Incorrect Password");

  const token = createTokenForUser(user);

  return token;

})

const User = mongoose.model("Users", userSchema);

module.exports = User;