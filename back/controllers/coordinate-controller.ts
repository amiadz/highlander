import { Request, Response } from "express";
import { Coordinate } from "../model/coordinate";
import {getRandomLocation, checkIfInside} from "../util/coor-util";

function getRandomCoor(req: Request, res: Response) {
  let coor: Coordinate = req.body.coordinate;
  let radius: number = req.body.radius;

  return getRandomLocation(coor.lat, coor.lng, radius)
}

function checkIfCoorInRadius(req: Request, res: Response) {
    let spotCoor: Coordinate = req.body.spotCoor;
    let center: Coordinate = req.body.center
    let radius: number = req.body.radius;

    return checkIfInside(spotCoor, center, radius)
}

export { getRandomCoor, checkIfCoorInRadius };
