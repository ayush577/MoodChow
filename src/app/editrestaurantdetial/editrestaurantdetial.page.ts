import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute} from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ToastController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-editrestaurantdetial',
  templateUrl: './editrestaurantdetial.page.html',
  styleUrls: ['./editrestaurantdetial.page.scss'],
})
export class EditrestaurantdetialPage implements OnInit {

  data:any = {};
  loading = false;
  editRestaurantProfile:any = {};

  constructor(public toastController: ToastController,private router: Router,private route: ActivatedRoute,private httpClient:HttpClient, public actionSheetController: ActionSheetController, private camera: Camera) { }

  ngOnInit() {

    this.data.userid=localStorage.getItem('loginUser');
    if(!this.data.userid){
      this.router.navigate(['/login']);
    }

    this.data.restaurantid=localStorage.getItem('RestaurantId');
    if(!this.data.restaurantid){
      this.router.navigate(['/addrestaurant']);
    } 

  }


  restaurantDetail(){

    this.loading = true;

    this.httpClient.post( environment.weburl+ "getuserprofile", this.data, { headers: {'Content-Type' : 'application/json; charset= UTF-8','Access-Control-Allow-Methods' : '*'}})
    .subscribe(

      responseData =>{

        this.editRestaurantProfile = responseData;

      }

    )

  }

  

}
