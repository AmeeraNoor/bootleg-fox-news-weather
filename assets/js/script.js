// const mostRecentSearchedCity = document.getElementById('#cityname');

// const allSearchedCities = JSON.parse(localStorage.getElementById(?)) || []

// console.log (localStorage.setItem('?', JSON.stringify('?')))

function get_weather() {
    var city = $("#cityname").val();

    save_city(city)

    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&mode=json&appid=df5ae6c9c9e7d69f67191beea300511f&units=imperial",
        type: "get",
        success: function (data) {
            $("#city").html(data.city.name + " (" + data.city.country + ")");
            var weatherContent = "";
            var previousDay = dayjs(data.list[0].dt * 1000).get('day')
            var counter = 0
            for (i in data.list) {
                if (counter > 4) {
                    break
                }
                var currentDay = dayjs(data.list[i].dt * 1000)
                var day = currentDay.get('day')
                if (day == previousDay && i != 0) {
                    continue;
                }
                counter++
                var previousDay = day;

                weatherContent += "<div class='col-md-2 text-center weather-day' ><div class = 'alert alert-info'>";
                weatherContent += currentDay.format('MM/DD/YYYY') + "<br/>"
                weatherContent += "<img src= 'http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png'/><br/>"
                weatherContent += Math.round(data.list[i].main.temp) + "&deg;F<br/>"
                weatherContent += "<strong>" + data.list[i].weather[0].main + "</strong><br/>"
                weatherContent += "<em>(" + data.list[i].weather[0].description + ")</em><br/>"
                weatherContent += "Wind: " + Math.round(data.list[i].wind.speed) + " MPH<br/>"
                weatherContent += "Humidity: " + data.list[i].main.humidity + " %<br/>"
                weatherContent += "</div></div>";
            }
            $("#output").html(weatherContent)
        }

    })

}

function save_city(cityName) {

}

get_weather()