const geocode = require('./geocode/geocode.js');
const weatherserver = require('./weatherserver/weatherserver.js');

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = 3000;

//Setting the view engine to ejs to render the same pages
app.set('view engine', 'ejs');

//To parse the form input parameters
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Providing the public folder for static execution of frontend
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'images')));

app.get('/', (req, res) => {
    res.sendFile(index);
});

//To store src of image
var src;
function storeSourceImage(weatherID) {
    src = ((int)(Math.floor(weatherID))).toString();
}

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
                    console.log();
                    console.log();

                    /////////// The Date logic to send interactive lines to the user //////////////////
                    var sr = new Date(weatherResults.sunrise*1000);
                    var ss = new Date(weatherResults.sunset*1000);
                    var currentTime = new Date();
                    var sunriseTimeString, sunsetTimeString;
                    var dayAfter = new Date(currentTime.getTime() + (2*24*60*60*1000)).toLocaleDateString();
                    if(currentTime.getTime() > ss.getTime()) {
                        sunriseTimeString = "The sun rose at " + sr.toLocaleTimeString();
                        sunsetTimeString = "The sun set at " + ss.toLocaleTimeString();
                    } else if(currentTime.getTime() > sr.getTime() && currentTime.getTime() < ss.getTime()) {
                        sunriseTimeString = "The sun rose at " + sr.toLocaleTimeString();
                        sunsetTimeString = "The sun will set at " + ss.toLocaleTimeString();
                    } else {
                        sunriseTimeString = "The sun will rise at " + sr.toLocaleTimeString();
                        sunsetTimeString = "The sun will set at " + ss.toLocaleTimeString();
                    }
                    ////////////////////////           Date logic ends here         //////////////////////////////

                    console.log(weatherResults.weatherID);
                    console.log(Math.round(weatherResults.weatherID));

                    // Rendering the result page with the following parameters                    
                    res.render('result.ejs', {
                        address: results.fulladdress,
                        temperature: weatherResults.temp,
                        humidity: weatherResults.humidity,
                        todayReport: weatherResults.weatherdescrip, 
                        tomMinTemp: weatherResults.tomintemp, 
                        tomMaxTemp: weatherResults.tomaxtemp, 
                        tomReport: weatherResults.toweather,
                        dayAfter: dayAfter, 
                        dayAfterMinTemp: weatherResults.nextmintemp,
                        dayAfterMaxTemp: weatherResults.nextmaxtemp,
                        dayAfterReport: weatherResults.nextweather,
                        sunrise: sunriseTimeString,
                        sunset: sunsetTimeString
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




