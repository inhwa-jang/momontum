const weather = document.querySelector(".js-weather");
const API_KEY = "3ebe8d6752d4e8d780bc928d3eb30014";
const COORDS = 'coords';
// let locationIcon = document.querySelector(".weather-icon");

// const weatherIconCode = data.weather[0].icon;
// const weatherIcon = document.createElement("img");
// weatherIcon.src = `./icons/${weatherIconCode}.png /`;

// let locationIcon = document.querySelector(".weather-icon");
// const {icon} = data.weather[0];

// function getWeather(lat, lng) {
//     fetch(
//         `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
//         ).then(function(response){
//             return response.json();
//         }).then(function(json){
//             const temperature = json.main.temp;
//             const place = json.name;
//             weather.innerHTML = `${place}의 현재 기온은 <br/>${temperature} `;
//         })
// }

function getWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`)
    .then(res => res.json())
    .then(data => {
        console.log(data);
        // const temp = data.main.temp;
        // const weathers = data.weather[data.weather.length -1];
        let location = document.createElement("span");
        weather.appendChild(location);
        const {icon} = data.weather[0];
        // weatherIcon.src = `https://openweathermap.org/img/wn/${weathers.icon}@2x.png`;
        // weather.innerHTML = `${temp}&#176;C ${weathers.main}`;
        location.innerHTML = `<img src="./icons/${icon}.png">`;
    })
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        // latitude: latitude,
        // longitude: longitude
        // 👇same same
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError() {
    console.log('cant access geo location');
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();