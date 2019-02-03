import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EndpointService {

  private baseUrl = "https://catvote-api.herokuapp.com/";
  private proxyURL = "https://ng-cors-proxy.herokuapp.com/";

  private catsUrl = this.proxyURL + this.baseUrl;

  constructor(private http: HttpClient) {

  }

  getCats(){
    return this.http.get(this.catsUrl + "cats");
  }


  voteCat(catID){
    return this.http.post(this.catsUrl + "cats/" + catID, '');
  }

}
