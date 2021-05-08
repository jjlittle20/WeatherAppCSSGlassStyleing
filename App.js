import React, { useState } from "react";
import "./App.css";
const api = {
  // "hides " the api key and base. probably better to call from different script and hidefrom github when uploaded
  key: "abcac50747009dc1ed93efeccdbb253a",
  base: "https://api.openweathermap.org/data/2.5/",
};
//simple way to get date/time
let date = String(new window.Date());
// slices date down from long format(log out the date to see long string.)
date = date.slice(0, 15);
console.log(date);

// breaks down a returned date from the future using epoch time and displays it as a day. moving this code around a bit you can draw out any part from the date/time/week

function App() {
  // sets the current weather and setst the search using the set query,query
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState("");
  const [fivedayforecast, setFivedayforecast] = useState("");
  // waits for the enter key to be pressed after something has been entered in the search bar
  const search = (evt) => {
    if (evt.key === "Enter") {
      //makes a call to the api and returns data
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        //converts the raw data to .json better for humans to read
        .then((res) => res.json())

        .then((result) => {
          // asigns the result from the api call to setWeather
          setWeather(result);
          //resets the searchbox

          fetch(`${api.base}forecast?q=${query}&units=metric&APPID=${api.key}`)
            .then((resfive) => resfive.json())
            .then((resultfive) => {
              setFivedayforecast(resultfive);
            });
        });

      setQuery("");
    }
  };
  const searchButton = (evt) => {
    //makes a call to the api and returns data
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      //converts the raw data to .json better for humans to read
      .then((res) => res.json())

      .then((result) => {
        // asigns the result from the api call to setWeather
        setWeather(result);
        //resets the searchbox
        setQuery("");
      });
  };

  return (
    <div className="App">
      <header>
        <h1>Weather.ly</h1>
      </header>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="London, New York, Paris"
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
          <button className="search-button" onClick={searchButton}>
            Search
          </button>
        </div>
        {typeof weather.main != "undefined" ? (
          <div className="local-weather">
            <div className="location-box">
              <h2 className="location">
                {/* sets the weatehr name and country from the search query return and filters out what we need using api docs   */}
                {weather.name}, {weather.sys.country}
              </h2>
              {/* calls the date from the code at the top of page */}
              <div className="date">{date}</div>
            </div>

            {/* rounds the returned temp to the nearest whole number */}
            <h3 className="temp">{Math.round(weather.main.temp)}°c</h3>
            {/* [0] takes the first weather result at index 0 if there are multiple results for a large city. */}
            <h4 className="weather">{weather.weather[0].main}</h4>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
