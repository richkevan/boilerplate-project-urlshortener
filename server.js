require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const shortid = require('shortid');
const url = require('url');

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.use(express.urlencoded({ extended: true }));

let urls = new Object();

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', function(req, res) {
    const httpRegex = /^(http|https)(:\/\/)/;
    if (!httpRegex.test(originalURL)) {return res.json({ error: 'invalid url' })}
    const {href, host, pathname, protocol } = new URL(req.body.url);
    let short = shortid.generate();
    urls[`${short}`] = [href,short]
    res.json({original_url : href, short_url : short });
  });

app.get('/api/shorturl/:short_url', function (req, res) {
  res.redirect(urls[req.params.short_url][0]);
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
