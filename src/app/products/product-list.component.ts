import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { ProductService } from './product.service';
import {Financials} from './financials';
@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'S & P 500 - Select Stock to Get More Information';
  stockDetail: Financials;
  source: LocalDataSource; // add a property to the component
  public settings = {
    columns: {
      Symbol: {
        title: 'Symbol',
      },
      Name: {
        title: 'Name'
      },
      Sector: {
        title: 'Sector'
      }
    },
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    pager: {
      perPage: 10
    }
  };
  data: Array<Object>;
  dataDetail: Array<Object>;
  loadDetail: boolean;

  constructor(private productService: ProductService) {
    this.source = new LocalDataSource();
  }

  ngOnInit() {
    this.loadDetail = false;
    this.productService.getProducts()
      .then((products) => {
        this.data = products;
        this.source.load(this.data);
      })
      .catch((err) => {
        console.log(err);
      });
    this.productService.getProductsDetail()
      .then((productsDetail) => {
        this.dataDetail = productsDetail;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  rowSelected(event) {        
    let productDetails = Object.keys(this.dataDetail)
      .map((key) => { return this.dataDetail[key] })
      .filter(function (i, n) { return i.Symbol === event.data.Symbol });
    this.stockDetail = productDetails[0] || {};
    this.loadDetail = true;
  }
}
