const apiKey = "YOUR_API_KEY";

const cityInput = document.getElementById("city");
const searchBtn = document.getElementById("searchBtn");

const locationName = document.getElementById("location");
const date = document.getElementById("date");
const temp = document.getElementById("temp");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");
const weatherIcon = document.getElementById("weatherIcon");
const forecast = document.getElementById("forecast");


function currentDate() {
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };

    date.innerHTML = new Date().toLocaleDateString("en-US", options);
}

async function getWeather(city) {

    try {

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        locationName.innerHTML = `${data.name}, ${data.sys.country}`;
        temp.innerHTML = `${Math.round(data.main.temp)}°C`;
        description.innerHTML = data.weather[0].description;
        humidity.innerHTML = `${data.main.humidity}%`;
        wind.innerHTML = `${data.wind.speed} km/h`;
        pressure.innerHTML = `${data.main.pressure} hPa`;

        weatherIcon.src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        changeBackground(data.weather[0].main);

        getForecast(city);

    } catch (error) {
        
    }

}
async function getForecast(city) {

    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = await response.json();

    forecast.innerHTML = "";

    const daily = data.list.filter(item =>
        item.dt_txt.includes("12:00:00")
    );

    daily.forEach(day => {

        const card = document.createElement("div");

        card.className = "forecast-card";

        const weekday = new Date(day.dt_txt).toLocaleDateString("en-US", {
            weekday: "short"
        });

        card.innerHTML = `
            <p>${weekday}</p>

            <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png">

            <h3>${Math.round(day.main.temp)}°C</h3>
        `;

        forecast.appendChild(card);

    });

}

function changeBackground(weather) {

    const bg = document.querySelector(".background");

    switch (weather) {

        case "Clouds":
            bg.style.background =
                "linear-gradient(135deg,#757f9a,#d7dde8)";
            break;

        case "Rain":
        case "Drizzle":
            bg.style.background =
                "linear-gradient(135deg,#4b79a1,#283e51)";
            break;

        case "Thunderstorm":
            bg.style.background =
                "linear-gradient(135deg,#232526,#414345)";
            break;

        case "Snow":
            bg.style.background =
                "linear-gradient(135deg,#E6DADA,#274046)";
            break;

        case "Clear":
            bg.style.background =
                "linear-gradient(135deg,#4facfe,#00f2fe)";
            break;

        default:
            bg.style.background =
                "linear-gradient(135deg,#4facfe,#43e97b)";
    }

}

searchBtn.addEventListener("click", () => {

    const city = cityInput.value.trim();

    if (city !== "") {

        getWeather(city);

    }

});

cityInput.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        searchBtn.click();

    }

});

currentDate();
getWeather("Delhi");