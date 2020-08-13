const express = require("express");
const router = express.Router();
const categoriesRouter = require("./categoriesRouter");

router.use("/categories", categoriesRouter);

router.use("/items", (req, res) =>
  res.status(200).json({
    message: "items",
  })
);

router.use("/compare", (req, res) =>
  res.status(200).json({
    message: "In Compare",
  })
);

module.exports = router;
