$(document).ready(function () {

    //Search area
    let today = moment().format("l");
    let searchDiv = $(".search")
    let forecastDiv = $(".forecast");
    let searchInput = $("<input>");
    let h3 = $("<h3>");
    let searchBtn = $("<button>");
    let searchIcon = $("<img>");
    searchIcon.attr("src", "./search.ico");
    let searchedCities = $("<div>");
    searchedCities.attr("class", "searchedCities");
    let searchedCitiesArr = [];
    let searchBarDiv = $("<div>");
    searchBarDiv.attr("class", "searchBar");
    searchDiv.append(h3);
    searchDiv.append(searchBarDiv);
    h3.text("Find your city:")
    searchBarDiv.append(searchInput);
    searchBtn.append(searchIcon);
    searchBarDiv.append(searchBtn);
    searchDiv.append(searchedCities);
    searchedCities.attr("class", "searchedCities");
    //Function for populating searchedCities div.
    function addNewCity() {
        // searchedCities.empty();
        let cities = $("<section>").attr("class", "cities");
        for (i = 0; i < searchedCitiesArr.length; i++) {
            searchedCities.append(cities);
            cities.text(searchedCitiesArr[i]);
        }
    };
    searchBtn.on("click", function () {
        let searchedCity = searchInput.val();
        //Variables for API
        let key = "2d8b4f870d285189aa67e03e30f0d6e3";
        let city = searchedCity;
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + key;
        if (!searchedCitiesArr.includes(searchedCity)) {
            searchedCitiesArr.push(searchedCity)
        } else if (searchedCitiesArr.includes(searchedCity)) {
            return alert("You've already searched this city! " + "🌐")
        };
        searchInput.val("");
        addNewCity();
        //We need to add click event to display searched cities
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (props) {
            // let icon = props.weather[0].icon;
            // let weatherIcon = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + icon + ".png");
            let fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?appid=" + key + "&q=" + props.name + "," + props.sys.country;
            let uvQuery = "https://api.openweathermap.org/data/2.5/uvi?appid=" + key + "&lat=" + props.coord.lat + "&lon=" + props.coord.lon;
            let currentCityDiv = $("<div>").attr("id", "currentCity");
            let currentCity = $("<h2>").attr("class", "currentCity");
            let currentTemp = $("<p>").attr("class", "temperature");
            let tempF = (props.main.temp - 273.15) * 1.80 + 32;
            let currentHumidity = $("<p>").attr("class", "humidity");
            let currentWind = $("<p>").attr("class", "windSpeed");
            let currentUV = $("<p>").attr("class", "uv");
            forecastDiv.empty();
            currentCity.text(props.name.trim() + " " + today);
            forecastDiv.append(currentCityDiv);
            currentCityDiv.append(currentCity);
            currentTemp.text("Temperature: " + tempF.toFixed(2) + "°F");
            currentCityDiv.append(currentTemp);
            currentHumidity.text("Humidity: " + props.main.humidity + "%");
            currentCityDiv.append(currentHumidity);
            currentWind.text("Wind Speed: " + (props.wind.speed / 1.609).toFixed(2) + "mph");
            currentCityDiv.append(currentWind);
            currentCityDiv.append(currentUV);
            $.ajax({
                url: uvQuery,
                method: "GET"
            }).then(function (data) {
                currentUV.text("UV Index: " + data.value);
            })
            $.ajax({
                url: fiveDayURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                let dayArr = [];
                let fiveDayDiv = $("<div>").attr("class", "fiveDayDiv");
                for (i = 0; i < response.list.length; i++) {
                    let midday = response.list[i].dt_txt.substring(10);
                    let kToF = (response.list[i].main.temp - 273.15) * 1.80 + 32;
                    temp = "Temperature: " + kToF.toFixed(2) + "°F";
                    humidity = "Humidity: " + response.list[i].main.humidity + "%";
                    let containsMidday = midday.indexOf("12:00:00");
                    if (containsMidday === 1) {
                        let eachDay = response.list[i];
                        dayArr.push(eachDay);
                    }
                }
                forecastDiv.append(fiveDayDiv);
                let dayOne = $("<div>").attr("class", "fiveDay");
                let dayTwo = $("<div>").attr("class", "fiveDay");
                let dayThree = $("<div>").attr("class", "fiveDay");
                let dayFour = $("<div>").attr("class", "fiveDay");
                let dayFive = $("<div>").attr("class", "fiveDay");
                //Day one of forecast
                fiveDayDiv.append(dayOne);
                let dayOneDate = $("<p>").text(moment().add(1,"day").format("l"))
                dayOne.append(dayOneDate);
                dayOne.append($("<hr>"));
                let dayOneTempMath = (dayArr[0].main.temp - 273.15) * 1.80 + 32;
                let dayOneTemp = $("<p>").text("Temp: " + dayOneTempMath.toFixed(2) + "°F");
                dayOne.append(dayOneTemp);
                let dayOneHumidity = $("<p>").text("Humidity: " + dayArr[0].main.humidity + "%");
                dayOne.append(dayOneHumidity);
                //Day two of forecast
                fiveDayDiv.append(dayTwo);
                let dayTwoDate = $("<p>").text(moment().add(2,"day").format("l"))
                dayTwo.append(dayTwoDate);
                dayTwo.append($("<hr>"));
                let dayTwoTempMath = (dayArr[1].main.temp - 273.15) * 1.80 + 32;
                let dayTwoTemp = $("<p>").text("Temp: " + dayTwoTempMath.toFixed(2) + "°F");
                dayTwo.append(dayTwoTemp);
                let dayTwoHumidity = $("<p>").text("Humidity: " + dayArr[1].main.humidity + "%");
                dayTwo.append(dayTwoHumidity);
                //Day three of forecast
                fiveDayDiv.append(dayThree);
                let dayThreeDate = $("<p>").text(moment().add(2,"day").format("l"))
                dayThree.append(dayThreeDate);
                dayThree.append($("<hr>"));
                let dayThreeTempMath = (dayArr[2].main.temp - 273.15) * 1.80 + 32;
                let dayThreeTemp = $("<p>").text("Temp: " + dayThreeTempMath.toFixed(2) + "°F");
                dayThree.append(dayThreeTemp);
                let dayThreeHumidity = $("<p>").text("Humidity: " + dayArr[2].main.humidity + "%");
                dayThree.append(dayThreeHumidity);
                //Day four of forecast
                fiveDayDiv.append(dayFour);
                let dayFourDate = $("<p>").text(moment().add(2,"day").format("l"))
                dayFour.append(dayFourDate);
                dayFour.append($("<hr>"));
                let dayFourTempMath = (dayArr[3].main.temp - 273.15) * 1.80 + 32;
                let dayFourTemp = $("<p>").text("Temp: " + dayFourTempMath.toFixed(2) + "°F");
                dayFour.append(dayFourTemp);
                let dayFourHumidity = $("<p>").text("Humidity: " + dayArr[3].main.humidity + "%");
                dayFour.append(dayFourHumidity);
                //Day five of forecast
                fiveDayDiv.append(dayFive);
                let dayFiveDate = $("<p>").text(moment().add(2,"day").format("l"))
                dayFive.append(dayFiveDate);
                dayFive.append($("<hr>"));
                let dayFiveTempMath = (dayArr[4].main.temp - 273.15) * 1.80 + 32;
                let dayFiveTemp = $("<p>").text("Temp: " + dayFiveTempMath.toFixed(2) + "°F");
                dayFive.append(dayFiveTemp);
                let dayFiveHumidity = $("<p>").text("Humidity: " + dayArr[4].main.humidity + "%");
                dayFive.append(dayFiveHumidity);
                console.log(dayArr);
            })
        })
    });
});