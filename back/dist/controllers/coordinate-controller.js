"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfCoorInRadius = exports.getRandomCoor = void 0;
const coor_util_1 = require("../util/coor-util");
function getRandomCoor(req, res) {
    let coor = req.body.coordinate;
    let radius = req.body.radius;
    return (0, coor_util_1.getRandomLocation)(coor.lat, coor.lng, radius);
}
exports.getRandomCoor = getRandomCoor;
function checkIfCoorInRadius(req, res) {
    let spotCoor = req.body.spotCoor;
    let center = req.body.center;
    let radius = req.body.radius;
    return (0, coor_util_1.checkIfInside)(spotCoor, center, radius);
}
exports.checkIfCoorInRadius = checkIfCoorInRadius;
