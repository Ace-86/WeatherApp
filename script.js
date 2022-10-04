// https://api.openweathermap.org/data/2.5/weather?q=London&appid=48f9e697bfab037187eccf9b6153b9e9
const weatherDisplay = document.querySelector('#weather_display');
const userCity = document.querySelector('#city');
const submission = document.querySelector('#user_submit');
const cityLoc = document.querySelector('#location');
const currentTempature = document.querySelector('#curr_temp');
const weatherDescription = document.querySelector('#desc_weather');
const windSpeed = document.querySelector('#wind_speed');



const makeRequest = () => {
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+userCity.value +'&appid=48f9e697bfab037187eccf9b6153b9e9&units=imperial', {
        mode: 'cors'
    })
    .then(function(response) {
        return response.json()
    })
    .then(function(response) {
        console.log(response)
        console.log(response.main.temp)
        console.log(response.name)
        console.log(response.sys.country)
        console.log(response.weather[0].description)
        console.log(response.wind)

        const wind = JSON.stringify(response.wind)
        const country = JSON.stringify(response.sys.country)
        const location = JSON.stringify(response.name)
        const description = JSON.stringify(response.weather[0].description)
        const weather = JSON.stringify(response.main.temp);
        
        cityLoc.innerHTML = location + ',' + country;
        currentTempature.innerHTML = "The current temperature is " + weather + ' F';
        weatherDescription.innerHTML = "Today's Forecast: " + description;
        windSpeed.innerHTML = "Wind Speed: " + wind
    })
    .catch(function(err) {
        console.log('error')
}); 
}

submission.addEventListener('click', makeRequest)