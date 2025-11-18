// Глобальна змінна для watchId (Частина 2)
let watchId = null;

// Координати коледжу
const startCoords = {
    latitude: 48.929635,
    longitude: 24.748843
};

// Частина 1: Базовий код + помилки + дистанція
document.addEventListener('DOMContentLoaded', getMyLocation);

function getMyLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayLocation, displayError);
    } else {
        alert("Oops, no geolocation support");
    }
}

// Функція успіху: Виводить локацію + дистанцію + точність
function displayLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let div = document.getElementById("location");
    div.innerHTML = `Ви на широті: ${latitude}, довготі: ${longitude}`;
    
    // Обчислення дистанції
    let km = computeDistance(position.coords.latitude, position.coords.longitude);
    let distanceDiv = document.getElementById("distance");
    distanceDiv.innerHTML = `Ви на відстані ${km} км від Коледжу`;
    
    // Точність
    distanceDiv.innerHTML += ` (з точністю ${position.coords.accuracy} метрів)`;
}

// Функція помилки (з кодами помилок)
function displayError(error) {
    const errorTypes = {
        0: "Unknown error",
        1: "Permission denied by user",
        2: "Position is not available",
        3: "Request timed out"
    };
    let errorMessage = errorTypes[error.code];
    if (!errorMessage) errorMessage = error.message;
    
    let div = document.getElementById("location");
    div.innerHTML = errorMessage;
}

// Формула Haversine для дистанції (в км)
function computeDistance(lat, lng) {
    let startLatRads = degreesToRadians(startCoords.latitude);
    let startLongRads = degreesToRadians(startCoords.longitude);
    let destLatRads = degreesToRadians(lat);
    let destLongRads = degreesToRadians(lng);
    
    let Radius = 6371; // Радіус Землі в км
    let distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) + 
                             Math.cos(startLatRads) * Math.cos(destLatRads) * 
                             Math.cos(startLongRads - destLongRads)) * Radius;
    return distance;
}

function degreesToRadians(degrees) {
    let radians = (degrees * Math.PI / 180);
    return radians;
}

// Частина 2: Відстеження в реальному часі
document.getElementById('watchButton').onclick = watchLocation;
document.getElementById('clearWatchButton').onclick = clearWatch;

// Функція для watchPosition
function watchLocation() {
    if (navigator.geolocation) {
        watchId = navigator.geolocation.watchPosition(displayLocation, displayError);
    }
}

// Функція для clearWatch
function clearWatch() {
    if (watchId) {
        navigator.geolocation.clearWatch(watchId);
        watchId = null;
        alert("Відстеження зупинено");
    }
}