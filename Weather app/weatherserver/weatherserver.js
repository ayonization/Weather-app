const request = require('request');


var getweather=(lat,lng,callback)=>{
    request({
        url:'https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lng+'&%20exclude=&appid=668599a16c8f0c65e9a39da4940aeae3&units=metric',
        json:true
    },(error,response,body)=>{
        if(error)
        {
           callback("Cannot connect to the weather server");
            
        }
        // else if(body.cod!=200)
        // {
        //     callback("Invalid address");
            
        // }
        else{
        callback(undefined,{
            sunrise:body.current.sunrise,
            sunset:body.current.sunset,
            temp:body.current.temp,
            humidity:body.current.humidity,
            weatherdescrip:body.current.weather[0].main,
            tomaxtemp:body.daily[0].temp.max,
            tomintemp:body.daily[0].temp.max,
            toweather:body.daily[0].weather[0].main,
            nextmaxtemp:body.daily[1].temp.max,
            nextmintemp:body.daily[1].temp.min,
            nextweather:body.daily[1].weather[0].main,
            weatherID:body.current.weather[0].id
        });
        }
    
    })
}

module.exports.getweather=getweather
