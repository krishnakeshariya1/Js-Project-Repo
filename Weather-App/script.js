// ===== Weather App Script =====

// Your API key
const API_KEY = "f5177dc9ed09a8d054ef84eb50b50a46";

// Select elements based on your HTML
const searchBar = document.querySelector("#searchBar");
const searchBtn = document.querySelector(".searchBtn");
const weatherImg = document.querySelector("#WeatherImg");
const textSpans = document.querySelectorAll(".text span");

// Function to fetch and show weather
async function getWeather(city) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found or invalid API key");
        }

        const data = await response.json();
        console.log(data); 

        const cityName = data.name;
        const temp = Math.round(data.main.temp);
        const weather = data.weather[0].main; 
        const country = data.sys.country;

        const day = new Date().toLocaleDateString("en-US", { weekday: "long" });
        textSpans[0].textContent = day;                  // Monday
        textSpans[1].textContent = `${weather} ${temp}°C`; // Cloudy 28°C
        textSpans[2].textContent = `${cityName}, ${country}`; // Gwalior, IN

        updateWeatherImage(weather);
    } catch (error) {
        textSpans[1].textContent = "—";
        textSpans[2].textContent = error.message;
        weatherImg.src = "https://cdn-icons-png.flaticon.com/512/5088/5088276.png";
    }
}

// Function to set weather image
function updateWeatherImage(weather) {
    weather = weather.toLowerCase();
    if (weather.includes("cloud")) {
        weatherImg.src = "https://cdn-icons-png.flaticon.com/512/414/414825.png";
    } else if (weather.includes("rain")) {
        weatherImg.src = "https://cdn-icons-png.flaticon.com/512/1163/1163624.png";
    } else if (weather.includes("clear")) {
        weatherImg.src = "https://cdn-icons-png.flaticon.com/512/869/869869.png";
    } else if (weather.includes("snow")) {
        weatherImg.src = "https://cdn-icons-png.flaticon.com/512/642/642102.png";
    } else {
        weatherImg.src = "https://cdn-icons-png.flaticon.com/512/5088/5088276.png";
    }
}

searchBtn.addEventListener("click", () => {
    const city = searchBar.value.trim();
    if (city) getWeather(city);
    else alert("Please enter a city name");
});

searchBar.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});
