const weatherForm = document.querySelector(".weather-form");
const cityInput = document.querySelector(".city-input");
const card = document.querySelector(".card");
const apiKey = "bf4fac37751467666a66e733cd0773be";

weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityInput.value.trim();

    if (!city) {
        return displayError("Please enter a city");
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const weatherData = await response.json();
        displayWeatherData(weatherData);
    } catch (error) {
        displayError(error);
    }
});

function displayWeatherData(data) {
    const {name: city,
           main: {temp, humidity}, 
           weather: [{description, id}]
    } = data;

    card.style.display = "flex";

    const html = `
                    <h1 class="city-display">${city}</h1>
                    <p class="temperature-display">${temp.toFixed(1)}°</p>
                    <p class="humidity-display">Humidity: ${humidity}%</p>
                    <p class="description-display">${description}</p>
                    <p class="weather-emoji">${getWeatherEmoji(id)}</p>
                `;
    
    card.innerHTML = html;
}

function getWeatherEmoji(weatherId) {
    
    switch (true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";
        case (weatherId == 800):
            return "☀️";
        case (weatherId >= 801):
            return "☁️";
        default:
            return "❓";
    }
}

function displayError(message) {
    card.style.display = "flex";
    const errorHTML = `<p class="error-display">${message}</p>`;
    card.innerHTML = errorHTML;
}