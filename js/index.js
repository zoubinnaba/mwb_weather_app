
const API_KEY = 'ad5b73aff45f94281b2076c5c15d7f5d'

// Get the elements from the HTML DOM by their id
const inputEl = document.getElementById("query")
const submitEl = document.getElementById("search")
const weatherInfoEl = document.querySelector('.ajax-section');
const msgEl = document.querySelector('.msg');

// Create a variable to store the city name
let CITY = '';

// Add an event listener to the input field to get the city name when the value changes
inputEl.addEventListener("change", function() {
    CITY = inputEl.value;
});

// Add an event listener to the submit button to make the API call when the button is clicked
submitEl.addEventListener("click", function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    // Define the units as metric
    const UNITS = "metric";
    // If the city name is not entered, show an error message
    if (!CITY) {
        msgEl.innerHTML = 'Please enter a city name';
        return;
    }
    // Show the weather information section
    weatherInfoEl.style.display = "block"
    // Define the API URL with the city name, API key, and units
    const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=${UNITS}`;
    // Make a fetch API call to get the weather data
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        // Log the data in the console
        console.log(data.main);
        // Clear the error message
        msgEl.innerHTML = '';
        // Update the weather information section with the data
            weatherInfoEl.innerHTML = `
                <li>Temperature: ${data.main.temp} &#8451;</li>
                <li>Humidity: ${data.main.humidity}%</li>
                <li>Wind Speed: ${data.wind.speed} m/s</li>
                <li>Description: ${data.weather[0].description}</li>
            `
      })
      .catch(error => {
        // Show an error message if the city is not found
        msgEl.innerHTML = 'City not found. Please try again.';
      });
});



