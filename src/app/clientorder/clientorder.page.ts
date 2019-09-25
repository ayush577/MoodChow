import { Component, OnInit } from '@angular/core';

import { Router,ActivatedRoute} from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ToastController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { Location } from '@angular/common';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-clientorder',
  templateUrl: './clientorder.page.html',
  styleUrls: ['./clientorder.page.scss'],
})
export class ClientorderPage implements OnInit {

  data:any ={};
  loading = false;
  manageOrderDetails: any = {};
  userInfo = [];
  orderInfo = [];

  constructor(public toastController: ToastController,private router: Router,private route: ActivatedRoute,private httpClient:HttpClient,private location: Location, private callNumber: CallNumber) {

    this.data.tbl_cart_id = this.route.snapshot.paramMap.get('manageorder'); 
    console.log( this.data.tbl_cart_id );

   }

  ngOnInit() {

    this.data.userid = localStorage.getItem('loginUser')
    
    if(!this.data.userid){
      this.router.navigate(['./login']);
    }


    this.data.tbl_restaurant_id = localStorage.getItem('RestaurantId');
    if( !this.data.tbl_restaurant_id ){
      this.router.navigate(['/addrestaurant']);
    }

    this.orderDetails();

  }

  orderDetails(){

    this.loading = true; 

    
    this.httpClient.post( environment.weburl2+ "userorder", this.data, { headers: {'Content-Type' : 'application/json; charset= UTF-8', 'Access-Control-Allow-Methods' : '*'}})

    .subscribe(

      responseData => {

        this.manageOrderDetails = responseData;
        console.log( this.manageOrderDetails );


        this.userInfo = this.manageOrderDetails.userdetails;
        console.log( this.userInfo );

        this.orderInfo = this.manageOrderDetails.userorderdata;
        console.log( this.orderInfo );

        this.loading = false; 

      },
      error => {

        this.loading = false;

      },
      () => {

        this.loading = false;

      }


    )

  }

  orderCall(number){

    this.callNumber.callNumber("Number", true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));

  }

  goBack(){
    this.location.back();
  }

}
