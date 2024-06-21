const express = require("express");
const { hanldleGetAddDataForm, handleCreateMovie, handleDeleteMovie, handleEditTheMovie, handleGetMovieBeforeEdit, handleGetViewPage, handleComment } = require("../Controllers.js/movieController");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

router.get("/addData", hanldleGetAddDataForm);
router.post("/addData",upload.single('video'), handleCreateMovie)
router.get("/editData/:id", handleGetMovieBeforeEdit)
router.post("/editinfo/:id",upload.single('video'), handleEditTheMovie )
router.get("/deleteData/:id", handleDeleteMovie);

router.get("/view/:id", handleGetViewPage);

router.post("/comment/:movieId", handleComment)

module.exports = router;