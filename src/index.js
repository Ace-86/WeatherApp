import 'bootstrap';
import './scss/app.scss';
import {userState, userCity, submission, cityLoc, currentTempature, weatherDescription, cityLoc1, currentTempature1, weatherDescription1, cityLoc2, currentTempature2,
    weatherDescription2, cityLoc3, currentTempature3, weatherDescription3} from './const.js'

// -------------geocode------------
async function getGeoCode() {
    try {
        const user_state = userState.value.charAt(0).toUpperCase() + userState.value.slice(1).toLowerCase();
        const user_city = userCity.value.charAt(0).toUpperCase() + userCity.value.slice(1).toLowerCase();
        const response = await fetch('http://api.openweathermap.org/geo/1.0/direct?q={' +`${user_city}` +'},{3166-2}&limit=9&appid=48f9e697bfab037187eccf9b6153b9e9', {
            mode: 'cors'
    })
        const getGeo = await response.json();
        const arrGeo = getGeo.filter(arrGeo => arrGeo.state.indexOf(`${user_state}`) !== -1);
        var long = arrGeo[0].lon;
        var lat = arrGeo[0].lat;

        const currForecast = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + `${lat}` + '&lon=' + `${long}` + '&appid=48f9e697bfab037187eccf9b6153b9e9&units=imperial', {
            mode: 'cors'})
        const dailyForecast = await fetch('http://api.openweathermap.org/data/2.5/forecast?lat=' + `${lat}` + '&lon=' + `${long}` + '&appid=48f9e697bfab037187eccf9b6153b9e9&units=imperial', {
            mode: 'cors'})

        const currWeather = await currForecast.json();
        const weatherData = await dailyForecast.json();
        var user_State = arrGeo[0].state;
        var user_City = arrGeo[0].name;

        //current weather display
        const description = JSON.stringify(currWeather.weather[0].description)
        const weather = JSON.stringify(currWeather.main.temp);
        const iconcode =  currWeather.weather[0].icon;
        cityLoc.innerHTML = user_City + ', ' + user_State;
        currentTempature.innerHTML = "Current Temperature: " + weather + ' F';
        weatherDescription.innerHTML = "Today's Forecast: " + description;
        document.getElementById("weather_icon").src = "../src/images/" + iconcode + ".png";

        //next day, day 1 forecast
        const description1 = JSON.stringify(weatherData.list[8].weather[0].description)
        const weather1 = JSON.stringify(weatherData.list[8].main.temp);
        const iconcode2 =  weatherData.list[8].weather[0].icon;
        cityLoc1.innerHTML = user_City + ', ' + user_State;
        currentTempature1.innerHTML = "Temperature: " + weather1 + ' F';
        weatherDescription1.innerHTML = "Forecast: " + description1;
        document.getElementById("weather_icon2").src = "../src/images/" + iconcode2 + ".png";
        
        // day 2 forecast
        const description2 = JSON.stringify(weatherData.list[16].weather[0].description)
        const weather2 = JSON.stringify(weatherData.list[16].main.temp);
        const iconcode3 =  weatherData.list[16].weather[0].icon;
        cityLoc2.innerHTML = user_City + ', ' + user_State;
        currentTempature2.innerHTML = "Temperature: " + weather2 + ' F';
        weatherDescription2.innerHTML = "Forecast: " + description2;
        document.getElementById("weather_icon3").src = "../src/images/" + iconcode3 + ".png";

        // day 3 forecast
        const description3 = JSON.stringify(weatherData.list[24].weather[0].description)
        const weather3 = JSON.stringify(weatherData.list[24].main.temp);
        const iconcode4 =  weatherData.list[24].weather[0].icon;
        cityLoc3.innerHTML = user_City + ', ' + user_State;
        document.getElementById("weather_icon4").src = "../src/images/" + iconcode4 + ".png";
        currentTempature3.innerHTML = "Temperature: " + weather3 + ' F';
        weatherDescription3.innerHTML = "Forecast: " + description3;
    } catch (err) {
        console.log('Error retrieving location information')
    } 

}

submission.addEventListener('click',getGeoCode);
