// app.js
document
  .getElementById('location-form')
  .addEventListener('submit', function (event) {
    event.preventDefault();
    const cityName = document.getElementById('search-input').value;
    getWeather(cityName);
  });

async function getWeather(cityName) {
  try {
    const apiKey = '843bf318fb4294fd04730ff37fc23bea'; // Replace with your actual API key
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
    );
    const data = await response.json();

    const currentWeather = {
      temperature: data.main.temp,
      description: data.weather[0].description,
    };

    const forecastResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`
    );
    const forecastData = await forecastResponse.json();

    const forecast = forecastData.list
      .map((item) => ({
        date: item.dt_txt,
        temperature: item.main.temp,
        description: item.weather[0].description,
      }))
      .filter((item, index) => index % 8 === 0); // Filter to get one forecast per day

    displayCurrentWeather(currentWeather);
    displayForecast(forecast);
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

function displayCurrentWeather(weather) {
  const weatherDetails = document.getElementById('weather-details');
  weatherDetails.innerHTML = `
     <p>Temperature: ${weather.temperature}°C</p>
     <p>Description: ${weather.description}</p>
 `;
}

function displayForecast(forecast) {
  const forecastDetails = document.getElementById('forecast-details');
  forecastDetails.innerHTML = '';
  forecast.forEach((day) => {
    const forecastItem = document.createElement('div');
    forecastItem.classList.add('forecast-item');
    forecastItem.innerHTML = `
         <p>Date: ${day.date}</p>
         <p>Temperature: ${day.temperature}°C</p>
         <p>Description: ${day.description}</p>
     `;
    forecastDetails.appendChild(forecastItem);
  });
}
