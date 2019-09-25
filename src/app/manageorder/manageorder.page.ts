import { Component, OnInit } from '@angular/core';

import { Router,ActivatedRoute} from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ToastController } from '@ionic/angular';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-manageorder',
  templateUrl: './manageorder.page.html',
  styleUrls: ['./manageorder.page.scss'],
})
export class ManageorderPage implements OnInit {

  loading = false;
  data: any = {};
  restaurantOrderResponse: any ={};
  orderdetail = [];

  constructor(public toastController: ToastController,private router: Router,private route: ActivatedRoute,private httpClient:HttpClient) { }

  ngOnInit() {

    this.data.userid = localStorage.getItem('loginUser');
    if(!this.data.userid){
      this.router.navigate(['/login']);
    }

    this.data.tbl_restaurant_id=localStorage.getItem('RestaurantId');
    if(!this.data.tbl_restaurant_id){
      this.router.navigate(['/addrestaurant']);
    } 

    this.restaurantOrder();

  }


  restaurantOrder(){

    this.loading = true;

     this.httpClient.post( environment.weburl+"manageordersrestaurant", this.data, { headers: {'Content-Type' : 'application/json; charset= UTF-8','Access-Control-Allow-Methods' : '*'}})

     .subscribe(

      responseData => {

        this.restaurantOrderResponse = responseData;

        console.log( this.restaurantOrderResponse );

        this.orderdetail = this.restaurantOrderResponse.manageorder;
        console.log( this.orderdetail );

        

      },
      error => {

        this.loading = true;

      },
      () => {

        this.loading = false;

      }
     )
 
  }

}
