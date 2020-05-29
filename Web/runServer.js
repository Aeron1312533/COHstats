var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config.dev');
var port = 80;

var app = express();
var compiler = webpack(config);

app.get('/sitemap.xml', function(req, res) {
  res.sendFile(path.join(__dirname, 'sitemap.xml'));
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, function(err) {
  if (err) {
    console.log(err);
    return;
  }

    console.log('Listening at port' + port);
});
