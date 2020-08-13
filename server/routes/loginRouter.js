const express = require("express");
const path = require('path');
const router = express.Router();
const {
  getGitHubData,
  storeId,
  setCookie,
} = require("../controllers/loginController.js");

router.get("/callback", getGitHubData, storeId, setCookie, (req, res) => {
  console.log('end of callback chain');
  res.status(200).redirect('/');
  //res.status(200).json(res.locals.oauthData);
});

router.get("/", (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`
  );
});

module.exports = router;