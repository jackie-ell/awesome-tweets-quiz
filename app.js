const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/dash', (req,res) => {
  res.render('dash');
});


const PORT = 4545;
app.listen(PORT, ()=> {
  console.log(`Server listening on localhost:${PORT}`);
});
