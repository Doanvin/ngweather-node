
const express = require('express');
const request = require('request');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(express.static(__dirname + ''));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/search', function (req, res) {

    const base_url = 'https://api.darksky.net/forecast';
    const client_secret = process.env.DARKSKY_SECRET; // Your secret
    const lat = req.query['latitude'];
    const long = req.query['longitude'];

    // configure the get request url
    const options = {
        url: `${base_url}/${client_secret}/${lat},${long}`,
        json: true
    };

    request.get(options, (error, response, body) => {
        if (!error && response.statusCode === 200) {

            res.json(body);
        }
    });


})


//console.log('Listening on 8080');
app.listen(8080);
