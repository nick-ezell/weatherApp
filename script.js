$(document).ready(function () {

    //Search area
    let searchDiv = $(".search")
    let forecastDiv = $(".forecast");
    let searchInput = $("<textarea>");
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
    searchedCities.attr("class", "recentCities");
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
        let city = searchInput.val();
        let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + key;
        if (!searchedCitiesArr.includes(searchedCity)) {
            searchedCitiesArr.push(searchedCity)
        } else if (searchedCitiesArr.includes(searchedCity)) {
            return alert("You've already searched this city! " + "🌐")
        };
        searchInput.val("")
        console.log(searchedCitiesArr);
        console.log(city);
        addNewCity();

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (data) {
            //Forecast div and AJAX call.
            let currentCity = $("<p>").attr("class", "currentCity");
            currentCity.text(data.name.trim())
            forecastDiv.append(currentCity);
            console.log(data);
        })
    });




});