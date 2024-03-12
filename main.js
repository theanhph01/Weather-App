async function getWeather(apiUrl) {
  try {
    const resp = await fetch(apiUrl);
    const weatherObj = await resp.json();
    return weatherObj;
  } catch (err) {
    console.log(`Error API: ${err.message}`);
  }
}
const getCity = () => {
  try {
    const city = document.querySelector(".search input").value;
    return city;
  } catch (err) {
    console.log(`Error getCity: ${err.message}`);
  }
};

async function main() {
  const apiKey = "2cc63f1f3a4786683651aba95dd894fd";
  const city = getCity();
  console.log(city);
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const weatherObj = await getWeather(apiUrl);
  console.log(weatherObj);

  if (weatherObj.cod > 200) {
    document.querySelector(".error").style.display = "block";
  } else {
    document.querySelector(".error").style.display = "none";
    document.querySelector(".city").innerHTML = weatherObj.name;
    document.querySelector(".temp").innerHTML = `${Math.round(
      weatherObj.main.temp
    )}°c`;
    document.querySelector(
      ".humidity"
    ).innerHTML = `${weatherObj.main.humidity}%`;
    document.querySelector(".wind").innerHTML = `${weatherObj.wind.speed} km/h`;

    const weatherIcon = document.querySelector(".weather-icon");
    weatherIcon.src = `./images/${weatherObj.weather[0].main}.png`;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  main();
  const searchBtn = document.querySelector(".search button");
  searchBtn.addEventListener("click", () => {
    main();
  });
});
