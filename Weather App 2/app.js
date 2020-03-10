let appId='8f8bbfac1a3d0b23cbd545da5683e8ca';
let units='metric';
let searchMethod='q';

function searchWeather(searchTerm) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&appid=${appId}&units=${units}`)
        .then(result => {
            return result.json()
        })
        .then(result => {
            init(result)
        })
        .catch(err => {
            console.log(err);
        })
}

function init(resultFromServer) {
    console.log(resultFromServer);

    switch(resultFromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage = 'url("clear.jpg")';
            break;
        
        case 'Clouds':
            document.body.style.backgroundImage = 'url("clouds.jpg")';
            break;

        case 'Rain':
        case 'Drizzle':
        case 'Mist':
            document.body.style.backgroundImage = 'url("rain.jpg")';
            break;
        
        case 'Thunderstorm':
            document.body.style.backgroundImage = 'url("storm.jpg")';
            break;
    
        case 'Snow':
            document.body.style.backgroundImage = 'url("snow.jpg")';
            break;

        default:
            break;
    }

    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let temperatureElement = document.getElementById('temperature');
    let humidity = document.getElementById('humidity');
    let windSpeedElement = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('cityHeader');
    let weatherIcon = document.getElementById('documentIconImg');
    weatherIcon.src = `http://openweathermap.org/img/w/${resultFromServer.weather[0].icon}.png`
    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1); 
    temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176';
    windSpeedElement.innerHTML = `Winds at ${Math.floor(resultFromServer.wind.speed)} m/s`;
    cityHeader.innerHTML = resultFromServer.name;
    humidity.innerHTML = `Humidity levels at ${resultFromServer.main.humidity}%`;

    setPosition();
}

function setPosition() {
    let weatherContainer = document.getElementById('weatherContainer');
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;

    weatherContainer.style.left = `calc(50% - ${weatherContainerWidth / 2}px)`;
    weatherContainer.style.top = `calc(50% - ${weatherContainerHeight / 1.3}px)`;
    weatherContainer.style.visibility = 'visible';
}

document.getElementById('searchButton').addEventListener('click', () => {
    let searchTerm = document.getElementById('searchInput').value;
    if(searchTerm){
        searchWeather(searchTerm);
    }
})