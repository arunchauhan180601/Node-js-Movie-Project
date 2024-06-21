const Comment = require("../Models/comment");
const Movie = require("../Models/movieModel");

function hanldleGetAddDataForm(req, res){
  try {
    return res.render("addData",{
      user: req.user
    })
  } catch (error) {
    console.log(error);
    return res.status(500).json({mag: "Internal Server Error"});
  }
}

async function handleCreateMovie(req, res){
  try {
    const body = req.body;

    let video = "";
    if(req.file){
      video = req.file.path 
    }

    if(!body ||
       !body.title ||
       !body.productionName ||
       !body.body
    ){
      return res.status(400).json({msg: "All Fields Are Required"});
    }

    await Movie.create({
      Title: body.title,
      ProductionName: body.productionName,
      Body:body.body,
      CreatedBy: req.user._id,
      Video: video

    })

    return res.redirect("/");

  } catch (error) {
    console.log(error);
    return res.status(500).json({mag: "Internal Server Error"});
  }
}

async function handleDeleteMovie(req, res){
  try {
    const id = req.params.id;
    await Movie.findByIdAndDelete(id);
    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(500).json({mag: "Internal Server Error"});
  }
}

async function handleGetMovieBeforeEdit(req, res){
  try {
   const id = req.params.id;
   let findMovie =  await Movie.findById(id);

   if(!findMovie){
       return res.status(400).json({ msg: "Movie Not Found"});
   }

   return res.render("edit", {
       editdata: findMovie,
       user: req.user

   })
  } catch (error) {
   console.log(error);
   return res.status(500).json({ msg: "Internal Server Error"});
  }
}

async function handleEditTheMovie(req, res) {
  try {
    const id = req.params.id;
    const body = req.body;

    if (req.file) {
      let video = req.file.path;  // Changed from image to video

      await Movie.findByIdAndUpdate(id, {
        Title: body.title,
        ProductionName: body.productionName,
        Body: body.body,
        Video: video  // Changed from Image to Video
      });
      // console.log("Movie details Updated with Video");
      return res.redirect("/");
    } else {
      await Movie.findByIdAndUpdate(id, {
        Title: body.title,
        ProductionName: body.productionName,
        Body: body.body,
      });
      // console.log("Movie details Updated without Video");
      return res.redirect("/");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

async function handleGetViewPage(req, res){
  try {
      const id = req.params.id;
      const movie = await Movie.findById(id).populate("CreatedBy");
      const comments = await Comment.find({movieId: req.params.id}).populate("CreatedBy")
     //  console.log(movie);
    
      return res.render("view",{
          movie: movie,
          user: req.user,
          comments
      }) 
  } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Internal Server Error"});
  }
}

async function handleComment(req, res){
  await Comment.create({
   Content : req.body.content,
   movieId: req.params.movieId,
   CreatedBy: req.user._id
 })

 return res.redirect(`/view/${req.params.movieId}`)
}

module.exports = {
  hanldleGetAddDataForm,
  handleCreateMovie,
  handleDeleteMovie,
  handleGetMovieBeforeEdit,
  handleEditTheMovie,
  handleGetViewPage,
  handleComment
}