const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString(),
      log = `${now}: ${req.method} -- ${req.url}`;

  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('unable to append to server.log.');
    }
  });

  console.log(log);
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home', {
    titleTag: 'home page',
    title: 'home page',
    welcomeMsg: 'hello on my page',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    titleTag: 'about page',
    title: 'about title dyn',
    welcomeMsg: 'hello on my about',
  });
  // res.send('about page');
});

app.listen(3000, () => {
  console.log('server is up on port 3000');
});
