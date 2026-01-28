const apiKey = "d6936ff12ba3cbae67eece266afda6b7";

async function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const result = document.getElementById("result");

    if (city === "") {
        result.innerHTML = "<p>Please enter a city name</p>";
        return;
    }

    result.innerHTML = "<p>Loading...</p>";

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
            result.innerHTML = "<p>City not found</p>";
            return;
        }

        const data = await response.json();

        const temp = data.main.temp;
        const humidity = data.main.humidity;
        const condition = data.weather[0].main;

        let icon = "☁️";
        const cond = condition.toLowerCase();

        if (cond.includes("clear")) icon = "☀️";
        else if (cond.includes("cloud")) icon = "☁️";
        else if (cond.includes("rain")) icon = "🌧️";
        else if (cond.includes("snow")) icon = "❄️";
        else if (cond.includes("mist") || cond.includes("fog")) icon = "🌫️";

        // FORCE background change with city image
        document.body.style.backgroundImage =
            `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.65)),
             url("https://source.unsplash.com/1600x900/?${data.name},city")`;

        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";

        result.innerHTML = `
            <h3>${data.name}</h3>
            <div class="weather-icon">${icon}</div>
            <p style="font-size: 32px; font-weight: 600;">${temp}°C</p>
            <p>Humidity: ${humidity}%</p>
            <p>${condition}</p>
        `;
    } catch (error) {
        result.innerHTML = "<p>Error fetching data</p>";
    }
}

// Allow Enter key to search
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("cityInput");
    input.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            getWeather();
        }
    });
});
