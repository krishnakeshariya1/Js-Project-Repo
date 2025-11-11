const searchBar = document.querySelector("#searchBar");
const searchBtn = document.querySelector(".searchBtn");
const mainSection = document.querySelector('main');
const city = "Delhi";
const API_KEY = "f5177dc9ed09a8d054ef84eb50b50a46";
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
fetch(url)
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error("Error:", err));