import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { timer } from 'rxjs';
import { Router,ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  showSplash = true;

  data: any ={};

  public appPages = [
    {
      title: 'Home',
      url: '/home'
    },
    {
      title: 'List',
      url: '/list'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.initializeApp();
  }

  ngOnInit(){

    this.data.userid = localStorage.getItem('loginUser'); 

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      timer(3000).subscribe(() => this.showSplash = false)
    });
  }
}
