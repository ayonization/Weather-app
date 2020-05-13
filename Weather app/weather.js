const geocode = require('./geocode/geocode.js');
const weatherserver = require('./weatherserver/weatherserver.js');

const yargs = require('yargs');

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = 3000;

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'views')));

app.get('/', (req, res) => {
    res.sendFile(index);
});


app.post('/result', (req, res) => {
    var searchQuery = req.body.search;

    geocode.geocodeAddress(searchQuery,(error,results)=>{
        if(error){
            console.log(error);
        } else{
            // console.log("The full address is " + results.fulladdress);
            weatherserver.getweather(results.latitude,results.longitude,(errorMessage,weatherResults)=>{
                if(errorMessage)
                {
                    console.log(errorMessage);
                                
                }
                else{
                     console.log("The full address is " + results.fulladdress);
                    console.log("The temperature is " + weatherResults.temperature + " degrees celcius");
                    // console.log(weatherResults);
                    console.log("It feels like " + weatherResults.feelslike + " degree celcius");
                    console.log("The humidity is " + weatherResults.humidity + " percent");
                    console.log("The wind speed is " + weatherResults.windspeed + " km/h");
                    console.log("The weather report is " + weatherResults.weatheris);
                    res.render('result.ejs', {
                        result: results.fulladdress, 
                        temperature: weatherResults.temperature, 
                        feelslike: weatherResults.feelslike,
                        humidity: weatherResults.humidity,
                        report: weatherResults.weatheris
                    });
                }
            });

        }
    });



 

    /************************ couldn't get why this outputs undefined check it out once! *************************************/
    // console.log(address);

    /*************************************************************************************************************************/





    
    
    // res.render('result.ejs', {result: address});
    
});

app.listen(port, ()=> {console.log(`Server running at ${port}`)});

// const argv=yargs
// .options({
//         a :{
//             demand: true,
//             alias: 'address',
//             describe: 'address to fetch weather for',
//             string: true
//             }   
//         })        
// .help()
// .alias('help','h')
// .argv

// geocode.geocodeAddress(argv.address,(error,results)=>{
//     if(error){
//         console.log(error);
//             }
//     else{
//         console.log("The full address is " +results.fulladdress);
//         weatherserver.getweather(results.latitude,results.longitude,(errorMessage,weatherResults)=>{
//             if(errorMessage)
//             {
//                 console.log(errorMessage);
                
//             }
//             else{
//                 console.log("The temperature is " + weatherResults.temperature + " degrees celcius");
//                 // console.log(weatherResults);
                
//             }
//         });
        
//     }
// });




