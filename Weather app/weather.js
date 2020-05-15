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

// function timeConverter(UNIX_timestamp){
//     var a = new Date(UNIX_timestamp * 1000);
//     var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
//     var year = a.getFullYear();
//     var month = months[a.getMonth()];
//     var date = a.getDate();
//     var hour = a.getHours();
//     var min = a.getMinutes();
//     var sec = a.getSeconds();
//     var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
//     return time;
//   }
//   console.log(timeConverter(0));

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
                    var sr = new Date(weatherResults.sunrise).toLocaleTimeString("en-US")
                    var ss = new Date(weatherResults.sunset).toLocaleTimeString("en-US")
                    console.log("sunrise is at "+sr);
                    console.log("sunset is at "+ss);
                    console.log("current temp  is  "+weatherResults.temp);
                    console.log("Weather report is  "+weatherResults.weatherdescrip);
                    console.log("Humidity is "+weatherResults.humidity);
                    console.log("Tomorrow max temp is "+weatherResults.tomaxtemp);
                    console.log("Tomorrow min temp is "+weatherResults.tomintemp);
                    console.log("Tomorrow weather report is "+weatherResults.toweather);
                    console.log("Day after tomorrow max temp is "+weatherResults.nextmaxtemp);
                    console.log("Day after tomorrow min temp is "+weatherResults.nextmintemp);
                    console.log("Day after tomorrow weather report is  "+weatherResults.nextweather);

                    
                    res.render('result.ejs', {result: results.fulladdress, temperature: weatherResults.temperature});
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




