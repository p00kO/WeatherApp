const path = require('path');
const express = require('express');

const geocode = require('./utils/geocode');
const getWeather = require('./utils/weather');

const hbs = require('hbs');
const { send } = require('process');

const app = express();
const port = process.env.PORT || 3000;

const viewsPath = path.join(__dirname,'../templates');
const partialsPath = path.join(__dirname,'../templates/partials');
//Setup Handlebars
app.set('views', viewsPath);
app.set('view engine','hbs');
app.use(express.static(path.join(__dirname, '../public')));
hbs.registerPartials(partialsPath);

app.get('', (req,res)=> {
  res.render('index',{
    title: 'Weather App',
    name: 'p00ko'
  });
});

app.get('/about', (req,res)=> {
  res.render('about',{
    title: 'About ME!',
    name: 'p00ko'
  });
});

app.get('/help', (req,res)=>{
  res.render('help', {
    title: "Help...",
    name: "p00ko",
    message: "Some text on the help page for all to see..."
  });
})

app.get('/weather', (req,res) => {  
  if(!req.query.address){
    res.send({error: 'Error - no address provided'});
  }else{
    geocode(req.query.address,(error,data) => {
      if(error){
        res.send({
          error: error
        });
      } else{
        getWeather(data, (error,{weather, temp}={})=> {
          if(error){
            res.send({error:error});
          }else{
            res.send({
              location: data.loc,
              weather: weather,
              temp: temp
            });
          }
        });
      }
    });
  }
});

app.get('/products',(req,res)=>{
  if(!req.query.search){
    console.log('No search term provided');
    return res.send({
      error: 'You must provide a search term...'
    });
  }else{
    console.log(req);
    res.send({products: []});
  }
  
});

app.get('/help/*', (req,res) => {
  res.render('Error404', {
    title: "Help Article Not Found",
    name: "P00ko" 
  });
});

app.get('*', (req,res) =>{
  res.render('Error404', {
    title: "Page Not Found!",
    name: "P00ko"
  });
})

app.listen(port,() => {
  console.log('Server is up on port ' + port);
});

