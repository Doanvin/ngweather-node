# NGWEATHER Node.JS Proxy Server
## Use
This is the back end api for ngweather.tk.

## Endpoints
No CORS.

### /api/ip
Attempts to get approximate user location using ip stack api call.
* Method: GET
* Params: 
  * None, uses users ip address
  
Example Response
```
{
  "ip":	"xxx.xx.xxx.xx"
  "type":	"ipv4"
  "continent_code":	"NA"
  "continent_name":	"North America"
  "country_code":	"US"
  "country_name":	"United States"
  "region_code":	"CA"
  "region_name":	"California"
  "city":	"Fremont"
  "zip":	"94536"
  "latitude":	37.567
  "longitude":	-121.9829
  "location":	
  {
    "geoname_id":	5350734,
    "capital":	"Washington D.C."
  },
  "languages":	
  [
    0:	
    {
      "code":	"en",
      "name":	"English",
      "native":	"English"
    }
  ],
  "country_flag":	"http://assets.ipstack.com/flags/us.svg",
  "country_flag_emoji":	"🇺🇸",
  "country_flag_emoji_unicode":	"U+1F1FA U+1F1F8",
  "calling_code":	"1",
  "is_eu":	false
}
```


### /api/location
Attempts to get a location from user input.
* Method: GET
* Params:
  * location: city, state || zip code

Example Response
```
{
  "query":
  {
    "count":1,
    "created":
    "2018-08-18T02:36:46Z",
    "lang":"en-US",
    "results":
    {
      "channel":
      {
        "location":
        {
          "city":"Fremont",
          "region":" CA"
        },
        "item":
        {
          "lat":"37.526112",
          "long":"-121.985458"
        }
      }
    }
  }
}
```

To get lat and long use `query.results.channel.item.lat` and `query.results.channel.item.long`.

To get city and state use `query.results.channel.location.city` and `query.results.channel.location.region`

### /api/forecast
Get forecast using darksky.net weather api.
* Method: GET
* Params: 
  * lat: latitude of requested location
  * long: longitude of requested location

Example Request
```
https://api.darksky.net/forecast/[your-secret-key]/37.5293656,-122.0786825
```
Example Response

Refer to [Dark Sky API — Overview](https://darksky.net/dev/docs) form more detailed information.
```
{
  "latitude": 37.5293656,
  "longitude": -122.0786825,
  "timezone": "America/Los_Angeles",
  "currently": {...},
  "minutely": {...},
  "hourly": {...},
  "daily": {...},
  "flags": {...},
  "offset": -7
}
```
