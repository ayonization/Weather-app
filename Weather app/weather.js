const geocode = require('./geocode/geocode.js');
const weatherserver = require('./weatherserver/weatherserver.js');

const yargs = require('yargs');

const express = require('express');
const app = express();
const port = 3000;

app.listen(port, ()=> {console.log(`Server running at ${port}`)});

const argv=yargs
.options({
        a :{
            demand: true,
            alias: 'address',
            describe: 'address to fetch weather for',
            string: true
            }   
        })        
.help()
.alias('help','h')
.argv

geocode.geocodeAddress(argv.address,(error,results)=>{
    if(error){
        console.log(error);
            }
    else{
        console.log("The full address is " +results.fulladdress);
        weatherserver.getweather(results.latitude,results.longitude,(errorMessage,weatherResults)=>{
            if(errorMessage)
            {
                console.log(errorMessage);
                
            }
            else{
                console.log("The temparature is " + weatherResults.temparature + " degrees celcius");
                // console.log(weatherResults);
                
            }
        });
        
    }
});




