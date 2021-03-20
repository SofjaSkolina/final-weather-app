let now = new Date();
let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let weekday = weekdays[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();
minutes = minutes > 9 ? minutes : '0' + minutes;
hour = hour > 9 ? hour : '0' + hour;

let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${weekday} ${hour}:${minutes}`;

function formatHours (timestamp){
  let now = new Date(timestamp);
  let hour = now.getHours();
let minutes = now.getMinutes();
minutes = minutes > 9 ? minutes : '0' + minutes;
hour = hour > 9 ? hour : '0' + hour;
  return `${hour}:${minutes}`;
}
function showWeather(response) {
  document.querySelector("h1").innerHTML= response.data.name;
  document.querySelector("#temperature").innerHTML = `   ${Math.round(response.data.main.temp)}°C`;
 document.querySelector("#humidity").innerHTML = `  ${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `  ${Math.round(response.data.wind.speed)}km/h`;
  document.querySelector("#feeling").innerHTML= response.data.weather[0].description;
let icon = document.querySelector("#icon");
 icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);

  let apiKey = "edab5056ac17d7bbccfb78a16eafdf10";
  apiUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${response.data.name}&appid=${apiKey}&units=metric`;
  
  axios.get(apiUrl).then(showForecast);
}

    function showPosition(position){

        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        let apiKey = "edab5056ac17d7bbccfb78a16eafdf10";
        let units = "metric";
       let apiUrl=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
       
       axios.get(apiUrl).then(showWeather);

  apiUrl=`https://api.openweathermap.org/data/2.5/forecast/hourly?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  
  axios.get(apiUrl).then(showForecast);

    }
    function getCurrentPosition(){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", getCurrentPosition);

function showForecast(response){
  
  let forecastSection = document.querySelector("#forecast");
  forecastSection.innerHTML=null;
  let forecast =null;
  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    
  forecastSection.innerHTML +=`<div class="col-4">
    <h5>
    ${formatHours(forecast.dt * 1000)}

    <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" />
    </h5>
       <p>
    ${Math.round(forecast.main.temp_max)}° <br />
    ${Math.round(forecast.main.temp_min)}°
    </p>
    </div>
  `;   
  index++;
  }
}

function searchCity(city) {
  let apiKey = "edab5056ac17d7bbccfb78a16eafdf10";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);

  apiUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showForecast);
}
function search(event) {
  event.preventDefault();
  let searchInpit = document.querySelector("#search-button");
  let h1 = document.querySelector("h1");
  h1.innerHTML = searchInpit.value;
  let city = searchInpit.value;
  let apiKey = "edab5056ac17d7bbccfb78a16eafdf10";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(showWeather);

  apiUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  
  axios.get(apiUrl).then(showForecast);
}
let searchButton = document.querySelector("#city-search");
searchButton.addEventListener("submit", search);



searchCity("Riga");
