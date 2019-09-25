import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { environment } from '../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Router,ActivatedRoute} from "@angular/router";
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-successfullorder',
  templateUrl: './successfullorder.page.html',
  styleUrls: ['./successfullorder.page.scss'],
})
export class SuccessfullorderPage implements OnInit {

  loading = false;
  data : any = {};
  userOrderData: any = {};
  restaurantInfo = [];

  constructor(private location :Location,private router: Router,private httpClient:HttpClient,private route: ActivatedRoute,private callNumber: CallNumber) { }

  ngOnInit() {

    this.data.userid = localStorage.getItem('loginUser');
    if( !this.data.userid ){

      this.router.navigate[('/login')];

    }

    this.successfullyorderdata();

  }

  successfullyorderdata(){


    this.httpClient.post( environment.weburl + "getrestaurantdatauser", this.data, { headers: {'Content-Type' : 'application/json; charset= UTF-8', 'Access-Control-Allow-Methods' : '*'}})
  
    .subscribe(

      responseData =>{

        this.userOrderData = responseData;

        this.restaurantInfo = this.userOrderData.restaurantdatauser;

        console.log( this.restaurantInfo );

      },
      error => {

        this.loading = false;

      },
      () => {
         this.loading = false;
      }
      
    )
  
  
   }

   call(resturantNumber){

    this.callNumber.callNumber(resturantNumber, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));

   }

}




