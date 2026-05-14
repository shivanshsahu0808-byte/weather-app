const apikey = "a992738811ef953c661eaa2fbe0b340c";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

function getCityHour(timezoneOffsetSeconds) {
    const utcMs = Date.now() + (new Date().getTimezoneOffset() * 60 * 1000);
    const cityMs = utcMs + (timezoneOffsetSeconds * 1000);
    return new Date(cityMs).getHours(); 
}


async function checkWeather(city) {
    document.querySelector(".loading").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".error").style.display = "none";

    const response = await fetch(apiurl + city + `&appid=${apikey}`);

    if (response.status == 404) {
        document.querySelector(".loading").style.display = "none";
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        const data = await response.json();
        document.querySelector(".loading").style.display = "none";

        const weatherCondition = data.weather[0].main;

        const cityHour = getCityHour(data.timezone);
        const isNight = cityHour >= 20 || cityHour < 6; 

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";


        if (weatherCondition == "Clear") {
            weatherIcon.src = isNight ? "images/night.png" : "images/clear.png";

        } else if (weatherCondition == "Clouds") {
            weatherIcon.src = "images/clouds.png";

        } else if (weatherCondition == "Rain") {
            weatherIcon.src = "images/rain.png";

        } else if (weatherCondition == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";

        } else if (weatherCondition == "Mist" || weatherCondition == "Fog" || weatherCondition == "Haze") {
            weatherIcon.src = "images/mist.png";         

        } else if (weatherCondition == "Snow") {
            weatherIcon.src = "images/snow.png";

        } else if (weatherCondition == "Thunderstorm") {
            weatherIcon.src = "images/thunderstorm.png"; 

        } else {
            weatherIcon.src = "images/clear.png";       
        }

        if (weatherCondition == "Clear") {
            if (isNight) {
                document.body.style.background =
                    "linear-gradient(135deg,#0f0c29,#1a1a4e,#24243e)";
            } else {
                document.body.style.background =
                    "linear-gradient(135deg,#f59e0b,#f97316,#ea580c)";
            }

        } else if (weatherCondition == "Clouds") {
            document.body.style.background =
                "linear-gradient(135deg,#64748b,#475569,#334155)";

        } else if (weatherCondition == "Rain") {
            document.body.style.background =
                "linear-gradient(135deg,#0f172a,#1e3a8a,#2563eb)";

        } else if (weatherCondition == "Drizzle") {
            document.body.style.background =
                "linear-gradient(135deg,#0f766e,#0d9488,#14b8a6)";

        } else if (weatherCondition == "Mist" || weatherCondition == "Fog" || weatherCondition == "Haze") {
            document.body.style.background =
                "linear-gradient(135deg,#6b7280,#4b5563,#374151)";

        } else if (weatherCondition == "Snow") {
            document.body.style.background =
                "linear-gradient(135deg,#bfdbfe,#93c5fd,#60a5fa)";

        } else if (weatherCondition == "Thunderstorm") {
            document.body.style.background =
                "linear-gradient(135deg,#1e1b4b,#312e81,#4338ca)";

        } else {
            document.body.style.background =
                "linear-gradient(135deg,#0f172a,#1e293b,#334155)";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}


searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});
