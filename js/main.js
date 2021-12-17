const mysql = require('mysql');
const express = require('express');
const app = express();
const router = express.Router();
const template = require('./lib/su_template.js');
const style_list = require('./lib/su_style_list.js');
const bodyParser = require('body-parser');
const sign_upRouter = require('./sign_up');
const communityRouter = require('./community');

app.use('/', sign_upRouter);
app.use('/', communityRouter);
app.use(function(request, response, next) {
    response.status(404).send('Sorry cant find it.')
})
app.listen(3000, function() {
    console.log('port 3000')
});