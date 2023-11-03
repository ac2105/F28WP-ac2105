// Step 1: Get your API key from OpenWeatherMap.
const apiKey = 'f5d3a447c1e3dd51a18605cb525029cd';

// Step 2: Create variables to store references to your input field, button, and weather info div.
const cityInput = document.getElementById('cityInput');
const weatherInfoDiv = document.getElementById('weather-info');
const button = document.getElementById('btn');

// Step 3: Add an event listener to the button to detect when it is clicked.
button.addEventListener('click', getWeather);

// Step 4: Inside the event listener, get the value of the input field.
function getWeather() {
    const cityName = cityInput.value.trim();

    // Check if the city input is empty, alert the user to enter a city name.
    if (cityName === '') {
        alert('Please enter a city name');
        return;
    }

    // Step 5: Make an HTTP request to the OpenWeatherMap API to fetch the weather data for the entered city.
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
        .then(response => {
            // Step 6: Error handling
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Step 7: Once the data is returned from the API, parse it and update the weather info div.
            const temperature = data.main.temp;
            const description = data.weather[0].description;
            const windSpeed = data.wind.speed;

            const weatherDetails = `
                <p>Weather in ${cityName}: ${description}</p>
                <p>Main Temperature: ${temperature}°C</p>
                <p>Wind Speed: ${windSpeed} m/s</p>
            `;

            weatherInfoDiv.innerHTML = weatherDetails;
        })
        .catch(error => {
            // More detailed error handling for different scenarios.
            if (error instanceof TypeError) {
                // Network error
                weatherInfoDiv.innerHTML = '<p>Network error. Please check your internet connection.</p>';
            } else {
                // API-specific error
                weatherInfoDiv.innerHTML = `<p>${error.message}</p>`;
            }
        });
}