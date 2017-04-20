import { Component, OnInit } from '@angular/core';

@Component({ 
  templateUrl: './welcome.component.html',
  styles: []
})
export class WelcomeComponent implements OnInit {
  public pageTitle: string = 'Welcome';
  constructor() { }

  ngOnInit() {
  }

}
