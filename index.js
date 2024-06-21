const express = require("express");
const connectDB = require("./connection");
const path= require("path")
const app = express();
const PORT = 3000;
const userRoutes = require("./Routes/userRoute");
const movieRoutes = require("./Routes/movieRoutes")
var cookieParser = require('cookie-parser')
const { chechForAuthenticationCookie } = require("./Middleware/auth");
const Movie = require("./Models/movieModel");
connectDB("mongodb://127.0.0.1:27017/final_movie_Project").then(()=> {console.log("MongoDb Connected")}).catch((error)=> {console.log(error)});

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use( "/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.resolve("./public")));
app.use(cookieParser())
app.use(chechForAuthenticationCookie("token"));

// ejs
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.get("/", async(req, res)=> {
  try {
    const movies = await Movie.find({});
    return res.render("home", {
      user: req.user,
      Movies: movies
    })
  } catch (error) {
     console.log(error);
     res.status(500).json({msg: "Internal Server Error"});
  }
})

app.use(userRoutes);
app.use(movieRoutes);

app.listen(PORT, ()=> {
  console.log(`Server Started at Port: ${PORT}`);
})