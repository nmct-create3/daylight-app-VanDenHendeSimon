let htmlSun, htmlAll, htmlSunrise, htmlSunset, htmlLocation, htmlMinutesLeft;
let minutesSinceSunrise, totalMinutes;

let lat, lng;

// Update once every minute
const updateTimeout = 60000;

const getDomElements = function () {
    htmlSun = document.querySelector(".js-sun");
    htmlAll = document.querySelector(".js-html");
    htmlSunrise = document.querySelector(".js-sunrise");
    htmlSunset = document.querySelector(".js-sunset");
    htmlLocation = document.querySelector(".js-location");
    htmlMinutesLeft = document.querySelector(".js-time-left");
};

const customHeaders = new Headers();
customHeaders.append("Accept", "application/json");

// _ = helper functions
function _parseMillisecondsIntoReadableTime(timestamp) {
    //Get hours from milliseconds
    const date = new Date(timestamp * 1000);
    // Hours part from the timestamp
    const hours = "0" + date.getHours();
    // Minutes part from the timestamp
    const minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp (gebruiken we nu niet)
    // const seconds = '0' + date.getSeconds();

    // Will display time in 10:30(:23) format
    return hours.substr(-2) + ":" + minutes.substr(-2); //  + ':' + s
}

const turnOnNightMode = function () {
    if (htmlAll.classList.contains("is-day")) {
        htmlAll.classList.remove("is-day");
        htmlAll.classList.add("is-night");
    }
};

const turnOnDayMode = function () {
    if (htmlAll.classList.contains("is-night")) {
        htmlAll.classList.remove("is-night");
        htmlAll.classList.add("is-day");
    }
};

// 5 TODO: maak updateSun functie
const updateSun = function (now) {
    const timePercent = (minutesSinceSunrise / totalMinutes) * 100;

    if (timePercent < 100) {
        const readableTime = _parseMillisecondsIntoReadableTime(now.getTime() / 1000);
        htmlSun.style.setProperty("left", `${timePercent}%`);
        htmlSun.style.setProperty("bottom", `${100 - timePercent}%`);
        htmlSun.setAttribute("data-time", readableTime);

        htmlMinutesLeft.innerHTML = Math.floor(totalMinutes - minutesSinceSunrise);

        // wait 1 minute, then call this function again
        // using a variable for the timeout duration allows me to update more frequently than once every minute
        setTimeout(function () {
            minutesSinceSunrise += updateTimeout / 60000;
            updateSun(new Date());
        }, updateTimeout);
    } else {
        // turn on night mode and dont call the update function anymore
        turnOnNightMode();
        htmlSun.style.setProperty("display", "none");


        // Boot back up in the morning
        setTimeout(function () {
            htmlSun.style.setProperty("display", "block");
            getAPI(lat, lng);
        }, (secondsUntillMidnight(now) * 1000 + 60000));
    }
};

// 4 Zet de zon op de juiste plaats en zorg ervoor dat dit iedere minuut gebeurt.
const placeSunAndStartMoving = (sunrise, sunset) => {
    const now = new Date();
    // In de functie moeten we eerst wat zaken ophalen en berekenen.
    totalMinutes = (sunset - sunrise) / 60;
    const currentTime = Math.round(now.getTime() / 1000);
    const minutesRemaining = (sunset - currentTime) / 60;

    // Haal het DOM element van onze zon op en van onze aantal minuten resterend deze dag.
    // Bepaal het aantal minuten dat de zon al op is.
    minutesSinceSunrise = totalMinutes - minutesRemaining;
    // Nu zetten we de zon op de initiële goede positie ( met de functie updateSun ). Bereken hiervoor hoeveel procent er van de totale zon-tijd al voorbij is.

    // We voegen ook de 'is-loaded' class toe aan de body-tag.
    // Vergeet niet om het resterende aantal minuten in te vullen.
    // Nu maken we een functie die de zon elke minuut zal updaten
    updateSun(now);

    // Bekijk of de zon niet nog onder of reeds onder is
    // Anders kunnen we huidige waarden evalueren en de zon updaten via de updateSun functie.
    // PS.: vergeet weer niet om het resterend aantal minuten te updaten en verhoog het aantal verstreken minuten.
};

// 3 Met de data van de API kunnen we de app opvullen
const showResult = (jsonObject) => {
    console.log(jsonObject);
    const city = jsonObject.city.name;
    const country = jsonObject.city.country;
    const sunRise = jsonObject.city.sunrise;
    const sunSet = jsonObject.city.sunset;

    // We gaan eerst een paar onderdelen opvullen
    // Zorg dat de juiste locatie weergegeven wordt, volgens wat je uit de API terug krijgt.
    htmlLocation.innerHTML = `${city} ${country}`;
    // Toon ook de juiste tijd voor de opkomst van de zon en de zonsondergang.
    htmlSunrise.innerHTML = _parseMillisecondsIntoReadableTime(sunRise);
    htmlSunset.innerHTML = _parseMillisecondsIntoReadableTime(sunSet);
    // Hier gaan we een functie oproepen die de zon een bepaalde positie kan geven en dit kan updaten.
    placeSunAndStartMoving(sunRise, sunSet);
    // Geef deze functie de periode tussen sunrise en sunset mee en het tijdstip van sunrise.
};

const intermediateFetch = async function (endPoint) {
    // Een stuk eenvoudiger door awaits te gebruiken
    try {
        const response = await fetch(endPoint, {
            headers: customHeaders,
        });

        const data = await response.json();
        showResult(data);
    } catch (error) {
        console.log("An error occured, we handled it.", error);
    }
};

const secondsUntillMidnight = function(now) {

    const minutesUntillNextHour = 60 - now.getMinutes();
    const hoursUntillMidnight = 24 - now.getHours() - 1;

    return (minutesUntillNextHour * 60) + (hoursUntillMidnight * 3600);
}

// 2 Aan de hand van een longitude en latitude gaan we de yahoo wheater API ophalen.
const getAPI = (lat, lon) => {
    console.log(lat, lon);
    // Eerst bouwen we onze url op
    const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${KEY}&units=metric&lang=nl&cnt=1`;
    console.log(url);
    // Met de fetch API proberen we de data op te halen.
    intermediateFetch(url);
    // Als dat gelukt is, gaan we naar onze showResult functie.
};

document.addEventListener("DOMContentLoaded", function () {
    getDomElements();
    // 1 We will query the API with longitude and latitude.
    lat = 50.8027841;
    lng = 3.2097454;

    getAPI(lat, lng);
});
