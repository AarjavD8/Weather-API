var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {trying:false});
});

router.post('/result', function(req, res){
  var city = req.body.City_name
  var api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3e2d2e171661649c4e81f2540d3ef143`

  axios.request(api).then(function (response) {
    console.log(response.data);
    var tmax = parseInt(response.data.main.temp_max) - 274;
    var t = parseInt(response.data.main.temp) - 274;
    var tmin = parseInt(response.data.main.temp_min) - 274;
    var fl = response.data.main.feels_like;
    var pres = response.data.main.pressure;
    var hum = response.data.main.humidity;
    var visi = response.data.visibility;
    var wind = response.data.wind;
    var clo = response.data.clouds;
    var status = response.data.weather[0].description;

    console.log(wind);

    var content = {
      city: city,
      trying: true,
      tmax:tmax,
      t:t,
      tmin:tmin,
      fl:fl,
      pres:pres,
      hum:hum,
      visi:visi,
      wind:wind.speed,
      clo:clo,
      status:status,
    }
    res.render('index', content);
    // console.log(content)
  }).catch(function(err) {
    console.log(err);
  })



  
})

module.exports = router;
