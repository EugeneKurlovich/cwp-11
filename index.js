const express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const logger = require('morgan');

const films_controller = require('./route/films');
const actors_controller = require('./route/actors');
const images_controller = require('./route/images');

const app = express();

let accessLogStream = fs.createWriteStream(path.join(__dirname + '/logs/', 'access.log'), {flags: 'a'});

app.use(logger('dev'));
app.use('/api/*', logger('short', {stream: accessLogStream}));
app.use( bodyParser.json()); 


app.use(express.static(path.join(__dirname, 'public')));
app.use('/images/actors', images_controller);
app.use('/api/films', films_controller);
app.use('/api/actors', actors_controller);


app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
})