//fetch geo data
// var georequestUrl = 'http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={b630f4b43508fe10de82e1d2bcbfc0d8f}'
// var apikey = "b630f4b43508fe10de82e1d2bcbfc0d8f"
// fetch(requestUrl)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data)
//   })

//fetch weather data
var weatherrequestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=-0.1257&lon=51.5085&appid=630f4b43508fe10de82e1d2bcbfc0d8f'
fetch(weatherrequestUrl
//     , {
//     headers:{
//         authorization: `Bearer ${apikey}`
//     }
// }
)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data)
  })