const request = require('request');

const getWeather = (coord, callback) => {
  const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + coord.lat + '&lon=' + coord.lon +'&appid=301ff28ecfe730b2fb652b582c154e3c'; 
  request({url, json: true}, (error, {body}) =>{
    if(error){
      callback('Error - Unable to connect to location services', undefined);
    } else if(body.length === 0){
      callback('Error - No return value from server', undefined);
    } else{
      console.log(body);
      data = {
        "weather": body.weather[0].description,
        "temp": (body.main.temp - 273).toFixed(1),
        "minTemp": (body.main.temp_min - 273).toFixed(1),
        "maxTemp": (body.main.temp_max - 273).toFixed(1)
      }
      callback(undefined,data);
    }
  });
}
module.exports = getWeather;