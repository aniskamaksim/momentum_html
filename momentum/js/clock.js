/*TIME & DATE*/

function showTime() {
  const time = document.querySelector(".time");
  const date = new Date();
  const currentTime = date.toLocaleTimeString("en-GB");
  time.textContent = currentTime;
}
setInterval(function () {
  showTime();
}, 1000);
showTime();

function showDate() {
  const date = new Date();
  const currDate = document.querySelector(".date");
  const options = { month: "long", day: "numeric", weekday: "long" };
  const currentDate = date.toLocaleDateString("en-En", options);
  currDate.textContent = currentDate;
}
setInterval(function () {
  showDate();
}, 1000);
showDate();

/*GREETING PHRASE*/

function showGreeting() {
  const greetingWords = document.querySelector(".greeting");
  const timeOfDay = getTimeOfDay();
  const greetingText = `Good ${timeOfDay}`;
  greetingWords.textContent = greetingText;
}
setInterval(function () {
  showGreeting();
}, 1000);
showGreeting();

function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  if (hours < 6 && hours >= 0) {
    return "night";
  } else if (hours < 12 && hours >= 6) {
    return "morning";
  } else if (hours < 18 && hours >= 12) {
    return "afternoon";
  } else {
    return "evening";
  }
}
setInterval(function () {
  getTimeOfDay();
}, 1000);
getTimeOfDay();

function changeBgImg() {
  var block = document.getElementById("body");
  block.style.backgroundImage = "url('https://raw.githubusercontent.com/aniskamaksim/momentum-files/momentum/assets/img/bg.jpg')";
}
changeBgImg();

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
getRandom(1, 21);

let randomNum = getRandom(1, 20);
function setBg() {
  const timeOfDay = getTimeOfDay();
  const bgNum = randomNum.toString().padStart(2, "0");
  const image = new Image();
  const url = `https://raw.githubusercontent.com/aniskamaksim/momentum-files/assets/images/${timeOfDay}/${bgNum}.jpg`;
  image.onload = () => {
    document.body.style.backgroundImage = `url(${url})`;
  };
  image.src = url;
}
setBg();

function getSlideNext() {
  if (randomNum >= 20) {
    randomNum = 1;
  } else {
    randomNum++;
  }
  setBg();
}
const slideNext = document.querySelector(".slide-next");
slideNext.addEventListener("click", getSlideNext);

function getSlidePrev() {
  if (randomNum == 1) {
    randomNum = 20;
  } else {
    randomNum--;
  }
  setBg();
}
const slidePrev = document.querySelector(".slide-prev");
slidePrev.addEventListener("click", getSlidePrev);

/*QOUTE BLOCK*/

async function getQuotes() {
  const currQuote = document.querySelector(".quote");
  const currAuthor = document.querySelector(".author");
  const quotes = "./js/data.json";
  const res = await fetch(quotes);
  const data = await res.json();
    console.log(data[0])
  currQuote.textContent = data[randomNum].quote;
  currAuthor.textContent = data[randomNum].author;
  if (randomNum === 102) {
    randomNum = 0;
  }
  randomNum++;
}
getQuotes();
const changeQoute = document.querySelector(".change-quote");
changeQoute.addEventListener("click", getQuotes);

/*WEATHER BLOCK*/

const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const windy = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");

async function getWeather(cityString) {
  try {
    weatherIcon.className = "weather-icon owf";
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${cityString}&lang=en&appid=7e3f19a944493dfca234ed69199dfbf1&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(
      data.weather[0].id,
      data.weather[0].description,
      data.main.temp
    );
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windy.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
    weatherDescription.textContent = data.weather[0].description;
  } catch (err) {
    console.log(err);
    alert("Error. Try another city");
    document.querySelector(".city").value = "Minsk";
    changeWeather();
  }
}
//getWeather();
const city = document.querySelector(".city");
city.addEventListener("change", () => changeWeather());

function changeWeather() {
  var city = document.querySelector(".city");
  let cityString = `${city.value}`;
  let cityStringInput = getWeather(cityString);
  localStorage.setItem("city", cityString);
}
function setDefaultWeather() {
  var city = document.querySelector(".city");
  const cityName = localStorage.getItem("city");
  if (cityName !== null) {
    city.value = cityName;
  } else {
    city.value = "Minsk";
  }
  changeWeather();
}
window.addEventListener("load", setDefaultWeather);

/*LOCAL STORAGE NAME*/

function saveUserName() {
  const name = document.querySelector(".name");
  localStorage.setItem("name", name.value);
}
function loadUserName() {
  const name = document.querySelector(".name");
  if (localStorage.getItem("name")) {
    name.value = localStorage.getItem("name");
  }
}
window.addEventListener("load", loadUserName);
const nameElement = document.querySelector(".name");
nameElement.addEventListener("change", () => saveUserName());

/* AUDIO */

// import playList from './playlist.js';
const play = document.querySelector('.play');
const nextTrack = document.querySelector('.play-next');
const prevTrack = document.querySelector('.play-prev');
const trackList = document.querySelector('.play-list');
const currentTrackTitle = document.querySelector('.current-track-title');
const tracks = trackList.childNodes;

console.log(playList);
trackList.style.listStyleType = 'none';
let isPlay = false;
const audio = new Audio();
let playNum = 0;
currentTrackTitle.textContent = playList[playNum].title;
for (let i = 0; i < playList.length; i++){
    const li = document.createElement('li');
    li.classList.add('track');
    li.textContent = playList[i].title;
    li.id = `track${i}`;
    trackList.append(li);
    
};
function playAudio () {
    audio.src = playList[playNum].src;
    tracks[playNum].classList.toggle('item-active');
    if (!isPlay) {        
        audio.currentTime = 0;
        audio.play();
        isPlay = true;
        currentTrackTitle.textContent = playList[playNum].title;
        play.classList.add('pause');
        
    }else if (!isPlay === false){
        audio.pause();
        isPlay = false;
        
        play.classList.remove('pause');        
    }
    
    addActiveTrack(playNum);
}    

function playPrevTrack() {
    tracks[playNum].classList.remove('item-active');
    if(playNum == 0){
        playNum = playList.length -1;
    }else{
    playNum = playNum - 1;
}
    isPlay = false;
    
    playAudio();
    console.log(playNum);
}

function playNextTrack() {
    tracks[playNum].classList.remove('item-active');
    playNum = playNum >= playList.length - 1 ? 0 : ++playNum;
    isPlay = false;
    playAudio();
    
    console.log(playNum);
}
play.addEventListener('click', playAudio);

function prevNextTrack (){
    nextTrack.addEventListener('click', playNextTrack);
    prevTrack.addEventListener('click', playPrevTrack);
    
}
prevNextTrack();



tracks.forEach ((el, index) => {    
    el.addEventListener('click', function() {
      if (playNum === index && isPlay === true){
        isPlay = true;
      }else {
        isPlay = false;
        play.classList.remove('pause');
        tracks[playNum].classList.remove('item-active');
      }
      playNum = index;
      
      playAudio();
    })
});

  audio.addEventListener('ended', function(){
    playNextTrack();
  });
