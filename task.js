const url = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';

$(document).ready(function () {
    weatherFn('Pune'); // Initial weather fetch for Pune

    // Add button event listener for user input
    $('#city-input-btn').on('click', function () {
        const city = $('#city-input').val();
        if (city) {
            weatherFn(city);
        } else {
            alert('Please enter a city name.');
        }
    });
});

async function weatherFn(cityName) {
    const apiUrl = `${url}?q=${cityName}&appid=${apiKey}&units=metric`; // Corrected to use backticks
    try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        if (res.ok) {
            weatherShowFn(data);
        } else {
            alert('City not found. Please try again.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function weatherShowFn(data) {
    $('#city-name').text(data.name);
    $('#date').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
    $('#temperature').html(`${data.main.temp}°C`); // Corrected to use backticks
    $('#description').text(data.weather[0].description);
    $('#wind-speed').html(`Wind Speed: ${data.wind.speed} m/s`); // Corrected to use backticks
    $('#weather-icon').attr('src', `http://openweathermap.org/img/w/${data.weather[0].icon}.png`); // Corrected to use backticks
    $('#weather-info').fadeIn();
}