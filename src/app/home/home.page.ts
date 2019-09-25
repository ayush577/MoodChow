import { Component, OnInit } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { ToastController, Platform } from '@ionic/angular';
import { Router,ActivatedRoute} from "@angular/router";
import { environment } from '../../environments/environment';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ActionSheetController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { FilterPage } from '../modal/filter/filter.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})


export class HomePage implements OnInit {

  lat: any;
  lng: any;
  slideOpts: any;
  data: any ={};
  userlocation: any ={};
  loading = false;
  homeerrorsmsg='';
  homeResponse: any = {};
  messageResponseData: any = {};
  restaurantlist =[];
  topRestaurant = [];
  notifications = false;
  ismore = false;
  subscription: any = {};
 

  constructor(public toastController: ToastController,private router: Router,private route: ActivatedRoute,private httpClient:HttpClient,private geolocation: Geolocation, public actionSheetController: ActionSheetController,public modalController: ModalController, public platform: Platform) {

    this.slideOpts = {
      loop: false,
      slidesPerView: 1.4,
      slidesPerGroup: 1,
      grabCursor: true,
      spaceBetween: 5
    };

  }

  ngOnInit(){

    this.data.userid = localStorage.getItem('loginUser');
    

    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude

      this.userlocation.lat = resp.coords.latitude;

      this.userlocation.lng = resp.coords.longitude;
      
      console.log( this.userlocation );
      
      this.userlocation.userid = this.data.userid;
      
      this.locationUpdate();
      
     }).catch((error) => {
        
      this.locationUpdate();
      
      console.log('Error getting location', error);
       
     });

  }


  async sortingOption() {
    const modal = await this.modalController.create({
      component: FilterPage,
      cssClass: 'my-custom-modal-css'
    });
    return await modal.present();
  }

  more(){
    if(this.ismore==true){
    this.ismore=false;
    }
    else{
    this.ismore=true;
    }
    }
 

  locationUpdate(){
    this.loading = true;

     this.httpClient.post( environment.weburl+ "homepageapi", this.userlocation, { headers: {'Content-Type' : 'application/json; charset= UTF-8','Access-Control-Allow-Methods' : '*'}})
      .subscribe( 

        responseData => {

          this.homeResponse = responseData;
          console.log( this.homeResponse );

          this.restaurantlist = this.homeResponse.restaurantlist;
          this.topRestaurant = this.homeResponse.toprestaurantlist;

          console.log( this.topRestaurant );
          this.loading = false;

        },
        error => {

          this.loading = false;
          this.messageResponseData.msg = this.homeResponse.error;
          this.homemessage();

        },
        () => {

          this.loading = false;
        
        }
      )
  }


  async homemessage(){

    const toast = await this.toastController.create({
      message: this.messageResponseData.msg,
      duration: 2000,
      position: 'top',
      animated: true,
      cssClass: 'toast_alert-color'
    });
    toast.present();

  } 

  // option(){

  //   this.notifications = true;

  // }

  ionViewDidEnter() {
    this.subscription = this.platform.backButton.subscribe(() => {
      navigator["app"].exitApp();
    });
  }

  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }

}
