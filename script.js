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

if (minutes.length === 1) {
  minutes = "0" + minutes;
}
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${weekday} ${hour}:${minutes}`;

function searchCity(city) {
  let apiKey = "edab5056ac17d7bbccfb78a16eafdf10";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
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

}
let searchButton = document.querySelector("#city-search");
searchButton.addEventListener("submit", search);

function showWeather(response) {
  document.querySelector("h1").innerHTML= response.data.name;
  document.querySelector("#temperature").innerHTML = `${Math.round(response.data.main.temp)}°C`;
 document.querySelector("#humidity").innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(response.data.wind.speed)}km/h`;
}

    function showPosition(position){

        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        let apiKey = "edab5056ac17d7bbccfb78a16eafdf10";
        let units = "metric";
       let apiUrl=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
       console.log(apiUrl);
       axios.get(apiUrl).then(showWeather);

    }
    function getCurrentPosition(){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", getCurrentPosition);

searchCity("Riga");
