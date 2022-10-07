import 'bootstrap';
import './scss/app.scss';

// https://api.openweathermap.org/data/2.5/weather?q=London&appid=48f9e697bfab037187eccf9b6153b9e9
const userState = document.querySelector('#state');
const userCity = document.querySelector('#city');
const submission = document.querySelector('#user_submit');
const cityLoc = document.querySelector('#location');
const currentTempature = document.querySelector('#curr_temp');
const weatherDescription = document.querySelector('#desc_weather');
const windSpeed = document.querySelector('#wind_speed');

// -------------geocode------------
//on click, find location of city
//city will bring up a list in array, having a different state
//match populated state with the users state input
//once matched, take the longitude and latitude numbers, save as a variable, and input them into weather makeRequest function
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
    console.log(arrGeo);

//get lon and lat from arrGeo
    longitude = arrGeo[0].lon;
    latitude = arrGeo[0].lat;
    console.log(longitude);
    console.log(latitude);
    
    return {lon : longitude, lat : latitude}
    } catch (err) {
        console.log('geo code error')
    } 
}

async function makeRequest() {
    try { 
        const responseTwo = await fetch('http://api.openweathermap.org/data/2.5/forecast?lat=41.8755616&lon=-87.6244212&appid=48f9e697bfab037187eccf9b6153b9e9', {
        mode: 'cors'
    })
    const weatherData = await responseTwo.json();
        console.log(weatherData)
        // console.log(weatherData.main.temp)
        // console.log(weatherData.name)
        // console.log(weatherData.sys.country)
        // console.log(weatherData.weather[0].description)
        // console.log(weatherData.wind)

        // const wind = JSON.stringify(weatherData.wind)
        // const country = JSON.stringify(weatherData.sys.country)
        // const location = JSON.stringify(weatherData.name)
        // const description = JSON.stringify(weatherData.weather[0].description)
        // const weather = JSON.stringify(weatherData.main.temp);
        
        // cityLoc.innerHTML = location + ',' + country;
        // currentTempature.innerHTML = "The current temperature is " + weather + ' F';
        // weatherDescription.innerHTML = "Today's Forecast: " + description;
        // windSpeed.innerHTML = "Wind Speed: " + wind
    } catch (err) {
            console.log('error')
    }
}

makeRequest()


submission.addEventListener('click', () => {
    getGeoCode();
    })