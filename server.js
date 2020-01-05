const express = require('express');
const serveStatic = require('serve-static')
const path = require('path')

const app = express();


app.use('/', serveStatic(path.join(__dirname, './dist/build.js.map')));

const port = process.env.PORT || 9000;
app.listen(port);

console.log('Listening port at :' + port);