import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute} from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ToastController } from '@ionic/angular';
import { environment } from '../../environments/environment';


@Component({
  selector: 'app-managemenulist',
  templateUrl: './managemenulist.page.html',
  styleUrls: ['./managemenulist.page.scss'],
})
export class ManagemenulistPage implements OnInit {


  data:any = {};
  loading = false;
  restaurantMenuListResponse : any = {};
  messageResponseData: any = {};
  restaurantList = [];
  menuStatusResponse: any = {};

  constructor(public toastController: ToastController,private router: Router,private route: ActivatedRoute,private httpClient:HttpClient) { 


  }

  ngOnInit() {

    this.data.userid = localStorage.getItem('loginUser');
    if(!this.data.userid){
      this.router.navigate(['/login']);
    }

    this.data.tbl_restaurant_id=localStorage.getItem('RestaurantId');
    if(!this.data.tbl_restaurant_id){
      this.router.navigate(['/addrestaurant']);
    } 

    this.getRestaurantMenuList();

  }


  getRestaurantMenuList(){

    this.loading = true;

    this.httpClient.post( environment.weburl2+"getownermenudata", this.data, { headers: {'Content-Type' : 'application/json; charset= UTF-8','Access-Control-Allow-Methods' : '*'}})
    
    .subscribe(

      responseData => {

        this.restaurantMenuListResponse = responseData;

        console.log( this.restaurantMenuListResponse );

        this.restaurantList = this.restaurantMenuListResponse.menusownerdata;

        if( this.restaurantMenuListResponse.status == 200 ){

          this.restaurantMenuListResponse.msg = this.restaurantMenuListResponse.success;
          this.userProfileMessage();

        } else if( this.restaurantMenuListResponse.status == 400 ) {

          this.restaurantMenuListResponse.msg = 
          this.restaurantMenuListResponse.error;
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

  notify(menuid, menustatus) {

    const status = {'tbl_menu_id':menuid,'userid': this.data.userid, 'res_status': menustatus };

    console.log("Toggled: "+ menustatus);

    this.httpClient.post( environment.weburl2+ "changemenustatus", status, { headers: {'Content-Type' : 'application/json; charset= UTF-8','Access-Control-Allow-Methods' : '*'}})

    .subscribe(

      responseData => {

        this.menuStatusResponse = responseData;
        console.log( this.menuStatusResponse );
        
        if( this.menuStatusResponse.status == 200 ){

          this.messageResponseData.msg = this.menuStatusResponse.success;
          this.userProfileMessage();

        } else if(this.menuStatusResponse.status == 400){

          this.messageResponseData.msg = this.menuStatusResponse.error;
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
