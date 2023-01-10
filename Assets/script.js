var apikey = "630f4b43508fe10de82e1d2bcbfc0d8f";
//retrieve city searched in the input
var cityInputEl = document.getElementById("city-input");
var searchbtnEl = document.getElementById("search-button");
var cityListDiv = document.querySelector(".city-list");
var citySearched, citybuttonEl;
var latitudeData, longitudeData;

fetchgeodata();
//click on the search button to start fetch data
// searchbtnEl.addEventListener("click", fetchgeodata(citySearched));
//add city in the list below search section
searchbtnEl.addEventListener("click", function () {
  citySearched = cityInputEl.value;
  var alertMsg = document.createElement("p");;
  if (citySearched === "") {
    alertMsg.textContent = "You have to enter a name of the city";
    cityListDiv.append(alertMsg);
  } else {
    alertMsg.remove();
    if (cityListDiv.children.length === 6) {
      alertMsg = document.createElement("p");
      alertMsg.textContent =
        "You have add maximum 6 cities. Please double-click to remove one";
      cityListDiv.append(alertMsg);
    } else {
      citybuttonEl = document.createElement("button");
      citybuttonEl.textContent = citySearched;
      cityListDiv.append(citybuttonEl);
      cityInputEl.value = "";
    }
  }
});

cityInputEl.addEventListener("dblclick", function () {
  console.log(MouseEvent);
  Mouseevent.target.remove();
});

//add weather info in the 5-day forecast card
//click on city to show weather infor in the city-in-display box
// fetch geo data
function fetchgeodata() {
  var georequestUrl =
    "http://api.openweathermap.org/geo/1.0/direct?q=Seattle&limit=5&appid=630f4b43508fe10de82e1d2bcbfc0d8f";
  console.log(georequestUrl);
  fetch(georequestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      latitudeData = data[0].lat;
      longitudeData = data[0].lon;
    });
}

//return lat and long data of a city

fetchweatherdata(latitudeData, longitudeData);

//fetch weather data
function fetchweatherdata(latitude, longitude) {
  var weatherrequestUrl =
    "https://api.openweathermap.org/data/2.5/forecast?lat={latitude}&lon={longitude}&appid={apikey}";
  fetch(weatherrequestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}
