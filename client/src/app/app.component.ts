import { ApiService } from './services/api.service';
import { Coordinate } from './interface/coordinate';
import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  myLocation: google.maps.LatLngLiteral = {
    lat: 37,
    lng: 37,
  };

  goalLocation: google.maps.LatLngLiteral = {
    lat: 0,
    lng: 0,
  };

  mapZoom: number = 15;

  myMarkerOptions = {
    animation: google.maps.Animation.DROP,
    icon: {
      url: '../../assets/football.png',
      scaledSize: new google.maps.Size(50, 50), // scaled size
      origin: new google.maps.Point(0, 0), // origin
      anchor: new google.maps.Point(0, 0), // anchor
    }
  };

  goalMarkerOptions = {
    animation: google.maps.Animation.DROP,
    icon: {
      url: '../../assets/football-goal.png', // url
      scaledSize: new google.maps.Size(50, 50), // scaled size
      origin: new google.maps.Point(0, 0), // origin
      anchor: new google.maps.Point(0, 0), // anchor
    },
  };

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getCurrentLocation();

    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        const point: google.maps.LatLngLiteral = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        this.myLocation = {
          lat: point.lat,
          lng: point.lng
        }
        
        this.apiService.getRandomGoal(point).subscribe((coordinate) => {
          this.goalLocation = {
            lat: coordinate.lat,
            lng: coordinate.lng,
          };
        });
      }
    );
  }

  getCurrentLocation() {
    navigator.geolocation.watchPosition(
      (position: GeolocationPosition) => {
        const point: google.maps.LatLngLiteral = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        this.apiService.checkIfGoal(this.myLocation, this.goalLocation).subscribe(isGoal => {
          if (isGoal) {
            alert("GOAL!!!!!!!!!!!")
          }
        })
      },
      (error) => {
        if (error.PERMISSION_DENIED) {
          alert('Permission denied');
        } else if (error.POSITION_UNAVAILABLE) {
          alert("Couldn't get your location");
        } else if (error.TIMEOUT) {
          alert("Couldn't get your location");
        } else {
          alert(error.message);
        }
      },
      { enableHighAccuracy: true }
    );
  }
}
