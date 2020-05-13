const request = require('request');

var getweather=(lat,lng,callback)=>{
    request({
        url:'http://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lng+'&appid=3808be54f88838d3ba23d501dae139f8&units=metric',
        json:true
    },(error,response,body)=>{
        if(error)
        {
           callback("Cannot connect to the weather server");
            
        }
        else if(body.cod!=200)
        {
            callback("Invalid address");
            
        }
        else{
        callback(undefined,{
            temperature:body.main.temp
        });
        }
    
    })
}

module.exports.getweather=getweather