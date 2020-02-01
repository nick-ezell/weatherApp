$(document).ready(function () {
    //Search area
    let searchDiv = $(".search")
    let searchInput = $("<input>");
    let h3 = $("<h3>");
    let searchBtn = $("<button>");
    let searchedCities = $("<div>");
    let searchedCitiesArr = [];
    searchDiv.append(h3);
    h3.text("Search for a city:")
    searchDiv.append(searchInput);
    searchDiv.append(searchBtn);
    searchDiv.append(searchedCities);
    searchedCities.attr("class", "recentCities");
    function addNewCity() {
        // searchedCities.empty();
        let cities = $("<section>").attr("class", "cities");
        for (i = 0; i < searchedCitiesArr.length; i++) {
            searchedCities.append(cities);
            cities.text(searchedCitiesArr[i]);
        }
    };
    searchBtn.on("click", function () {
        //  let searchedCity = searchInput.val();
        // for(i = 0; i < searchedCitiesArr.length; i++){
        //     if(searchedCity !== searchedCitiesArr[i] || searchedCitiesArr.length == 0){
        //         searchedCitiesArr.push(searchedCity);
        //     } else {
        //         alert("You've already searched this city, find it below!")
        //     }
        // }
        let searchedCity = searchInput.val();
        searchedCitiesArr.push(searchedCity);
        searchInput.val("")
        console.log(searchedCitiesArr);
        addNewCity();
    });

    //Variables for API
    const key = "2d8b4f870d285189aa67e03e30f0d6e3";
    const city = searchInput.val();
    const queryURL = "http://api.openweathermap.org/data/2.5/forecast?id=" + city + "&APPID=" + key;
});