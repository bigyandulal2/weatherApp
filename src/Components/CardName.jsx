import React from "react";
import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";

const key = "4e411b4d7fa2487aa7e53450242603";
const CardName = () => {
  const [city, setCity] = useState("kathmandu");
  const [data1, setData1] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchWeatherData();
  }, []);
  const fetchWeatherData = () => {
    fetch(`https://api.weatherapi.com/v1/current.json?key=${key}&q=${city}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        return response.json();
      })
      .then((data) => {
        setData1(data);

        setError(false);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setError(true);
      });
  };

  function handleClick() {
    fetchWeatherData();
    console.log(data1);
  }
  let weatherData;
  data1.length === 0
    ? (weatherData = null)
    : (weatherData = {
        country: data1.location.country,
        humidity: data1.current.humidity,
        latitude: data1.location.lat,
        name: data1.location.name,
        degree: data1.current.feelslike_c,
        fahrenheit: data1.current.feelslike_f,
      });

  return (
    <div className="CardName">
      <Card style={{ width: "18rem" }} id="cardbox">
        <input
          type="text"
          placeholder="CityName"
          value={city}
          id="cardbox"
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleClick}>
          submit
        </button>
        <Card.Body>
          {data1.length !== 0 ? (
            <>
              {error ? (
                <p>Failed to fetch weather data</p>
              ) : (
                <div>
                  <h1 className="weather-details">weather details</h1>
                  {/* <Card.Text> humidity:{weatherData.humidity}</Card.Text> */}
                  <ul className="list-unstyled">
                    {Object.entries(weatherData).map(([key, value], index) => (
                      <h5
                        className="weather-datalist"
                        key={index}
                      >{`${key}: ${value}`}</h5>
                    ))}
                    <h1>
                      {data1.current.condition.text}:{" "}
                      <img
                        src={data1.current.condition.icon}
                        alt="Weather Icon"
                      />
                    </h1>
                  </ul>
                </div>
              )}
            </>
          ) : (
            ""
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardName;
