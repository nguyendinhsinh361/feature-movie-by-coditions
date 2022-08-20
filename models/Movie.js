const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    thumb_url: {
      type: String,
      required: true,
    },
    poster_url: {
      type: String,
      required: true,
    },
    trailer_url: {
      type: String,
    },
    type: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    category: {
      type: [String],
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
