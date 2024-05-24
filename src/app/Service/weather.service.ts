import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private httpClient: HttpClient) { }

  getData(locationId: string): Observable<any> {
    const url = locationId === 'TOP' ?
      'https://api.weather.gov/gridpoints/TOP/31,80/forecast' :
      'https://api.weather.gov/gridpoints/LWX/31,80/forecast';

    return this.httpClient.get(url);
  }
}
