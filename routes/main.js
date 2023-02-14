const app = require("express").Router();
const axios = require("axios")

// for api call of forecast https://api.weatherapi.com/v1/forecast.json?key=d5d797a17d234f0e85c44602231202&q=New Delhi&days=5&aqi=no&alerts=no


// current Weather
app.get('/tell_current_weather' , async(req,res) => {
    try{
        const city_name = req.query.q.replace(/ /gi , "%20")
        const data = await axios({
            method: 'GET',
            url : `https://api.weatherapi.com/v1/current.json?key=d5d797a17d234f0e85c44602231202&q=${city_name}&aqi=no`
        })
        res.json(data.data)

    }catch(err){
        res.json({"status" : false})
    }
    
})


// tells forecast 
app.get("/tell_forecast" , async(req, res) => {
    try{
        const city_name = req.query.q.replace(/ /gi , "%20")
        const data = await axios({
            method : 'get' , 
            url : `https://api.weatherapi.com/v1/forecast.json?key=d5d797a17d234f0e85c44602231202&q=${city_name}&days=5&aqi=no&alerts=no`
        })
        res.json(data.data)
    }catch(err){
        res.json({
            status : false
        })
    }
    
})


module.exports = app;