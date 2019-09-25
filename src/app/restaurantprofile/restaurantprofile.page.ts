import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Location } from '@angular/common';
import { environment } from '../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Router,ActivatedRoute} from "@angular/router";
import { CallNumber } from '@ionic-native/call-number/ngx';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-restaurantprofile',
  templateUrl: './restaurantprofile.page.html',
  styleUrls: ['./restaurantprofile.page.scss'],
})
export class RestaurantprofilePage implements OnInit {

  slideOpts = {
    initialSlide: 1,
    autoplay:true, 
    loop:true ,
    speed:1500
  };

  slideData = [
    { image: "../../assets/images/slider1.png" },
    { image: "../../assets/images/slider1.png" },
    { image: "../../assets/images/slider1.png" }]

  constructor(public navCtrl: NavController,private location :Location,private router: Router,private httpClient:HttpClient,private route: ActivatedRoute,private callNumber: CallNumber,public toastController: ToastController) { 
    this.data.tbl_restaurant_id = this.route.snapshot.paramMap.get('respro'); 
    console.log( this.data.tbl_restaurant_id );
  }

      loading = false;
      submitted = false;
      data: any = {};
      restaurantProfileResponse: any =  {};
      messageResponseData: any = {};
      RestaurantProfileMenu: any = {};
      getMenuListProfile =[];
      getRestaurantDetail = [];
      getSidlerDetail = [];
      cartData = [];

      

      text: string = 'Add';

    ngOnInit(){

      let loginUser = localStorage.getItem('loginUser');
    
      this.RestaurantProfileCall();
      
    }

    back()
    {
      console.log("hello");
      this.location.back();
    }

    RestaurantProfileCall(){

      this.submitted = true;

        this.httpClient.post( environment.weburl+ "restaurantdetails", this.data, { headers: {'Content-Type' : 'application/json; charset= UTF-8', 'Access-Control-Allow-Methods' : '*'}})
        
        .subscribe(

        responseData => {

          this.restaurantProfileResponse = responseData;
          console.log( this.restaurantProfileResponse );

          this.getRestaurantDetail = this.restaurantProfileResponse.getrestdet;
          this.getSidlerDetail = this.restaurantProfileResponse.sliderphotos;
          this.getMenuListProfile = this.restaurantProfileResponse.getmenulimit;

        },
        error => {

          this.loading = false;

        },
        () => {

          this.loading = false;
        
        }

      )

    }


    callRestaurant(Number){

      this.callNumber.callNumber("Number", true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));

    }


    addToCart(fooddish){
      if(fooddish){
        if(localStorage.getItem('cartData')){ 
          var cartget = localStorage.getItem('cartData');
          if(cartget){
            this.cartData=JSON.parse(cartget);
          }
          this.cartData.push({'product_id':fooddish, 'restaurant_id':this.data.tbl_restaurant_id});  
          localStorage.setItem('cartData',JSON.stringify(this.cartData));
        }
        else{
            this.cartData.push({'product_id':fooddish,'restaurant_id':this.data.tbl_restaurant_id}); 
            localStorage.setItem('cartData',JSON.stringify(this.cartData));
        }
      }
       
    }

    checkCartInProduct(product){ 
      if(product){
      if(localStorage.getItem('cartData')){ 
        var cartget = localStorage.getItem('cartData');
        if(cartget){
          this.cartData=JSON.parse(cartget);
          for(let i=0;i<this.cartData.length;i++){
            if(this.cartData[i].product_id==product){
              return true;
               break;
            } 
          }
        }          
      }
      else{
          return false;
      }
    }
    else{
      return false;
    }
    }


    async itemAddCart(){

      const toast = await this.toastController.create({
        message: this.messageResponseData.msg,
        duration: 2000,
        position: 'top',
        animated: true,
      });
      toast.present();
  
    }

}

