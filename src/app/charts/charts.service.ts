import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class ChartsService {

  constructor(private http: Http) { }

  makeQuoteRequest(queryURL): Promise<any[]> {
    return this.http.get(queryURL)
      .map((response: Response) => response.json())
      .toPromise()
      .catch((err: any) => {
        console.log(err);
        Promise.reject(err);
      });
  }
}
