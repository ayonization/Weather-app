const geocode = require('./geocode/geocode.js');
const weatherserver = require('./weatherserver/weatherserver.js');

const yargs = require('yargs');

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile('index.html');
});

app.post('/result', (req, res) => {
    var searchQuery = req.body.search;
    
    res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="style.css">
                <title>Weather Report</title>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Weather Report</h1>
                    </div>
                    <div class="result-area">
                        <p>${searchQuery}</p>
                    </div>
                </div>
            </body>
            </html>
    `);
    
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
//                 console.log("The temparature is " + weatherResults.temparature + " degrees celcius");
//                 // console.log(weatherResults);
                
//             }
//         });
        
//     }
// });




