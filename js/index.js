const API_KEY = '6ec61639cce5288fca2ab1829811fcbe'

const inputEl = document.getElementById("query")
const submitEl = document.getElementById("search")

let CITY = '';

inputEl.addEventListener("change", function() {
    CITY = inputEl.value;
});

submitEl.addEventListener("click", function(event) {
    event.preventDefault();
    const UNITS = "metric";

    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=${UNITS}`;

    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.error(error);
      });
});



/*
const API_KEY = 'YOUR_API_KEY_HERE';
const UNITS = 'metric';

const inputEl = document.getElementById('query');
const submitEl = document.getElementById('search');
const weatherInfoEl = document.querySelector('.weather-info');
const msgEl = document.querySelector('.msg');

submitEl.addEventListener('click', function(event) {
    event.preventDefault();
    const city = inputEl.value;
    if (!city) {
        msgEl.innerHTML = 'Please enter a city name';
        return;
    }
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${UNITS}`;
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            msgEl.innerHTML = '';
            weatherInfoEl.innerHTML = `
                <li>Temperature: ${data.main.temp} &#8451;</li>
                <li>Humidity: ${data.main.humidity}%</li>
                <li>Wind Speed: ${data.wind.speed} m/s</li>
                <li>Description: ${data.weather[0].description}</li>
            `;
        })
        .catch(error => {
            msgEl.innerHTML = 'City not found. Please try again.';
        });
});
*/