const express = require('express');
const router = express.Router();

router.use(express.json());

router.get('/', async (req, res) =>{
  res.render('../views/index');
});

module.exports = router;