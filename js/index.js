
const API_KEY = 'ad5b73aff45f94281b2076c5c15d7f5d'

// Get the elements from the HTML DOM by their id
const inputEl = document.getElementById("query")
const submitEl = document.getElementById("search")
const weatherInfoEl = document.querySelector('.ajax-section');
const msgEl = document.querySelector('.msg');
const locationEl = document.getElementById('position')

// Create a variable to store the city name
let CITY = '';
// Define the units as metric
const UNITS = "metric";

// Add an event listener to the input field to get the city name when the value changes
inputEl.addEventListener("change", function() {
    CITY = inputEl.value;
});

// Add an event listener to the submit button to make the API call when the button is clicked
submitEl.addEventListener("click", function(event) {
    // Prevent the default form submission behavior
    event.preventDefault()
    // If the city name is not entered, show an error message
    if (!CITY) {
        msgEl.innerHTML = 'Please enter a city name'
        return
    }
    // Show the weather information section
    weatherInfoEl.style.display = "block"
    // Define the API URL with the city name, API key, and units
    //const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=${UNITS}`;
    // Make a fetch API call to get the weather data
      API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=${UNITS}`

      fetch(API_URL)
        .then(response => response.json())
        .then(data => {
          msgEl.textContent = ''
          weatherInfoEl. innerHTML = `
            <li>Temperature: ${data.main.temp} <span class="material-symbols-outlined">thermometer</span></li>
            <li>Humidity: ${data.main.humidity}<span class="material-symbols-outlined">
            humidity_percentage
            </span></li>
            <li>Wind Speed: ${data.wind.speed}<span class="material-symbols-outlined">
            avg_pace
            </span></li>
            <li>Description: ${data.weather[0].description}</li>
          `
        })
        .catch(error => {
          msgEl.textContent = 'City not found. Please try again.'
          weatherInfoEl.style.display = "none"
        })
})

locationEl.addEventListener('click', function(e){
  e.preventDefault()
  weatherInfoEl.style.display = "block"
  let API_URL
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position){
        const lat = position.coords.latitude
        const lon = position.coords.longitude
        API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${UNITS}`
        fetch(API_URL)
          .then(respose => respose.json())
          .then(data => {
            msgEl.textContent = ''
            inputEl.textContent = ''
            console.log(data)
            weatherInfoEl.innerHTML = `
              <li>Temperature: ${data.main.temp} <span class="material-symbols-outlined">thermometer</span></li>
              <li>Humidity: ${data.main.humidity}<span class="material-symbols-outlined">
              humidity_percentage
              </span></li>
              <li>Wind Speed: ${data.wind.speed}<span class="material-symbols-outlined">
              avg_pace
              </span></li>
              <li>Description: ${data.weather[0].description}</li>
            `
          })
          .catch(error => {
            msgEl.textContent = 'Can not find your position'
            weatherInfoEl.style.display = "none"
          })
      })
    }
})
