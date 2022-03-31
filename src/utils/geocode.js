const request = require('request');
const fs = require('fs');

let str = fs.readFileSync(__dirname + '/countryCodes.json', 'utf8');  
const cityNames = JSON.parse(str);

const geocode = (city, callback) => {
  const url = 'http://api.openweathermap.org/geo/1.0/direct?q=' + encodeURI(city) + '&limit=5&appid=301ff28ecfe730b2fb652b582c154e3c';
  request({url, json: true}, (error, {body}) =>{
    if(error){
      callback('Error - Unable to connect to location services', undefined);
    } else if( !Array.isArray(body) ){
      callback('Error - Could not find data for city provided', undefined);
    }else if(body.length === 0){
      callback('Error - Unable to get location from geo server', undefined);
    } else{
      const countryName = cityNames.find(o => o.Code === body[0].country )
      const data = {
                    lon: body[0].lon,
                    lat: body[0].lat,
                    loc: body[0].name + ", " + countryName.Name
                   }
      callback(undefined, data);
    }
  });
}

module.exports = geocode;