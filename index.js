function formatdate(timestamp) {
    //calculate the date
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Sataurday",
    ];
    let day = days[date.getDate()];
    return `${day} ${hours}:${minutes}`;
  }
  
  function formatDate(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Sataurday",
    ];
  
    return days[day];
  }
  
  function displayForecast(response) {
    let forecast = response.data.daily;
  
    let forecastElement = document.querySelector("#forecast");
  
    let forecastHTML = `<div class="row">`;
    forecast.forEach(function (forecastDay, index) {
      if (index < 6) {
        forecastHTML =
          forecastHTML +
          `
          <div class="col-2">
          <div class="weather-forecast-date">${formatDate(forecastDay.dt)}</div>
        
          <img
            src="https://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt=""
            width="42"
          />
          <div class="weather-forecast-temperature">
            <span class="weather-forecast-temperature-max">${Math.round(
              forecastDay.temp.max
            )}°</span>
            <span class="weather-forecast-temperature-min">${Math.round(
              forecastDay.temp.min
            )}°</span>
          </div>
          </div>
       `;
      }
    });
  
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
  }
  function getForecast(coordinates) {
    let apiKey = "7ed26a6948c661d05fafe7355b41b2ec";
    let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    console.log(apiURL);
    axios.get(apiURL).then(displayForecast);
  }
  
  function displayTemp(response) {
    console.log(response.data);
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");
  
    celsiusTemp = response.data.main.temp;
  
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatdate(response.data.dt * 1000);
    iconElement.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);
  
    getForecast(response.data.coord);
  }
  function search(city) {
    let apiKey = "0dbd283cb3f76aff4248388678262aab";
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    console.log(apiURL);
    axios.get(apiURL).then(displayTemp);
  }
  function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-Input");
    search(cityInputElement.value);
  }
  function displayFahrenheitTemp(event) {
    event.preventDefault();
  
    let temperatureElement = document.querySelector("#temperature");
  
    //remove the active class the celsius link
    celsiuslink.classList.remove("active");
    fahrenheitlink.classList.add("active");
    let fahrentheitTemp = (celsiusTemp * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrentheitTemp);
  }
  function displayCelsiusTemp(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
  
    celsiuslink.classList.add("active");
    fahrenheitlink.classList.remove("active");
    temperatureElement.innerHTML = Math.round(celsiusTemp);
  }
  
  search("New York");
  
  let celsiusTemp = null;
  let form = document.querySelector("#search-form");
  form.addEventListener("submit", handleSubmit);
  
  let fahrenheitlink = document.querySelector("#fahrenheit-link");
  fahrenheitlink.addEventListener("click", displayFahrenheitTemp);
  
  let celsiuslink = document.querySelector("#celsius-link");
  celsiuslink.addEventListener("click", displayCelsiusTemp);
  search("Lagos");
  displayForecast();