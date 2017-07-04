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

app.use((req, res, next) => {
  const {tweets} = req.cookies;

  let sortedTweets = tweets;

  //console.log(`Before: ${sortedTweets}`);

  for (let i = 0; i < sortedTweets.length-1; i +=1){
    for (let j = 0; j < sortedTweets.length-1; j +=1){
      if(sortedTweets[j][1].length < sortedTweets[j+1][1].length){
        let temp = sortedTweets[j];
        sortedTweets[j] = sortedTweets[j+1];
        sortedTweets[j+1] = temp;
      }
    }
  }

  //console.log(`After: ${sortedTweets}`);

  res.locals.tweets = sortedTweets;

  //console.log(res.locals.tweets);
  next();
});

// URL: http://localhost:4545 HTTP VERB: GET
app.get('/', (req, res) => {
  res.render('index');
});

// URL: http://localhost/dash:4545 HTTP VERB: GET
app.get('/dash', (req,res) => {
  res.render('dash');
});

// URL: http://localhost/dash:4545 HTTP VERB: POST
app.post('/dash', (req, res) => {
  const {username} = req.body;
  const {newEntry} = req.body;
  let tweetArr = [];
  if(req.cookies.tweets){
    tweetArr = req.cookies.tweets;
  }

  tweetArr.push([username, newEntry, new Date().toDateString()]);
  console.log(tweetArr);
  res.cookie('tweets', tweetArr, {maxAge: 1000*60*60*24});

  res.redirect('dash');
});


const PORT = 4545;
app.listen(PORT, ()=> {
  console.log(`Server listening on localhost:${PORT}`);
});
