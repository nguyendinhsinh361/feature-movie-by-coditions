const Category = require("../models/Category");

const categoryController = {
  addCategory: async (req, res) => {
    if (req.user.isAdmin) {
      try {
        const newCategory = new Category(req.body);
        const saveCategory = await newCategory.save();
        res.status(201).json(saveCategory);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed");
    }
  },
  getAllCategory: async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getOneCategory: async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateCategory: async (req, res) => {
    if (req.user.isAdmin) {
      try {
        const updateCategory = await Category.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updateCategory);
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(403).json("You are not allowed");
    }
  },
  deleteCategory: async (req, res) => {
    if (req.user.isAdmin) {
      try {
        await Category.findByIdAndDelete(req.params.id);
        res.status(200).json("Delete successfully");
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(403).json("You are not allowed");
    }
  },
};

module.exports = categoryController;
