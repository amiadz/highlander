import { Router, Request, Response } from "express";
import { checkIfCoorInRadius, getRandomCoor } from "../controllers/coordinate-controller";

const coorRouter = Router()

coorRouter.post('/getRandomCoor', (req: Request, res: Response) => {
    res.send(getRandomCoor(req, res))
})

coorRouter.post("/checkIfInRadius", (req: Request, res: Response) => {
  res.send(checkIfCoorInRadius(req, res));
});

export default coorRouter
