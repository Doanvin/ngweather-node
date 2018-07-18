
const express = require('express');
const request = require('request');
const cors = require('cors');
const app = express();

app.use(express.static(__dirname + ''))
    .use(cors());


app.get('/search', function (req, res) {

    const base_url = 'https://api.darksky.net/forecast';
    const client_secret = ''; // Your secret
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


//console.log('Listening on 8888');
app.listen(8888);
