const express = require('express');
const app = express();
const path = require('path');
const proxy = require('http-proxy-middleware');
var https = require("https");

app.use(express.static(__dirname + '/dist/family-tree-client'));
// Start the app by listening on the default
// Heroku port

app.use("/api/*", proxy("/api", {
  "target": "https://nk-tree.herokuapp.com/",
  "changeOrigin": true,
  "logLevel": "debug",
  "pathRewrite": {
    "^/api":"/api"
  }
}));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/family-tree-client/index.html'));
});

// If an incoming request uses
// a protocol other than HTTPS,
// redirect that request to the
// same url but with HTTPS
const forceSSL = function() {
  return function(req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
        ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
}
// Instruct the app
// to use the forceSSL
// middleware
app.use(forceSSL());

const TWO_7_MINS = 27 * 60 * 1000;

/*setInterval(function() {
    https.get("https://nk-tree.herokuapp.com/", function(res) {
        const { statusCode } = res;
        console.log('StatusCode: ' + statusCode);
    });
}, TWO_7_MINS);*/


app.listen(process.env.PORT || 8080);
