const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());


const PORT = 4545;
app.listen(PORT, ()=> {
  console.log(`Server listening on localhost:${PORT}`);
});
