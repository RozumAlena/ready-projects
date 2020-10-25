const time = document.querySelector ('.time'),
     greeting = document.querySelector('.greeting'),
     name = document.querySelector('.name'),
     focus = document.querySelector('.focus'),
     curDate = document.querySelector('.date'),
         
     weatherIcon = document.querySelector('.weather-icon'),
    temperature = document.querySelector('.temperature'),
    weatherDescription = document.querySelector('.weather-description'),
    city = document.querySelector('.city');

    function showTime () {
       let today = new Date(),
        hour = today.getHours(),
        min = today.getMinutes(),     
        sec = today.getSeconds();
        time.innerHTML = `${hour} <span>:</span> ${addZero(min)} <span>:</span> ${addZero(sec)}`;
        setTimeout(showTime, 1000);
    }
//////////
function addZero (n) {
    return ((parseInt(n) < 10) ? '0' : '') + n;
}

function setBgGreeting () {
    let today = new Date(),
    hour = today.getHours();
    if ((hour > 6) && (hour < 12) ) {
    document.body.style.backgroundImage = "url('/assets/images/morning/01.jpg')";
    greeting.textContent = "Good morning";
    } else if ((hour >= 12) && (hour < 18) ) {
    document.body.style.backgroundImage = "url('/assets/images/day/01.jpg')";
    greeting.textContent = "Good day";
    } else if ((hour >= 18) && (hour < 24) ) {
    document.body.style.backgroundImage = "url('/assets/images/evening/01.jpg')";
    greeting.textContent = "Good evening";
    document.body.style.color = "white";
    } else {
        document.body.style.backgroundImage = "url('/assets/images/night/01.jpg')";
        greeting.textContent = "Good night";
        document.body.style.color = "white";
        }
}

function getName() {
    if (localStorage.getItem('name') === null) {
        name.textContent = '[Enter Name]';
    } else {
        name.textContent = localStorage.getItem('name');
    }
}

function getFocus() {
    if (localStorage.getItem('focus') === null) {
        focus.textContent = '[Enter Your Focus]';
    } else {
        focus.textContent = localStorage.getItem('focus');
    }
}

function setName(e) {
    //подумать короче
    if (e.type === 'keypress') {
        if (e.keyCode === 13) {
        (e.target.innerHTML === '') ? name.textContent = localStorage.getItem('name') : localStorage.setItem('name', e.target.innerHTML); 
        name.blur();
        }
    } else {
        (e.target.innerHTML === '') ? name.textContent = localStorage.getItem('name') : localStorage.setItem('name', e.target.innerHTML); 
    }
}

function setFocus(e) {
    //подумать короче
    if (e.type === 'keypress') {
        if (e.keyCode === 13) {
        (e.target.innerHTML === '') ? focus.textContent = localStorage.getItem('focus') : localStorage.setItem('focus', e.target.innerHTML); 
        focus.blur();
        }
    } else {
        (e.target.innerHTML === '') ? focus.textContent = localStorage.getItem('focus') : localStorage.setItem('focus', e.target.innerHTML); 
    }
}
function clearElement(e) {
    //console.log(name.focus); обнуляет если клик когда уже вводишь имя
    e.target.textContent = '';
  };

name.addEventListener('blur', setName);
name.addEventListener('keypress', setName);
name.addEventListener ('click', clearElement);
focus.addEventListener ('click', clearElement);
focus.addEventListener('blur', setFocus);
focus.addEventListener('keypress', setFocus);


function showWeekDay() {
    const weekDays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    arrMonths = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября',
     'октября', 'ноября', 'декабря'];
    let today = new Date(),
    weekDay = today.getDay(),
    monthDay = today.getDate(),
    month = today.getMonth();
    curDate.innerHTML = `${weekDays[weekDay]}, ${monthDay} ${arrMonths[month]}`;
}

// Weather
async function getWeather() {  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=4c0709a010c2f4fecc65e153e45969b5&units=metric`;
    const res = await fetch(url);
    const data = await res.json(); 
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp}°C`;
    weatherDescription.textContent = data.weather[0].description;
}
function setCity(event) {
    if (event.code === 'Enter') {
      getWeather();
      city.blur();
    }
  } 

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);

getWeather();


showTime();
showWeekDay();
showWeekDay();
setBgGreeting();
getName();
getFocus();