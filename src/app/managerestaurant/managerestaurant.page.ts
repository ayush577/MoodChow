import { Component, OnInit } from '@angular/core';

import { Router,ActivatedRoute} from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ToastController } from '@ionic/angular';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-managerestaurant',
  templateUrl: './managerestaurant.page.html',
  styleUrls: ['./managerestaurant.page.scss'],
})
export class ManagerestaurantPage implements OnInit {

  data:any = {};
  loading = false;
  manageRestaurantResponse: any = {};
  messageResponseData: any = {};
  restaurantData = [];
  restaurantStatus: boolean;
  deleteRestaurantResponse: any ={};
  restaurantStatusResponse: any ={};

  constructor(public toastController: ToastController,private router: Router,private route: ActivatedRoute,private httpClient:HttpClient) { 

    // this.restaurantStatus = true;

    // this.data.restaurantStatus = true;

  }

  ngOnInit() {

    this.data.userid = localStorage.getItem('loginUser');
    if(!this.data.userid){
      this.router.navigate(['/login']);
    }

    this.data.tbl_restaurant_id = localStorage.getItem('RestaurantId');
    if( !this.data.tbl_restaurant_id ){
      this.router.navigate(['/addrestaurant']);
    }

    this.getRestaurantList();

  }

  notify(restaurantid, res_status) {


    const status = {'tbl_restaurant_id':restaurantid,'userid': this.data.userid, 'res_status':res_status};

    console.log("Toggled: "+ res_status);

    

    this.httpClient.post( environment.weburl+ "statuschangerestaurant", status, { headers: {'Content-Type' : 'application/json; charset= UTF-8','Access-Control-Allow-Methods' : '*'}})

    .subscribe(

      responseData => {

        this.restaurantStatusResponse = responseData;
        console.log( this.restaurantStatusResponse );
        
        if( this.restaurantStatusResponse.status == 200 ){

          this.messageResponseData.msg = this.restaurantStatusResponse.success;
          this.userProfileMessage();

        } else if(this.restaurantStatusResponse.status == 400){

          this.messageResponseData.msg = this.restaurantStatusResponse.error;
          this.userProfileMessage();

        }

      },
      error => {

        this.loading = true;

      },

      () => {

        this.loading = false;

      }

     )

  }

  getRestaurantList(){

    this.loading = true;
    this.httpClient.post( environment.weburl+ "managerestaurantuser", this.data, { headers: {'Content-Type' : 'application/json; charset= UTF-8','Access-Control-Allow-Methods' : '*'}})

    .subscribe( 

      responseData => {

        this.manageRestaurantResponse = responseData;
        console.log( this.manageRestaurantResponse );

        this.restaurantData = this.manageRestaurantResponse.managerestaurant;
        console.log( this.restaurantData );
        
        if( this.manageRestaurantResponse.status == 200 ){

          this.messageResponseData.msg = this. manageRestaurantResponse.success;
          this.userProfileMessage();

        } else if( this.manageRestaurantResponse.status == 400 ){

          this.messageResponseData.msg = this. manageRestaurantResponse.error;
          this.userProfileMessage();

        }

      },
      error => {

        this.loading = false;
        this.messageResponseData.msg = this. manageRestaurantResponse.error;
        this.userProfileMessage();

      },
      () => {

        this.loading = false;
        
      }
    )

  }

  deleteItem(restaurantid){

    this.data.restaurantid = restaurantid;

    this.loading = true;
    const restDelete = {'tbl_restaurant_id':restaurantid,'userid': this.data.userid}
    this.httpClient.post( environment.weburl+ "deleterestaurant", restDelete, { headers: {'Content-Type' : 'application/json; charset= UTF-8','Access-Control-Allow-Methods' : '*'}})
    .subscribe(

      responseData => {

        this.deleteRestaurantResponse = responseData;
        console.log( this.deleteRestaurantResponse );

        if( this.deleteRestaurantResponse.status == 200 ){

          this.messageResponseData.msg = this.deleteRestaurantResponse.success;
          this.userProfileMessage();
          this.getRestaurantList();          

        } else if( this.deleteRestaurantResponse == 400 ) {

          this.messageResponseData.msg = this.deleteRestaurantResponse.error;
          this.userProfileMessage();

        }

      },
      error =>{

        this.loading = false;
        this.messageResponseData.msg = this.deleteRestaurantResponse.error;
        this.userProfileMessage();

      },
      () => {
        this.loading = false;
      }
    )


  }


  async userProfileMessage(){

    const toast = await this.toastController.create({
      message: this.messageResponseData.msg,
      duration: 2000,
      position: 'top',
      animated: true,
    });
    toast.present();

  } 


}
