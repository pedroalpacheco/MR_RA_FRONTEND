const mongoose = require('mongoose');
const connection = require('./connection');
const AllReclamacao = require('./urlsiteschema');

const classoperationmongo = {
  start: () => {
    connection();
  },
  searchall: async (busca, num) => {
    try {
      await classoperationmongo.start();
      const listpage = 15;
      let skiping = 0;
      const searchRegex = await new RegExp(busca);
      if (isNaN(num) || num === 1) {
        skiping = 0;
      } else {
        skiping = (parseInt(num) - 1) * listpage;
      }
      const consultadados = await AllReclamacao.find({}).or([
        { titulo: searchRegex },
        { reclamacao: searchRegex },
      ]).skip(skiping)
        .limit(listpage);
      const contagem = await AllReclamacao.find({}).or([
        { titulo: searchRegex },
        { reclamacao: searchRegex },
      ])
        .count();
      let next;
      if (skiping + listpage >= contagem) {
        next = false;
      } else {
        next = true;
      }
      const resultado = {
        num,
        next,
        consultadados,
      };
      return resultado;
    } catch (error) {
      return error;
    }
  },
};

module.exports = classoperationmongo;