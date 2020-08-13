const express = require("express");
const router = express.Router();
const { getItems, insertItems } = require("../controllers/itemsController.js");

router.get("/", getItems, (req, res) => {
  res.status(200).json(res.locals.items);
});

router.post("/", insertItems, (req, res) => {
  res.status(200).json("Inserted");
});

module.exports = router;
