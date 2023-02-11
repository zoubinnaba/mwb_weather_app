
const API_KEY = 'ad5b73aff45f94281b2076c5c15d7f5d'

const inputEl = document.getElementById("query")
const submitEl = document.getElementById("search")
const weatherInfoEl = document.querySelector('.ajax-section');
const msgEl = document.querySelector('.msg');

let CITY = '';

inputEl.addEventListener("change", function() {
    CITY = inputEl.value;
});

submitEl.addEventListener("click", function(event) {
    event.preventDefault();
    const UNITS = "metric";
    if (!CITY) {
        msgEl.innerHTML = 'Please enter a city name';
        return;
    }

    weatherInfoEl.style.display = "block"

    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=${UNITS}`;

    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        console.log(data.main);
        msgEl.innerHTML = '';
            weatherInfoEl.innerHTML = `
                <li>Temperature: ${data.main.temp} &#8451;</li>
                <li>Humidity: ${data.main.humidity}%</li>
                <li>Wind Speed: ${data.wind.speed} m/s</li>
                <li>Description: ${data.weather[0].description}</li>
            `
      })
      .catch(error => {
        msgEl.innerHTML = 'City not found. Please try again.';
      });
});



