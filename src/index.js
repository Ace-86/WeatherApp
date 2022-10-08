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
        
        const wind = JSON.stringify(weatherData.list[0].wind)
        const country = JSON.stringify(weatherData.list[0].sys.country)
        const location = JSON.stringify(weatherData.list[0].name)
        const description = JSON.stringify(weatherData.list[0].weather[0].description)
        const weather = JSON.stringify(weatherData.list[0].main.temp);

        const wind1 = JSON.stringify(weatherData.list[8].wind)
        const country1 = JSON.stringify(weatherData.list[8].sys.country)
        const location1 = JSON.stringify(weatherData.list[8].name)
        const description1 = JSON.stringify(weatherData.list[8].weather[0].description)
        const weather1 = JSON.stringify(weatherData.list[8].main.temp);
        
        const wind2 = JSON.stringify(weatherData.list[16].wind)
        const country2 = JSON.stringify(weatherData.list[16].sys.country)
        const location2 = JSON.stringify(weatherData.list[16].name)
        const description2 = JSON.stringify(weatherData.list[16].weather[0].description)
        const weather2 = JSON.stringify(weatherData.list[16].main.temp);

        const wind3 = JSON.stringify(weatherData.list[24].wind)
        const country3 = JSON.stringify(weatherData.list[24].sys.country)
        const location3 = JSON.stringify(weatherData.list[24].name)
        const description3 = JSON.stringify(weatherData.list[24].weather[0].description)
        const weather3 = JSON.stringify(weatherData.list[24].main.temp);

        cityLoc.innerHTML = location + ',' + country;
        currentTempature.innerHTML = "The current temperature is " + weather + ' F';
        weatherDescription.innerHTML = "Today's Forecast: " + description;
        windSpeed.innerHTML = "Wind Speed: " + wind;

        cityLoc1.innerHTML = location1 + ',' + country1;
        currentTempature1.innerHTML = "The current temperature is " + weather1 + ' F';
        weatherDescription1.innerHTML = "Today's Forecast: " + description1;
        windSpeed1.innerHTML = "Wind Speed: " + wind1;

        cityLoc2.innerHTML = location2 + ',' + country2;
        currentTempature2.innerHTML = "The current temperature is " + weather2 + ' F';
        weatherDescription2.innerHTML = "Today's Forecast: " + description2;
        windSpeed2.innerHTML = "Wind Speed: " + wind2;

        cityLoc3.innerHTML = location3 + ',' + country3
        currentTempature3.innerHTML = "The current temperature is " + weather3 + ' F';
        weatherDescription3.innerHTML = "Today's Forecast: " + description3;
        windSpeed3.innerHTML = "Wind Speed: " + wind3;

    } catch (err) {
        console.log('geo code error')
    } 

}

submission.addEventListener('click',getGeoCode);
