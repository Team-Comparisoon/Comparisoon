const express = require('express');
const router = express.Router();

router.use('/categories', (req, res) => res.status(200).json({
  message: 'categories'
}));

router.use('/items', (req, res) => res.status(200).json({
  message: 'items'
}));

router.use('/compare', (req, res) => res.status(200).json({
  message: "In Compare"
}));
// router.get('/test', (req,res)=> res.status(200).json("testing"))

module.exports = router;