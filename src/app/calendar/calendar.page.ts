import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {
  subscription:any;

  constructor(public location : Location, public platform : Platform) { }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(() => {
      this.location.back();
    });
  }

}
