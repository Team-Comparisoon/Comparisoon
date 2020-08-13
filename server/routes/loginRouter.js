const express = require("express");
const router = express.Router();
const {
  getGitHubData,
  storeId,
  setCookie,
} = require("../controllers/loginController.js");

router.get("/callback", getGitHubData, storeId, setCookie, (req, res) => {
  // TODO: either send back index.html or redirect to '/' ??
  //res.status(200).json(res.locals.oauthData);
  if (process.env.NODE_ENV === 'production') {
    res.status(200).redirect("/");
  }
  else res.status(200).redirect("http://localhost:8080");
});

router.get("/", (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`
  );
});

module.exports = router;
