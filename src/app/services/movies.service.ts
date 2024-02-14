import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private readonly apiUrl = 'https://ott-details.p.rapidapi.com/advancedsearch';
  private headers = new HttpHeaders({
    'X-RapidAPI-Key': '642714fab8msh654b2f7915f2d2fp1cef04jsn3cf956ec4f5c',
    'X-RapidAPI-Host': 'ott-details.p.rapidapi.com'
  });
  constructor(private http: HttpClient) { }

  async getMovies(): Promise<any> {
    return this.http.get<any>(this.apiUrl , { headers: this.headers}).toPromise();

  }
}
