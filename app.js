// All Elements related Date events
const weekDay = document.querySelector('.weekDay');
const day = document.querySelector('.day');
const months = document.querySelector('.months');


const city = document.querySelector('.city');
const tempHeading = document.querySelector('.tempHeading');
const wheatherHeading = document.querySelector('.wheatherHeading');
const myAPIKey = "bf360ddec28a21146e2d6a98349204bf";

const windValue = document.querySelector('.windValue');
const humidityValue = document.getElementById('humidityValue');
const rainValue = document.querySelector('.rainValue');


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

const backArrow = document.querySelector('.backArrow');
const dots = document.querySelector('.dots');
const headingAndIcon = document.querySelector('.headingAndIcon');
const sevenDaysheadingAndIcon = document.querySelector('.sevenDaysheadingAndIcon');

// Set Date, Month and WeekDayName

let monthsName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

let weekDayName = [
    "Sunday,",
    "Monday,",
    "Tuesday,",
    "Wednesday,",
    "Thursday,",
    "Friday,",
    "Saturday,",
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

// EVENT LISTENER
sevendays.addEventListener('click', sevednDaysEvent);
backArrow.addEventListener('click', backArrowEvent);


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
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
        navigator.geolocation.getCurrentPosition(onSuccessor, onError);
    } else {
        alert("Your browser does not support Geolocation");
    }
});

function onSuccess(position) {
    const { latitude, longitude } = position.coords;
    api = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${myAPIKey}`;
    fetchData();
}

function onSuccessor(position) {
    const { latitude, longitude } = position.coords;    
    api2 = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${myAPIKey}`
    fetchDataP();
}

function onError(error) {
    city.innerText = error.message;
}


function fetchDataP() {
    city.innerText = "Getting details...";
    fetch(api2).then(res => res.json()).then(result => cityDetails(result)).catch(() => {
        city.innerText = "Something went wrong";
    });
    // fetch(api).then(res => res.json()).then(result => console.log(result));
}


function fetchData() {
    city.innerText = "Getting details...";
    fetch(api).then(res => res.json()).then(result =>{
        weatherDetails(result)
    }).catch(() => {
        city.innerText = "Something went wrong";
    });
    fetch(api).then(res => res.json()).then(result => console.log(result));
}

function weatherDetails(info) {
   
       
        humidityValue.textContent = info.current.humidity + "%";
        console.log(info);

    
}

function cityDetails(info) {
    if (info.cod == "404") {
        city.innerText = `${inputField.value} isn't a valid city name`;
    } else {
        city.innerText = info.name;
        // humidityValue.textContent = info.current.humidity + "%";
        tempHeading.textContent = info.main.temp;
        wheatherHeading.textContent = info.weather[0].description;
        windValue.textContent = Math.floor((info.wind.speed) * 3.6) + " km/h"
        // rainValue.textContent = info.rain[0];
        console.log(info);

    }
}

