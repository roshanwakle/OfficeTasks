import express from 'express';
import fetch from 'node-fetch';
const router = express.Router();

router.get('/', (req, res) => {
    const sendData = { location: "Location", country: "country", temp: "temp", desc: "Description", feel: "Feel-like", humidity: "Humidity", speed: "speed" }
    res.render('index', { sendData: sendData })

})

router.post('/', async (req, res) => {
    let location = await req.body.city;
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.API_KEY}&units=metric`
        const response = await fetch(url);
        // console.log("-------------->>>>>>>>>",response.status)
        if(response.status == 200){
            const weatherData = await response.json();
            console.log(weatherData)
            const temp = weatherData.main.temp;
            // console.log(weatherdata)
            const desc = weatherData.weather[0].description;
            // const icon = weatherData.weather[0].icon
            const sendData = {};
            sendData.desc = desc;
            sendData.temp = temp;
            sendData.location = location;
            sendData.feel = weatherData.main.feels_like;
            sendData.humidity = weatherData.main.humidity;
            sendData.speed = weatherData.wind.speed;
            sendData.country = weatherData.sys.country;
            res.render('index', { sendData: sendData })
        }
        else{
            const sendData = {};
            sendData.location = "Ooops...City not found";
            res.render('index', { sendData: sendData })
        }
        
    } catch (error) {
        console.log(error.message)
    }
})


export { router }