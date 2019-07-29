import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { environment } from '../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Router,ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-restaurantmenu',
  templateUrl: './restaurantmenu.page.html',
  styleUrls: ['./restaurantmenu.page.scss'],
})
export class RestaurantmenuPage implements OnInit {

  text: string = 'Add';
  
  loading = false;

  data: any = {};
  
  restaurantMenuResponse : any = {};

  menulist = [];
   


  constructor(private location :Location,private router: Router,private httpClient:HttpClient,private route: ActivatedRoute) { 
    this.data.tbl_restaurant_id = this.route.snapshot.paramMap.get('resmenu'); 
    console.log( this.data.tbl_restaurant_id );
  }

  ngOnInit() {

    

    this.restaurantMenuList();

  }


  restaurantMenuList(){


    this.httpClient.post( environment.weburl+ "getusermenudata", this.data, { headers: {'Content-Type' : 'application/json; charset= UTF-8', 'Access-Control-Allow-Methods' : '*'}})
        
        .subscribe(

          responseData => {

            this.restaurantMenuResponse = responseData;
            console.log( this.restaurantMenuResponse );

            this.menulist = this.restaurantMenuResponse.menusdata;
  
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
