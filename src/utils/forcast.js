const request=require('request');

const forcast=(lattitude,longitude,callback) =>{
    const url='https://api.openweathermap.org/data/2.5/onecall?lat='+encodeURIComponent(lattitude)+'&lon='+encodeURIComponent(longitude)+'&units=metric&exclude={part}&appid=b5b5d05b2a58320d1963a2f96a2d1f04';

    request({url, json:true},(error, { body })=>{
        if(error){
            callback("Unable to connect weather service!", undefined);
        } else if(body.message){
            callback("Unable to find a location", undefined);
        }else{
            callback(undefined, {
                
                Temperature:body.current.temp,
                Humdity:body.current.humidity,
                pressure:body.current.pressure,
                clouds:body.current.clouds,
                weather:body.current.weather[0].description,
                wind_speed:body.current.wind_speed,
                date:Date(body.current.dt)
            })
        }
    })
}

module.exports=forcast;