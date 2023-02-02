import { RequestCheckGoal } from './../interface/request-check-goal';
import { RequestGoal } from '../interface/request-goal';
import { Coordinate } from './../interface/coordinate';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getRandomGoal(myLocataion: google.maps.LatLngLiteral) {
    let body: RequestGoal = {
      coordinate: myLocataion,
      radius: 1000,
    };

    return this.http.post<Coordinate>(`${this.baseUrl}/getRandomCoor`, body);
  }

  checkIfGoal(
    myLocataion: google.maps.LatLngLiteral,
    goalLocation: google.maps.LatLngLiteral
  ) {
    let body: RequestCheckGoal = {
      spotCoor: myLocataion,
      center: goalLocation,
      radius: 10,
    };

    return this.http.post<Coordinate>(`${this.baseUrl}/checkIfInRadius`, body);
  }
}
