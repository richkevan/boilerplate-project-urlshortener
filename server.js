require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const shortid = require('shortid');
const dns = require('dns');

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
  dns.lookup(req.body.url, (err, address, family) => {
    if (err) {
      res.json({ error: 'invalid URL' });
    }
    else {
      let url = req.body.url;
    let short = shortid.generate();
    urls[`${short}`] = [url,short]
    res.json({orginal_url: url, short_url: short });
    }
  });
})

app.get('/api/shorturl/:short_url', function (req, res) {
  res.redirect(`https://${urls[req.params.short_url][0]}`);
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
