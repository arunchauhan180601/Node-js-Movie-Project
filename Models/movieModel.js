const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  Title:{
    type: String,
    required:true
  },
  ProductionName: {
    type: String,
    required:true
  },
  Body: {
    type: String,
    required:true
  },
  Video: {
    type: String,
    required: false
  },
  CreatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  }
},{
  timestamps: true
});


const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;