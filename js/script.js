function ville(){
  //Recupérer city
  city = document.getElementById("city-input").value;
  console.log(city);
  if(!document.getElementById("city-input").value){
    city = "paris";
  }
  return city;
}

//fonction launch
function launch() {
  start();
  getThreeDayForecast();
}


// Fonction appelée lors du click du bouton
function start() {
  //récupérer ville à afficher
  city = ville();
  
  // Création de l'objet apiWeather
  const apiWeather = new API_WEATHER(city);
  // Appel de la fonction fetchTodayForecast
  apiWeather
    .fetchTodayForecast()
    .then(function(response) {
      // Récupère la donnée d'une API
      const data = response.data;

      // On récupère l'information principal
      const main = data.weather[0].main;
      const description = data.weather[0].description;
      const temp = data.main.temp;
      const icon = apiWeather.getHTMLElementFromIcon(data.weather[0].icon);

      // Modifier le DOM
      document.getElementById('today-forecast-main').innerHTML = main;
      document.getElementById('today-forecast-more-info').innerHTML = description;
      document.getElementById('icon-weather-container').innerHTML = icon;
      document.getElementById('today-forecast-temp').innerHTML = `${temp}°C`;
      
    })
    .catch(function(error) {
      // Affiche une erreur
      console.error(error);
    });

}

//fonction pour afficher les 3 jours de météo
function getThreeDayForecast(){
  
  city = ville();

  // Création de l'objet apiWeather3Day
  const apiWeather3Day = new API_WEATHER(city);
  // Appel de la fonction fetchTodayForecast
  apiWeather3Day
    .fetch3DayForecast()
    .then(function(response) {
      // Récupère la donnée d'une API
      const data = response.data;
      console.log(data);

      for(var i=0; i<3; i++) {
        console.log("boucle" + i );
        // On récupère l'information principal
        var main = data.list[i].weather[0].main;
        var description = data.list[i].weather[0].description;
        var temp = data.list[i].temp.day;
        var icon = apiWeather3Day.getHTMLElementFromIcon(data.list[i].weather[0].icon);

        // Modifier le DOM
        document.getElementById('day' + i + '-forecast-main').innerHTML = main;
        document.getElementById('day' + i + '-forecast-more-info').innerHTML = description;
        document.getElementById('day' + i + '-icon-weather-container').innerHTML = icon;
        document.getElementById('day' + i + '-forecast-temp').innerHTML = `${temp}°C`;
      }
    })
    .catch(function(error) {
      // Affiche une erreur
      console.error(error);
    });
}