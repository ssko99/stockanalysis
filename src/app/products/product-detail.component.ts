import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './product.service';
import { FinancialDetail } from './financials';

// import 'rxjs/add/operator/toPromise';
// import { map } from "rxjs/operator/map";


@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'Security Detail';
  ticker: string;
  data: any;
  security: FinancialDetail = new FinancialDetail();

  constructor(private route: ActivatedRoute, private productService: ProductService) {
  }

  ngOnInit() {
    // let Id = this.route.snapshot.params['id'];
    this.route.params.subscribe(
      params => {
        let id = params['id'];
        this.getStock(id);
      });
  }

  getStock(id) {
    this.ticker = id || 'AAPL';
    this.ticker = this.ticker.toUpperCase();
    let queryURL: string =
      'https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20yahoo.finance.quotes%20WHERE%20symbol%3D%22'
      + this.ticker
      + '%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';


    this.productService.makeStockRequest(queryURL)
      .then((data) => {
        this.data = data;
        this.security = this.data.query.results.quote;
      })
      .catch((err) => {
        console.log(err);
      });
    return false;
  }
}
