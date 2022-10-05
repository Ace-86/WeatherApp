import 'bootstrap';
import './scss/app.scss';

// https://api.openweathermap.org/data/2.5/weather?q=London&appid=48f9e697bfab037187eccf9b6153b9e9
const weatherDisplay = document.querySelector('#weather_display');
const userCity = document.querySelector('#city');
const submission = document.querySelector('#user_submit');
const cityLoc = document.querySelector('#location');
const currentTempature = document.querySelector('#curr_temp');
const weatherDescription = document.querySelector('#desc_weather');
const windSpeed = document.querySelector('#wind_speed');



async function makeRequest() {
    try {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q='+userCity.value +'&appid=48f9e697bfab037187eccf9b6153b9e9&units=imperial', {
        mode: 'cors'
    })
    const weatherData = await response.json();
        console.log(weatherData)
        console.log(weatherData.main.temp)
        console.log(weatherData.name)
        console.log(weatherData.sys.country)
        console.log(weatherData.weather[0].description)
        console.log(weatherData.wind)

        const wind = JSON.stringify(weatherData.wind)
        const country = JSON.stringify(weatherData.sys.country)
        const location = JSON.stringify(weatherData.name)
        const description = JSON.stringify(weatherData.weather[0].description)
        const weather = JSON.stringify(weatherData.main.temp);
        
        cityLoc.innerHTML = location + ',' + country;
        currentTempature.innerHTML = "The current temperature is " + weather + ' F';
        weatherDescription.innerHTML = "Today's Forecast: " + description;
        windSpeed.innerHTML = "Wind Speed: " + wind
    } catch (err) {
            console.log('error')
    }
}

submission.addEventListener('click', makeRequest)


// -------------geocode------------
//on click, find location of city
//city will bring up a list in array, having a different state
//match populated state with the users state input
//once matched, take the longitude and latitude numbers, save as a variable, and input them into weather makeRequest function
async function getGeocode() {
    try {
    const response = await fetch('http://api.openweathermap.org/geo/1.0/direct?q={Joliet},{3166-2}&limit=9&appid=48f9e697bfab037187eccf9b6153b9e9', {
        mode: 'cors'
    })
    const getGeo = await response.json();
    console.log(getGeo);
    
     } catch (err) {
        console.log('error')
    }
    }
getGeocode();