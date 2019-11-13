import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { timer } from 'rxjs';
import { Router,ActivatedRoute} from "@angular/router";
import { MenuController, ModalController, Events, ActionSheetController } from "@ionic/angular";

import { FCM } from '@ionic-native/fcm/ngx';

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
    private route: ActivatedRoute,
    private fcm: FCM,
    public menuCtrl: MenuController
  ) {
    this.initializeApp();
  }

  ngOnInit(){


  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      timer(3000).subscribe(() => this.showSplash = false)


       //push notification code
   this.fcm.onNotification().subscribe(data => {
    if (data.wasTapped) {
      console.log("Received in background",data);
      this.router.navigate(["/details", data.productid]);
    } else {
      console.log("Received in foreground",data);
    };
  });

  this.fcm.onTokenRefresh().subscribe(token => {
    console.log("token onTokenRefresh() id is :" , token);
    // Register your new token in your back-end if you want
    //  backend.registerToken(token);
    
  });

  this.getToken() ;

    });


  this.data.userid = localStorage.getItem('loginUser'); 

  this.data.introforuser = localStorage.getItem('introForUser');


  if( this.data.userid && this.data.introforuser ) {

    this.router.navigate[('/userprofile')];

  } else if( this.data.introforuser ){

    this.router.navigate[('/login')];

  } else if( !this.data.introforuser ){

    this.router.navigate[('/introslider')];

  }

  }

  //push notification
  subscribeToTopic() {
    this.fcm.subscribeToTopic('enappd');
  }
  getToken() {
    this.fcm.getToken().then(token => {
      console.log("token is :" , token);     
      localStorage.setItem("usertoken",token);
    });
  }
  unsubscribeFromTopic() {
    this.fcm.unsubscribeFromTopic('enappd');
  }

  
  events() {
    this.menuCtrl.close();
    this.router.navigate(["/calendar"]);
  }

}
