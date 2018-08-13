
const express = require('express');
const request = require('request');
const cors = require('cors');
const app = express();

const corsOptions = {
  origin: 'https://ngweather.tk',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));


app.get('/api/forecast', function (req, res) {
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
});

app.get('/api/location', function (req, res) {
    const location = req.query.q;
    let url = `https://query.yahooapis.com/v1/public/yql?q=select location.city,location.region,item.lat,item.long from weather.forecast where woeid in (select woeid from geo.places(1) where text="${location}")&format=json`;

    // configure the get request url
    const options = {
        url: url,
        json: true
    };

    request.get(options, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            res.json(body);
        }
    });
});

app.get('/api/ip', function (req, res) {
    const ip = req.headers['x-forwarded-for'] || 
        req.connection.remoteAddress || 
        req.socket.remoteAddress ||
        (req.connection.socket ? req.connection.socket.remoteAddress : null);
    const access_key = process.env.IPSTACK_ACCESS_KEY; // your access key

    // configure the get request url
    const options = {
        url: `http://api.ipstack.com/${ip}?access_key=${access_key}&format=1`,
        json: true
    };

    request.get(options, (error, response, body) => {
        if (!error && response.statusCode === 200) {

            res.json(body);
        }
    });
});

// console.log('Listening on 8080');
app.listen(8080);
