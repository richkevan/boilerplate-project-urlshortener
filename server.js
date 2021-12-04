require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
const shortid = require('shortid');
const url = require('url');
const pug = require('pug');

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.locals.basedir = __dirname;

app.use('/public', express.static(__dirname + `/public`));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/', function(req, res) {
  res.render('index');
});

app.use(express.urlencoded({ extended: true }));

let urls = new Object();

app.post('/api/shorturl', function(req, res) {
    const httpRegex = /^(http|https)(:\/\/)/;
    if (!httpRegex.test(req.body.url)) {return res.json({ error: 'invalid url' })}
    const {href, host, pathname, protocol } = new URL(req.body.url);
    let short = shortid.generate();
    urls[`${short}`] = [href,short]
    res.render('short',{original_url : href, short_url : short , base: req.get('host')})
  });

app.get('/:short_url', function (req, res) {
  res.redirect(urls[req.params.short_url][0]);
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
