import { Coordinate } from "../../../../sharedInterface/coordinate";

export interface RequestCheckGoal {
  spotCoor: Coordinate;
  center: Coordinate;
  radius: number;
}
