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
//         // console.log(weatherData.name)
//         // console.log(weatherData.sys.country)
//         // console.log(weatherData.weather[0].description)
//         // console.log(weatherData.wind)
        
        const wind = JSON.stringify(weatherData.list[0].wind)
        const country = JSON.stringify(weatherData.list[0].sys.country)
        const location = JSON.stringify(weatherData.list[0].name)
        const description = JSON.stringify(weatherData.list[0].weather[0].description)
        const weather = JSON.stringify(weatherData.list[0].main.temp);

        const wind1 = JSON.stringify(weatherData.list[1].wind)
        const country1 = JSON.stringify(weatherData.list[1].sys.country)
        const location1 = JSON.stringify(weatherData.list[1].name)
        const description1 = JSON.stringify(weatherData.list[1].weather[0].description)
        const weather1 = JSON.stringify(weatherData.list[1].main.temp);
        
        cityLoc.innerHTML = location + ',' + country;
        currentTempature.innerHTML = "The current temperature is " + weather + ' F';
        weatherDescription.innerHTML = "Today's Forecast: " + description;
        windSpeed.innerHTML = "Wind Speed: " + wind;

        cityLoc1.innerHTML = location1 + ',' + country1;
        currentTempature1.innerHTML = "The current temperature is " + weather1 + ' F';
        weatherDescription1.innerHTML = "Today's Forecast: " + description1;
        windSpeed1.innerHTML = "Wind Speed: " + wind1;

    } catch (err) {
        console.log('geo code error')
    } 

}

submission.addEventListener('click',getGeoCode);
