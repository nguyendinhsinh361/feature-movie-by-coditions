const categoryController = require("../controller/categoryController");
const Category = require("../models/Category");
const router = require("express").Router();
const verify = require("../verifyToken");

//ADD CATEGORY
router.post("/", verify, categoryController.addCategory);
//GET ALL CATEGORIES
router.get("/", verify, categoryController.getAllCategory);
//GET ONE CATEGORY
router.get("/:id", categoryController.getOneCategory);
//UPDATE CATEGORY
router.put("/:id", verify, categoryController.updateCategory);
//DELETE CATEGORY
router.delete("/:id", verify, categoryController.deleteCategory);

module.exports = router;
