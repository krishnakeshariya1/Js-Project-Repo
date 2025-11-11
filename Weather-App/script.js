// ===== Weather App Script =====

// Your OpenWeatherMap API Key
const API_KEY = "f5177dc9ed09a8d054ef84eb50b50a46";

// Select elements
const searchBar = document.querySelector("#searchBar");
const searchBtn = document.querySelector(".searchBtn");
const main = document.querySelector("main");

// Function to fetch weather data
async function getWeather(city) {
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found or invalid API key");
        }

        const data = await response.json();
        renderWeather(data);
    } catch (error) {
        main.innerHTML = `<div class="blury" style="padding:1rem; color:red; text-align:center;">${error.message}</div>`;
    }
}

// Function to create weather section dynamically
function renderWeather(data) {
    const cityName = data.name;
    const temp = Math.round(data.main.temp);
    const weather = data.weather[0].main;
    const country = data.sys.country;
    const day = new Date().toLocaleDateString("en-US", { weekday: "long" });
    const imgSrc = getWeatherIcon(weather);

    // Clear previous content
    main.innerHTML = "";

    // Create main container
    const topSection = document.createElement("div");
    topSection.classList.add("topSection", "flex");

    // Create image
    const img = document.createElement("img");
    img.src = imgSrc;
    img.alt = weather;

    // Create text container
    const textDiv = document.createElement("div");
    textDiv.classList.add("text", "flexCol");

    // Spans
    const spanDay = document.createElement("span");
    spanDay.textContent = day;

    const spanWeather = document.createElement("span");
    spanWeather.textContent = `${weather} ${temp}°C`;

    const spanCity = document.createElement("span");
    spanCity.textContent = `${cityName}, ${country}`;

    // Append all
    textDiv.append(spanDay, spanWeather, spanCity);
    topSection.append(img, textDiv);
    main.appendChild(topSection);
}

// Function to pick weather icon
function getWeatherIcon(weather) {
    weather = weather.toLowerCase();
    if (weather.includes("cloud")) {
        return "https://cdn-icons-png.flaticon.com/512/414/414825.png";
    } else if (weather.includes("rain")) {
        return "https://cdn-icons-png.flaticon.com/512/1163/1163624.png";
    } else if (weather.includes("clear")) {
        return "https://cdn-icons-png.flaticon.com/512/869/869869.png";
    } else if (weather.includes("snow")) {
        return "https://cdn-icons-png.flaticon.com/512/642/642102.png";
    } else {
        return "https://cdn-icons-png.flaticon.com/512/5088/5088276.png";
    }
}

// Event listeners
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

// Load default city when app starts
getWeather("Gwalior");
