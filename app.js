// All Elements related Date events
const weekDay = document.querySelector('.weekDay');
const day = document.querySelector('.day');
const months = document.querySelector('.months');

// All Elements related to todays temperature
const city = document.querySelector('.city');
const tempHeading = document.querySelector('.tempHeading');
const wheatherHeading = document.querySelector('.wheatherHeading');
const myAPIKey = "bf360ddec28a21146e2d6a98349204bf";

const windValue = document.querySelector('.windValue');
const humidityValue = document.querySelector('.humidity');
const sunRise = document.querySelector('.sunrise');
const sunSet = document.querySelector('.sunset');

// All Element for hiding 4 hour format and show 7 Days temp format
const todaysTempDiv = document.querySelector('.todaysTempDiv');
const sevendays = document.querySelector('.sevendays');
const sevenDaysContainer = document.querySelector('.sevenDaysContainer');
const upperDiv = document.querySelector('.upperDiv');
const upperDivShadow = document.querySelector('.upperDivShadow');
const tempDesc = document.querySelector('.tempDesc');
const skyImage = document.querySelector('.skyImage');
const skyImgDiv = document.querySelector('.skyImgDiv');
const tempDegree = document.querySelector('.tempDegree');
const timeAndDate = document.querySelector('.timeAndDate');
const weatherDesc = document.querySelector('.weatherDesc');
const span = document.querySelector('span');
const specialDiv = document.querySelector('.specialDiv');

// Elements for more selecting more than one element of same classes
const tempList = document.querySelectorAll('.tempList');
const weekDayList = document.querySelectorAll('.weekDayList');
const icons = document.querySelectorAll('.fas');
const weatherDescList = document.querySelectorAll('.weatherDescList');
const timeTemp = document.querySelectorAll('.timeTemp');
const particularTime = document.querySelectorAll('.particularTime');
const timeWheaterIcon = document.querySelectorAll('.timeWheaterIcon');
const wheaterIconList = document.querySelectorAll('.wheaterIconList');

// Buttons
const backArrow = document.querySelector('.backArrow');
const dots = document.querySelector('.dots');
const headingAndIcon = document.querySelector('.headingAndIcon');
const sevenDaysheadingAndIcon = document.querySelector('.sevenDaysheadingAndIcon');

// Set Date, Month and WeekDayName

let monthsName = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

let weekDayName = [
    "Sun,",
    "Mon,",
    "Tue,",
    "Wed,",
    "Thu,",
    "Fri,",
    "Sat,",
];


// calling function every second
setInterval(timeStart, 1000);


// function for getting current time
function timeStart() {
    let currentdate = new Date();
    let dWeek = currentdate.getDay();
    let dNum = currentdate.getDate();
    let dMonth = currentdate.getMonth();

    updateDate(dWeek, dNum, dMonth);
}


// updating time in HTML Doc file
function updateDate(dWeek, dNum, dMonth) {

    // adding zero as tenth digit in single-digit time
    function checkNum(data) {
        if (data < 10) {
            data = '0' + data;
        }
        return data;
    }

    // loop for converting weekdays number as weekdays name
    for (let i = 1; i <= weekDayName.length; i++) {
        if (i === dWeek) {
            weekDay.innerHTML = weekDayName[i];
        }
    }
    // loop for converting months number as months name
    for (let j = 1; j <= monthsName.length; j++) {
        if (j === dMonth) {
            months.innerHTML = monthsName[j];
        }
    }

    // updating days and time in HTML Doc
    day.innerHTML = checkNum(dNum);
}

// EVENT LISTENER FOR BUTTONS
sevendays.addEventListener('click', sevednDaysEvent);
backArrow.addEventListener('click', backArrowEvent);

// FUNCTIONS FOR BUTTONS
function sevednDaysEvent() {
    todaysTempDiv.style.display = "none";
    sevenDaysContainer.style.display = "block";
    backArrow.style.display = "flex";
    dots.style.display = "block";
    sevenDaysheadingAndIcon.style.display = "flex";
    headingAndIcon.style.display = "none";
    upperDiv.classList.add('upperDiv-curr');
    upperDivShadow.classList.add('upperDivShadow-curr');
    tempDesc.classList.add('tempDesc-curr');
    skyImage.classList.add('skyImage-curr');
    skyImgDiv.classList.add('skyImgDiv-curr');
    tempDegree.classList.add('tempDegree-curr');
    timeAndDate.classList.add('timeAndDate-curr');
    weatherDesc.classList.add('weatherDesc-curr');
    span.classList.add('current');
    specialDiv.classList.add('specialDiv-curr');
    tempHeading.classList.add('tempHeading-curr');
    wheatherHeading.classList.add('wheatherHeading-curr');
}

function backArrowEvent() {
    todaysTempDiv.style.display = "block";
    sevenDaysContainer.style.display = "none";
    backArrow.style.display = "none";
    dots.style.display = "none";
    sevenDaysheadingAndIcon.style.display = "none";
    headingAndIcon.style.display = "flex";
    upperDiv.classList.remove('upperDiv-curr');
    upperDivShadow.classList.remove('upperDivShadow-curr');
    tempDesc.classList.remove('tempDesc-curr');
    skyImage.classList.remove('skyImage-curr');
    skyImgDiv.classList.remove('skyImgDiv-curr');
    tempDegree.classList.remove('tempDegree-curr');
    timeAndDate.classList.remove('timeAndDate-curr');
    weatherDesc.classList.remove('weatherDesc-curr');
    span.classList.remove('current');
    specialDiv.classList.remove('specialDiv-curr');
    tempHeading.classList.remove('tempHeading-curr');
    wheatherHeading.classList.remove('wheatherHeading-curr');
}

let api;
let api2;

window.addEventListener('load', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onSuccessOneCall, onError);
        navigator.geolocation.getCurrentPosition(onSuccessorWeather, onError);
    } else {
        alert("Your browser does not support Geolocation");
    }
});

function onSuccessOneCall(position) {
    const { latitude, longitude } = position.coords;
    api = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&units=metric&appid=${myAPIKey}`;
    fetchDataOneCall();
}

function onSuccessorWeather(position) {
    const { latitude, longitude } = position.coords;
    api2 = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${myAPIKey}`
    fetchDataWeather();
}

function onError(error) {
    city.innerText = error.message;
}


function fetchDataWeather() {
    city.innerText = "Getting details...";
    fetch(api2).then(res => res.json()).then(result => cityDetails(result)).catch(() => {
        city.innerText = "Something went wrong";
    });
}


function fetchDataOneCall() {
    city.innerText = "Getting details...";
    fetch(api).then(res => res.json()).then(result => weatherDetails(result));
}



function cityDetails(info) {
    if (info.cod == "404") {
        city.innerText = `${inputField.value} isn't a valid city name`;
    } else {
        city.innerText = info.name;
        humidityValue.textContent = info.main.humidity + "%";
        tempHeading.textContent = info.main.temp;
        wheatherHeading.textContent = info.weather[0].description;
        windValue.textContent = Math.floor((info.wind.speed) * 3.6) + " km/h"

    }
}

function weatherDetails(info) {
    let { sunrise, sunset } = info.current;
    for (let i = 0; i < 7; i++) {
        tempList[i].innerText = info.daily[i].temp.day + "°";
    }


    info.hourly.forEach((hrs, index) => {
        if (index < 4) {
            if (index == 0) {
                timeTemp[0].textContent = Math.floor(info.hourly[0].temp) + "°";
                particularTime[0].textContent = window.moment(info.hourly[0].dt * 1000).format('HH:mm a');
                timeWheaterIcon[0].src = `http://openweathermap.org/img/wn//${info.hourly[0].weather[0].icon}@4x.png`;
            } else {
                timeTemp[index].textContent = Math.floor(info.hourly[index].temp) + "°";
                particularTime[index].textContent = window.moment(info.hourly[index].dt * 1000).format('HH:mm a');
                timeWheaterIcon[index].src = `http://openweathermap.org/img/wn//${info.hourly[index].weather[0].icon}@4x.png`
            }
        }


    });

    info.daily.forEach((days, idx) => {
        if (idx < 7) {
            if (idx == 0) {
                weekDayList[0].textContent = window.moment(days.dt * 1000).format('dddd');
                weekDayMatch(weekDayList[0].textContent);
                weatherDescList[0].textContent = info.daily[0].weather[0].main;
                wheaterIconList[0].src = `http://openweathermap.org/img/wn//${info.daily[0].weather[0].icon}@2x.png`;
            } else {
                weekDayList[idx].textContent = window.moment(days.dt * 1000).format('dddd');
                weekDayMatch(weekDayList[idx].textContent);
                weatherDescList[idx].textContent = info.daily[idx].weather[0].main;
                wheaterIconList[idx].src = `http://openweathermap.org/img/wn//${info.daily[idx].weather[0].icon}@2x.png`;

            }
        }
    });

    sunRise.textContent = window.moment(sunrise * 1000).format('HH:mm a');
    sunSet.textContent = window.moment((sunset * 1000)).format('HH:mm a');

}

function weekDayMatch(today) {
    switch (today) {
        case "Monday":
            for (let i = 0; i < 7; i++) {
                if (weekDayList[i].innerText == "Monday") {
                    weekDayList[i].textContent = "Mon";
                }
            }
            break;

        case "Tuesday":
            for (let i = 0; i < 7; i++) {
                if (weekDayList[i].innerText == "Tuesday") {
                    weekDayList[i].textContent = "Tue";
                }
            }
            break;
        case "Wednesday":
            for (let i = 0; i < 7; i++) {
                if (weekDayList[i].innerText == "Wednesday") {
                    weekDayList[i].textContent = "Wed";
                }
            }
            break;
        case "Thursday":
            for (let i = 0; i < 7; i++) {
                if (weekDayList[i].innerText == "Thursday") {
                    weekDayList[i].textContent = "Thu";
                }
            }
            break;
        case "Friday":
            for (let i = 0; i < 7; i++) {
                if (weekDayList[i].innerText == "Friday") {
                    weekDayList[i].textContent = "Fri";
                }
            }
            break;
        case "Saturday":
            for (let i = 0; i < 7; i++) {
                if (weekDayList[i].innerText == "Saturday") {
                    weekDayList[i].textContent = "Sat";
                }
            }
            break;
        case "Sunday":
            for (let i = 0; i < 7; i++) {
                if (weekDayList[i].innerText == "Sunday") {
                    weekDayList[i].textContent = "Sun";
                }
            }
            break;
    }
}

