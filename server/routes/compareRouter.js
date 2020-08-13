const express = require("express");
const router = express.Router();
// const compareController = require("../controllers/compareController.js");
const { getItemsToCompare } = require("../controllers/compareController.js");

router.get("/:categoryId", getItemsToCompare, (req, res) => {
  res.status(200).json(res.locals.data);
});

module.exports = router;
