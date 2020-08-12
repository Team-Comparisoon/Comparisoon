const express = require("express");
const router = express.Router();
const {
  getCategories,
  insertCategory,
  getCategoryById,
} = require("../controllers/categoriesController.js");

router.get("/", getCategories, (req, res) => {
  res.status(200).json(res.locals.categories);
});

router.post("/", insertCategory, (req, res) => {
  res.sendStatus(200);
});

router.get("/:categoryId", getCategoryById, (req, res) => {
  res.status(200).json(res.locals.category);
});

module.exports = router;
