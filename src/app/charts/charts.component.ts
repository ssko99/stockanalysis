import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartsService } from './charts.service';
import * as moment from 'moment';

@Component({
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  ticker;
  data: any;
  public lineChartData: Array<any> = [
    { data: [], label: '' },
  ];
  public lineChartLabels: Array<any> =
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
  public lineChartOptions: any = {
    responsive: true
  };
  public lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';
  constructor(private route: ActivatedRoute, private chartsService: ChartsService) { }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
        let id = params['id'];
        this.displayQuote(id);
      });
  }

  public displayQuote(ticker) {
    this.ticker = ticker || 'AAPL';
    this.ticker = this.ticker.toUpperCase();

    let endDate = moment(new Date()).format("YYYY-MM-DD");
    let startDate = moment(moment().subtract(30, 'days')).format("YYYY-MM-DD");
    let queryURL =
      'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20yahoo.finance.historicaldata%20where%20symbol%20%3D%20%22' +
      this.ticker + '%22%20and%20startDate%20%3D%20%22'
      + startDate + '%22%20and%20endDate%20%3D%20%22' +
      endDate + '%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=';

    this.chartsService.makeQuoteRequest(queryURL)
      .then((data) => {
        this.data = data;
        this.populateData();
      })
      .catch((err) => {
        console.log(err);
      });
    return false;
  }

  public populateData() {
    let quote = this.data.query.results.quote;
    let quoteLength = quote.length;
    let _lineChartData: Array<any> = new Array(1);
    this.lineChartData[0].label = this.ticker;
    _lineChartData[0] = { data: new Array(quote.length), label: this.lineChartData[0].label };
    this.lineChartLabels = new Array(quote.length);

    let arr = [];
    for (let j = 0; j < quoteLength; j++) {
      _lineChartData[0].data[j] = Math.round(quote[quoteLength - j - 1].Close * 100) / 100;
      arr = quote[j].Date.split('-');
      this.lineChartLabels[quoteLength - j - 1] = arr[1] + '-' + arr[2];
    }

    this.lineChartData = _lineChartData;
  }
}
