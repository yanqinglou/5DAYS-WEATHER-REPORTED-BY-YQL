var apikey = "630f4b43508fe10de82e1d2bcbfc0d8f";
//retrieve city searched in the input
var cityInputEl = document.getElementById("city-input");
var searchbtnEl = document.getElementById("search-button");
var cityListDiv = document.querySelector(".city-list");
var weatherInfoLocal = [];
weatherInfoLocal = localStorage.getItem("weather-info-local");
var cityInfoLocal = { city: "", temp: "", wind: "", humidity: "" };
var citySearched, citybuttonEl;
var latitudeData, longitudeData;
var limit = 5;

var citySelectedEl = document.getElementById("city-selected");
var todayDateEl = document.getElementById("today-date");
var cityindisplayTemp = document.getElementById("temp");
var cityindisplayWind = document.getElementById("wind");
var cityindisplayHumidity = document.getElementById("humidity");

var fivedayscity = document.querySelectorAll('#weather-card-city')
var fivedaysTemp = document.querySelectorAll('#weather-card-temp')
var fivedaysWind = document.querySelectorAll('#weather-card-wind')
var fivedaysHumidity = document.querySelectorAll('#weather-card-humidity')

//click on the search button to start fetch data
// searchbtnEl.addEventListener("click", fetchgeodata(citySearched));
//add city in the list below search section
searchbtnEl.addEventListener("click", function () {
  citySearched = cityInputEl.value;
  var alertMsg = document.createElement("p");
  if (citySearched === "") {
    alertMsg.textContent = "You have to enter a name of the city";
    cityListDiv.append(alertMsg);
  } else {
    citybuttonEl = document.createElement("button");
    citybuttonEl.textContent = citySearched;
    cityListDiv.append(citybuttonEl);
    cityInputEl.value = "";
    //fetch geo data
    fetchgeodata(citySearched, limit, apikey);
    console.log(citySearched);
  }
});

function fetchgeodata(city, limit, apikey) {
  var georequestUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${apikey}`;
  fetch(georequestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //return lat and long data of a city
      latitudeData = data[0].lat;
      longitudeData = data[0].lon;
      // //fetch weather data through lat and lon
      fetchweatherdata(latitudeData, longitudeData, apikey);
    });
}

function fetchweatherdata(latitude, longitude, apikey) {
  var weatherrequestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apikey}&units=imperial`;
  fetch(weatherrequestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //show weather
      console.log(data);
      //Show information in the display box
      //show city name
      citySelectedEl.textContent = data.city.name;
      //show date
      todayDateEl.textContent = data.list[0].dt_txt;
      //show temperature
      cityindisplayTemp.textContent = data.list[0].main.temp;
      //show wind speed
      cityindisplayWind.textContent = data.list[0].wind.speed + " MPH";
      //show hunmidity
      cityindisplayHumidity.textContent = data.list[0].main.humidity + "%";

      //Save today's weather information to local storage
      cityInfoLocal.city = data.city.name;
      cityInfoLocal.wind = data.list[0].wind.speed + " MPH";
      cityInfoLocal.temp = data.list[0].main.temp;
      cityInfoLocal.humidity = data.list[0].main.humidity + "%";
      console.log(cityInfoLocal);
      console.log(weatherInfoLocal);
      weatherInfoLocal.push(cityInfoLocal)
      
      localStorage.setItem(
        "weather-info-local",
        JSON.stringify(weatherInfoLocal)
      );

      //5 days information
      for (var i=7;i<40;i=i+8){
        for (var j=0;j<5;j++){
          fivedayscity[j].textContent=data.list[0].dt_txt;
          fivedaysTemp[j].textContent=data.list[i].main.temp;
          fivedaysWind[j].textContent=data.list[i].wind.speed + " MPH";
          fivedaysHumidity[j].textContent=data.list[i].main.humidity + "%";
        }
      }

    });
}

//add weather info in the 5-day forecast card
//click on city to show weather infor in the city-in-display box
