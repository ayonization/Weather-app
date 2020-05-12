const request = require('request');

var geocodeAddress=(address,callback)=>{

    var encodedAddress=encodeURIComponent(address);

    request({
        url:'https://maps.googleapis.com/maps/api/geocode/json?address='+encodedAddress+'&key=AIzaSyC5NfBu5x0bhS1SBULGWty7W4sCLBR6uLc',
        json:true
    },(error,response,body)=>{  
        if(error)
        {
            callback("Couldnt connect to google's servers");
            
        }
        else if(body.status==="ZERO_RESULTS"){
            callback("Invalid address");
            
        }
        else{
            callback(undefined,{
                fulladdress:body.results[0].formatted_address,
                latitude:body.results[0].geometry.location.lat,
                longitude:body.results[0].geometry.location.lng
            });
            }
    });
};

module.exports.geocodeAddress=geocodeAddress;