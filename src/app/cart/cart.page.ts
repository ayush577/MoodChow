import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { environment } from '../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Router,ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  text: string = 'Add';
  loading = false;
  data : any = {};
  orderItem: any = {};

  constructor(private location :Location,private router: Router,private httpClient:HttpClient,private route: ActivatedRoute) { 

  }

  ngOnInit() {

    this.data.userid = localStorage.getItem('loginUser');
    
    this.data.items = localStorage.getItem('cartData');

    this.cartItems();

  }



  cartItems(){

    this.httpClient.post( environment.weburl+ "getcartmenus", this.data, { headers: {'Content-Type' : 'application/json; charset= UTF-8', 'Access-Control-Allow-Methods' : '*'}})

    .subscribe(

      responseData => {

        this.orderItem = responseData;
        console.log( this.orderItem );

      },
      error => {

        this.loading = false;

      },
      () => {

        this.loading = false;

      }


    )

  }





  

   

  


}
