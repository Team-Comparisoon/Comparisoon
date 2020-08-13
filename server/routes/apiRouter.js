const express = require("express");
const router = express.Router();
const categoriesRouter = require("./categoriesRouter");
const itemsRouter = require("./itemsRouter");

router.use("/categories", categoriesRouter);

router.use("/items", itemsRouter);

router.use("/compare", (req, res) =>
  res.status(200).json({
    message: "In Compare",
  })
);

module.exports = router;
