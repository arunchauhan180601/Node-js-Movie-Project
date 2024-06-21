const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  Content: {
    type: String,
    required: true
  },
  CreatedBy : {
    type:  mongoose.Schema.Types.ObjectId,
    ref: "Users"
  },
  movieId: {
    type:  mongoose.Schema.Types.ObjectId,
    ref: "Movie"
  }
},{
  timestamps: true
})

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment