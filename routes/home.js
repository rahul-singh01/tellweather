const app = require("express").Router();
const axios = require("axios");

app.get("/five_day_forecast/generate" , async(req,res)=>{
    const city_name = req.query.q.replace(/ /gi , "%20");
    const data = await axios({
        method : "GET",
        url : `https://api.weatherapi.com/v1/forecast.json?key=d5d797a17d234f0e85c44602231202&q=${city_name}&days=5&aqi=no&alerts=no`
    })
    const x = data.data
    const y = x.forecast.forecastday

    for(i=0 ; i<y.length; i++) {
        res.write(`
            <div class="forecast_box">
            <p class="poppins_font center_pos date_style">${y[i].date}</p>
            <div class="flex_between">
                <img src="${y[i].day.condition.icon}" alt="">
                <p class="poppins_font">${y[i].day.condition.text}</p>
            </div>

            <div class="flex_between center_pos poppins_font">
                <span class="material-symbols-outlined">
                    device_thermostat
                    </span><p>Avg. temp</p> <p>  ${y[i].day.avgtemp_c}°C </p>
            </div>
            <div class="forecast_max_min poppins_font">
                <p>Max ${y[i].day.maxtemp_c}°C</p>
                <p>Min ${y[i].day.mintemp_c}°C</p>
            </div>
            <div class="flex_between center_pos poppins_font">
                <span class="material-symbols-outlined">
                    air
                    </span><p>Max wind  ${y[i].day.maxwind_kph} Kph</p>
            </div>
            <div class="flex_between center_pos poppins_font">
                <span class="material-symbols-outlined">
                    water_drop
                    </span><p> Percipitation : ${y[i].day.totalprecip_in} inch</p>
            </div>
        </div>
    `)
    }
    
    res.end()
})

module.exports = app;