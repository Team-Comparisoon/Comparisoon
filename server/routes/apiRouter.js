const express = require("express");
const router = express.Router();
const categoriesRouter = require("./categoriesRouter");
const itemsRouter = require("./itemsRouter");
const compareRouter = require("./compareRouter");

router.use("/categories", categoriesRouter);

router.use("/items", itemsRouter);

router.use("/compare", compareRouter);

module.exports = router;
