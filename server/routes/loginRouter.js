const express = require("express");
const router = express.Router();
const {
  getGitHubData,
  storeId,
  setCookie,
} = require("../controllers/loginController.js");

router.get("/callback", getGitHubData, storeId, setCookie, (req, res) => {
  res.status(200).json(res.locals.oauthData);
});

router.get("/", (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`
  );
});

module.exports = router;
