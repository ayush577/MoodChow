import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { environment } from '../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Router,ActivatedRoute} from "@angular/router";
import { ToastController } from '@ionic/angular';

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
  orderInfo = [];
  carterrorsmsg = '';
  cartItemData : any = [];
  cartResponse: any = {};
  messageResponseData: any = {};
  finalCartItem : any = {};

  constructor(private location :Location,private router: Router,private httpClient:HttpClient,private route: ActivatedRoute, public toastController: ToastController ) { 

  }

  ngOnInit() {

    this.data.userid = localStorage.getItem('loginUser');
    if( this.data.userid == !null || this.data.userid == !undefined  ){

      this.router.navigate[('/login')];

    }
    
    this.data.items = localStorage.getItem('cartData');

    this.cartItems();

  }



  cartItems(){

    this.loading = true;

    this.httpClient.post( environment.weburl+ "getcartmenus", this.data, { headers: {'Content-Type' : 'application/json; charset= UTF-8', 'Access-Control-Allow-Methods' : '*'}})
    .subscribe( 

      responseData => {

        this.orderItem = responseData;
 
        this.orderInfo = this.orderItem.cartuserdata;
        console.log( this.orderInfo );

      },
      error => {

          this.loading = false;

      },
      () => {
        
        this.loading = false;

      }

    );

  }


  deleteItem(itemId,restaurantId) {
     if(itemId && restaurantId){
      if (localStorage.getItem('cartData')) {
        this.cartItemData = localStorage.getItem('cartData');
        this.cartItemData = JSON.parse(this.cartItemData);
        for (var i = this.cartItemData.length; i--;) {
           if (this.cartItemData[i].product_id == itemId && this.cartItemData[i].restaurant_id == restaurantId) {
            this.cartItemData.splice(i, 1); 
            break;
            }
        }
        for (var o = this.orderInfo.length; o--;) {
          if (this.orderInfo[o].tbl_menu_id == itemId && this.orderInfo[o].restaurantid == restaurantId) {
            this.orderInfo.splice(o, 1); 
            break;
            }
        }
        
        localStorage.setItem('cartData',JSON.stringify(this.cartItemData));
      }
      else{
        this.cartItemData=[];
      }      
      }
      else{
        this.cartItemData=[];
      } 
  }


  onClick(){
    
    this.finalCartItem.userid = localStorage.getItem('loginUser');

    this.finalCartItem.items = localStorage.getItem('cartData');

    console.log( this.finalCartItem );

    if( this.finalCartItem == null ){
      
      
      return false;

    }

    this.loading = true;

    this.httpClient.post( environment.weburl+ "sendenquirycarmenus", this.finalCartItem, { headers: {'Content-Type' : 'application/json; charset= UTF-8', 'Access-Control-Allow-Methods' : '*'}})
    .subscribe(

      responseData =>{

          this.cartResponse = responseData;
          console.log( this.cartResponse );

          if( this.cartResponse.status == 200 ){

            this.messageResponseData.msg = this.cartResponse.success;
            this.cartmessage();
            this.router.navigate(['/successfullorder']);

          } else if( this.cartResponse.status == 400 ){

            this.messageResponseData.msg = this.cartResponse.error;
            this.cartmessage();

          }
          this.loading = false;

      },
      error => {

        this.loading = false;
        this.carterrorsmsg = "Error something went wrong"

      },
      () => {

        this.loading = false;

      }
    )

  }

  async cartmessage() {

    const toast = await this.toastController.create({
      message: this.messageResponseData.msg,
      duration: 2000,
      position: 'top',
      animated: true,
    });
    toast.present();

  }


}
