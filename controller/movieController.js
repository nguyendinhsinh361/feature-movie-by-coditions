const Movie = require("../models/Movie");
const Category = require("../models/Category");

const movieController = {
  addMovie: async (req, res) => {
    if (req.user.isAdmin) {
      try {
        const newMovie = new Movie(req.body);
        const saveMovie = await newMovie.save();
        res.status(201).json(saveMovie);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed!");
    }
  },
  getAllMovie: async (req, res) => {
    try {
      const movies = await Movie.find();
      res.status(200).json(movies.reverse());
    } catch (error) {
      res.status(500).json(error);
    }
  },
  filterMovieByName: async (req, res) => {
    const nameMovie = req.params.name;
    try {
      const movies = await Movie.find({ 'name': {$regex: nameMovie, $options: 'i'}});
      res.status(200).json(movies.reverse());
    } catch (error) {
      res.status(500).json(error);
    }
  },
  filterMovieByCategory: async (req, res) => {
    const category = req.params.category;
    const resultCategory = await Category.findOne({value: category});

    try {
      if(resultCategory) {
        const movies = await Movie.find({ category: {$eq: resultCategory.value}});
        res.status(200).json(movies.reverse());
      }else {
        res.status(500).json(error);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAMovie: async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id);
      res.status(200).json(movie);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getRandomMovie: async (req, res) => {
    const type = req.params.type;
    let movie;
    try {
      if (type === "series") {
        movie = await Movie.aggregate([
          { $match: { isSeries: true } },
          { $sample: { size: 1 } },
        ]);
      } else {
        movie = await Movie.aggregate([
          { $match: { isSeries: false } },
          { $sample: { size: 1 } },
        ]);
      }
      res.status(200).json(movie);
    } catch (error) {
      res.status(500).json(err);
    }
  },

  updateMovie: async (req, res) => {
    if (req.user.isAdmin) {
      try {
        const updatedMovie = await Movie.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedMovie);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(403).json("You are not allowed");
    }
  },
  deleteMovie: async (req, res) => {
    if (req.user.isAdmin) {
      try {
        await Movie.findByIdAndDelete(req.params.id);
        res.status(200).json("Delete Successfully");
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(403).json("You are not allowed to delete");
    }
  },
};

module.exports = movieController;
