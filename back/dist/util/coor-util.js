"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfInside = exports.getRandomLocation = void 0;
var getRandomLocation = function (latitude, longitude, radiusInMeters) {
    var getRandomCoordinates = function (radius, uniform) {
        // Generate two random numbers
        var a = Math.random(), b = Math.random();
        // Flip for more uniformity.
        if (uniform) {
            if (b < a) {
                var c = b;
                b = a;
                a = c;
            }
        }
        // It's all triangles.
        return [
            b * radius * Math.cos((2 * Math.PI * a) / b),
            b * radius * Math.sin((2 * Math.PI * a) / b),
        ];
    };
    var randomCoordinates = getRandomCoordinates(radiusInMeters, true);
    // Earths radius in meters via WGS 84 model.
    var earth = 6378137;
    // Offsets in meters.
    var northOffset = randomCoordinates[0], eastOffset = randomCoordinates[1];
    // Offset coordinates in radians.
    var offsetLatitude = northOffset / earth, offsetLongitude = eastOffset / (earth * Math.cos(Math.PI * (latitude / 180)));
    // Offset position in decimal degrees.
    let coor = {
        lat: latitude + offsetLatitude * (180 / Math.PI),
        lng: longitude + offsetLongitude * (180 / Math.PI)
    };
    return coor;
};
exports.getRandomLocation = getRandomLocation;
function checkIfInside(spotCoordinates, center, radius) {
    let newRadius = distanceInKmBetweenEarthCoordinates(spotCoordinates.lat, spotCoordinates.lng, center.lat, center.lng);
    // COnvert radius to KM
    let radiusInKM = radius / 1000;
    if (newRadius > radiusInKM) {
        //point is inside the circle
        return false;
    }
    else {
        return true;
    }
}
exports.checkIfInside = checkIfInside;
function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
    var earthRadiusKm = 6371;
    var dLat = degreesToRadians(lat2 - lat1);
    var dLon = degreesToRadians(lon2 - lon1);
    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
}
function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
}
