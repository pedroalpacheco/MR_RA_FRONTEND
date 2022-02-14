const express = require('express');
const router = express.Router();
const classoperationmongo = require('../models/classoprationmongo');

router.use(express.json());

router.get('/', async (req, res) => {
  const buscando = req.query.search;
  const pagina = parseInt(req.query.pg || 1);

  if (buscando) {
    const setpage = Math.sign(pagina);
    if (setpage === 1) {
      const dados = await classoperationmongo.searchall(buscando, pagina);
      res.render('../views/busca', { reclames: dados, buscando });
    } else {
      res.render('../views/index');
    }
  } else {
    res.render('../views/index');
  }
});

module.exports = router;