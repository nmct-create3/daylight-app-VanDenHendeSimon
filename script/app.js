let htmlSun, htmlAll;

const getDomElements = function () {
    htmlSun = document.querySelector(".js-sun");
    htmlAll = document.querySelector(".js-html");
};

let customHeaders = new Headers();
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

// 5 TODO: maak updateSun functie

// 4 Zet de zon op de juiste plaats en zorg ervoor dat dit iedere minuut gebeurt.
let placeSunAndStartMoving = (totalMinutes, sunrise) => {
    // In de functie moeten we eerst wat zaken ophalen en berekenen.
    // Haal het DOM element van onze zon op en van onze aantal minuten resterend deze dag.
    // Bepaal het aantal minuten dat de zon al op is.
    // Nu zetten we de zon op de initiële goede positie ( met de functie updateSun ). Bereken hiervoor hoeveel procent er van de totale zon-tijd al voorbij is.
    // We voegen ook de 'is-loaded' class toe aan de body-tag.
    // Vergeet niet om het resterende aantal minuten in te vullen.
    // Nu maken we een functie die de zon elke minuut zal updaten
    // Bekijk of de zon niet nog onder of reeds onder is
    // Anders kunnen we huidige waarden evalueren en de zon updaten via de updateSun functie.
    // PS.: vergeet weer niet om het resterend aantal minuten te updaten en verhoog het aantal verstreken minuten.
};

// 3 Met de data van de API kunnen we de app opvullen
let showResult = (queryResponse) => {
    console.log(queryResponse);
    // We gaan eerst een paar onderdelen opvullen
    // Zorg dat de juiste locatie weergegeven wordt, volgens wat je uit de API terug krijgt.
    // Toon ook de juiste tijd voor de opkomst van de zon en de zonsondergang.
    // Hier gaan we een functie oproepen die de zon een bepaalde positie kan geven en dit kan updaten.
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

// 2 Aan de hand van een longitude en latitude gaan we de yahoo wheater API ophalen.
let getAPI = (lat, lon) => {
    console.log(lat, lon);
	// Eerst bouwen we onze url op
	const url = `https://suncalc.org/#/${lat},${lon},3/2020.10.13/12:00/324.0/2`;
	console.log(url);
    // Met de fetch API proberen we de data op te halen.
    // intermediateFetch(url);
    // Als dat gelukt is, gaan we naar onze showResult functie.
};

document.addEventListener("DOMContentLoaded", function () {
    getDomElements();
    // 1 We will query the API with longitude and latitude.
	getAPI(50.8027841, 3.2097454);
	console.log("All good")
});
