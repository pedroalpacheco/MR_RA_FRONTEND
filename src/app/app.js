const express = require('express');
const Controllers = require('../controllers');
const app = express();
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.redirect('/search');
});
app.use('/search', Controllers.search);
app.use('/searching', Controllers.searching);
app.use(express.static('public'));

module.exports = app;