import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { timer } from 'rxjs';
import { Router,ActivatedRoute} from "@angular/router";
import { MenuController, ModalController, Events, ActionSheetController } from "@ionic/angular";

import { FCM } from '@ionic-native/fcm/ngx';
import { UserService } from './api/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {

  showSplash = true;

  data: any ={};

  user_id;

  userName;


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
    public menuCtrl: MenuController,
    public authService:UserService
  ) {
    this.getUserName();
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


  getUserName(){
    this.user_id = localStorage.getItem('loginUser');

    console.log("User Id" ,this.user_id);
    

    this.authService.getUserName(this.user_id).subscribe((data:any)=>{

      console.log("user Id response",data);
      this.userName = data.success;
      

    });

  }

}
