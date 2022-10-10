import 'bootstrap';
import './scss/app.scss';


const userState = document.querySelector('#state');
const userCity = document.querySelector('#city');
const submission = document.querySelector('#user_submit');
const cityLoc = document.querySelector('#location');
const currentTempature = document.querySelector('#curr_temp');
const weatherDescription = document.querySelector('#desc_weather');
const windSpeed = document.querySelector('#wind_speed');

const cityLoc1 = document.querySelector('#location1');
const currentTempature1 = document.querySelector('#curr_temp1');
const weatherDescription1 = document.querySelector('#desc_weather1');
const windSpeed1 = document.querySelector('#wind_speed1');

const cityLoc2 = document.querySelector('#location2');
const currentTempature2 = document.querySelector('#curr_temp2');
const weatherDescription2 = document.querySelector('#desc_weather2');
const windSpeed2 = document.querySelector('#wind_speed2');

const cityLoc3 = document.querySelector('#location3');
const currentTempature3 = document.querySelector('#curr_temp3');
const weatherDescription3 = document.querySelector('#desc_weather3');
const windSpeed3 = document.querySelector('#wind_speed3');

// -------------geocode------------
async function getGeoCode() {
    try {
        const user_state = userState.value.charAt(0).toUpperCase() + userState.value.slice(1).toLowerCase();
        const user_city = userCity.value.charAt(0).toUpperCase() + userCity.value.slice(1).toLowerCase();
        const response = await fetch('http://api.openweathermap.org/geo/1.0/direct?q={' +`${user_city}` +'},{3166-2}&limit=9&appid=48f9e697bfab037187eccf9b6153b9e9', {
            mode: 'cors'
    })
    const getGeo = await response.json();
    console.log(getGeo);
    const arrGeo = getGeo.filter(arrGeo => arrGeo.state.indexOf(`${user_state}`) !== -1);
    console.log( arrGeo);

    //get lon and lat from arrGeo
    var long = arrGeo[0].lon;
    var lat = arrGeo[0].lat;
    
    console.log(lat, long);

        const responseTwo = await fetch('http://api.openweathermap.org/data/2.5/forecast?lat=' + `${lat}` + '&lon=' + `${long}` + '&appid=48f9e697bfab037187eccf9b6153b9e9&units=imperial', {
            mode: 'cors'
        })
        const weatherData = await responseTwo.json();
        console.log(weatherData);
        console.log(weatherData.list[0].main.temp)
        
        var user_State = arrGeo[0].state;
        var user_City = arrGeo[0].name;
        console.log(user_State);
        console.log(user_City);

        //current weather display
        const description = JSON.stringify(weatherData.list[0].weather[0].description)
        const weather = JSON.stringify(weatherData.list[0].main.temp);
        const iconcode =  weatherData.list[0].weather[0].icon;

        //next day, day 1 forecast
        const description1 = JSON.stringify(weatherData.list[8].weather[0].description)
        const weather1 = JSON.stringify(weatherData.list[8].main.temp);
        const iconcode2 =  weatherData.list[8].weather[0].icon;
        
        // day 2 forecast
        const description2 = JSON.stringify(weatherData.list[16].weather[0].description)
        const weather2 = JSON.stringify(weatherData.list[16].main.temp);
        const iconcode3 =  weatherData.list[16].weather[0].icon;

        // day 3 forecast
        const description3 = JSON.stringify(weatherData.list[24].weather[0].description)
        const weather3 = JSON.stringify(weatherData.list[24].main.temp);
        const iconcode4 =  weatherData.list[24].weather[0].icon;

        cityLoc.innerHTML = user_City + ', ' + user_State;
        currentTempature.innerHTML = "Current Temperature: " + weather + ' F';
        weatherDescription.innerHTML = "Today's Forecast: " + description;
        document.getElementById("weather_icon").src = "../src/images/" + iconcode + ".png";

        cityLoc1.innerHTML = user_City + ', ' + user_State;
        currentTempature1.innerHTML = "Temperature: " + weather1 + ' F';
        weatherDescription1.innerHTML = "Forecast: " + description1;
        document.getElementById("weather_icon2").src = "../src/images/" + iconcode2 + ".png";

        cityLoc2.innerHTML = user_City + ', ' + user_State;
        currentTempature2.innerHTML = "Temperature: " + weather2 + ' F';
        weatherDescription2.innerHTML = "Forecast: " + description2;
        document.getElementById("weather_icon3").src = "../src/images/" + iconcode3 + ".png";

        cityLoc3.innerHTML = user_City + ', ' + user_State;
        document.getElementById("weather_icon4").src = "../src/images/" + iconcode4 + ".png";
        currentTempature3.innerHTML = "Temperature: " + weather3 + ' F';
        weatherDescription3.innerHTML = "Forecast: " + description3;

    } catch (err) {
        console.log('geo code error')
    } 

}

submission.addEventListener('click',getGeoCode);
