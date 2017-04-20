import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductService {

  constructor(private http: Http) { }
  getProducts(): Promise<any[]> {
    return this.http.get('assets/constituents.json')
      .map((response: Response) => response.json())
      .toPromise()
      .catch((err: any) => {
        console.log(err);
        Promise.reject(err);
      });
  }

  getProductsDetail(): Promise<any[]> {
    return this.http.get('assets/constituents-financials.json')
      .map((response: Response) => response.json())
      .toPromise()
      .catch((err: any) => {
        console.log(err);
        Promise.reject(err);
      });
  }

  makeStockRequest(queryURL): Promise<any[]> {
    return this.http.get(queryURL)
      .map((response: Response) => response.json())
      .toPromise()
      .catch((err: any) => {
        console.log(err);
        Promise.reject(err);
      });
  }
}
