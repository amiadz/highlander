"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const coordinate_controller_1 = require("../controllers/coordinate-controller");
const coorRouter = (0, express_1.Router)();
coorRouter.post('/getRandomCoor', (req, res) => {
    res.send((0, coordinate_controller_1.getRandomCoor)(req, res));
});
coorRouter.post("/checkIfInRadius", (req, res) => {
    res.send((0, coordinate_controller_1.checkIfCoorInRadius)(req, res));
});
exports.default = coorRouter;
