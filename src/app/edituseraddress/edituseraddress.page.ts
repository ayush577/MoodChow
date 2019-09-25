import { Component, OnInit } from '@angular/core';

import { Router,ActivatedRoute} from "@angular/router";
import { FormBuilder, FormGroup, AbstractControl , Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { ToastController } from '@ionic/angular';
import { Location } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-edituseraddress',
  templateUrl: './edituseraddress.page.html',
  styleUrls: ['./edituseraddress.page.scss'],
})
export class EdituseraddressPage implements OnInit {

  constructor(public toastController: ToastController,private router: Router,private formBuilder: FormBuilder,private route: ActivatedRoute,private httpClient:HttpClient,private location: Location) { }

  addressForm: FormGroup;
    loading = false;
    submitted = false;
    data: any = {};
    addresserrors;
    addresserrorsmsg = "";
    addressResponse: any = {};
    messageResponseData: any = {};
    addressinfo : any = {};

  ngOnInit() {

    this.data.userid = localStorage.getItem('loginUser');        
      if(!this.data.userid){
        this.router.navigate(['./login']); 
      }   


      this.getuseraddress();
      
      this.addressForm = this.formBuilder.group({ 

        address: ['', [Validators.required]],
  
        address2: [''],
        
        street: ['', [Validators.required]],
  
        landmark: ['', [Validators.required]], 
  
        city: ['', [Validators.required]],
  
        zipcode: [ '', [ Validators.required,Validators.maxLength(5), Validators.minLength(5)]],
    
      }

      );

}


get f(){


  if( this.addressForm.controls.address.errors &&
    this.addressForm.controls.address.errors.required 
                        &&
    this.addressForm.controls.street.errors &&
    this.addressForm.controls.street.errors.required 
                        &&
    this.addressForm.controls.landmark.errors &&
    this.addressForm.controls.landmark.errors.required 
                        &&
    this.addressForm.controls.city.errors &&
    this.addressForm.controls.city.errors.required
                        &&
    this.addressForm.controls.zipcode.errors &&
    this.addressForm.controls.zipcode.errors.required
    
    ) {

      this.addresserrorsmsg = "All fields are required";

    } else if(this.addressForm.controls.address.errors &&
      this.addressForm.controls.address.errors.required ) {

        this.addresserrorsmsg="Please Enter Your address";

      } else if (this.addressForm.controls.street.errors &&
        this.addressForm.controls.street.errors.required  ){

          this.addresserrorsmsg="Enter Your Colony / Street / Locality ";

      } else if (this.addressForm.controls.landmark.errors &&
        this.addressForm.controls.landmark.errors.required  ){

          this.addresserrorsmsg="Please Enter Your landmark";

      } else if(this.addressForm.controls.city.errors && 
          this.addressForm.controls.landmark.errors.required){

            this.addresserrorsmsg="Please Enter Your Landmark";

      } else if(this.addressForm.controls.zipcode.errors &&
          this.addressForm.controls.zipcode.errors.required 
                                ||
          this.addressForm.controls.zipcode.errors &&
          this.addressForm.controls.zipcode.errors.minlength
        ) {

          this.addresserrorsmsg="Please Enter Your 5 digit zipcode";

        }

        return this.addressForm.controls;

}  

getuseraddress(){

  this.httpClient.post( environment.weburl + "getuserprofileaddress",
    this.data,{ headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Access-Control-Allow-Methods': 'POST'}})

    .subscribe( 

      responseData => {

        this.addressResponse = responseData;
        console.log( this.addressResponse );

        this.addressinfo = this.addressResponse.userprofileaddress;

      },
      error => {
          this.loading = false;
            // this.addresserrors = true;
            this.messageResponseData.msg = "Something Went Wrong";
            this.addressmsg();

      },
      () => {
          this.loading = false;
      }

    );

}

onSubmit(){

  this.addresserrors = false;
  this.submitted = true;
console.log( this.addressForm.controls  );
  if( this.addressForm.invalid ){
    return;
  }
  this.addressResponse.userid = this.data.userid;
  this.loading = true;

  this.httpClient.post( environment.weburl + "editaddressdata",
  this.addressResponse,{ headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Access-Control-Allow-Methods': 'POST'}})
  .subscribe( 

    responseData => {

      this.addressResponse = responseData;
      console.log( this.addressResponse );

      if( this.addressResponse.status == 200 ){

        this.addressResponse.msg = this.addressResponse.success
        this.addressmsg();
        this.router.navigate(['/userprofile'])

      } else if( this.addressResponse.status == 400 ){
          
          this.messageResponseData.msg=this.addressResponse.error
          this.addressmsg();
      }
      this.loading = false;
    } ,
    error => {
        this.loading = false;
          // this.addresserrors = true;
          this.messageResponseData.msg = "Something Went Wrong";
          this.addressmsg();
    },
    () => {
        this.loading = false;
    }
   );
}

goBack(){
  this.location.back();
}


async addressmsg() {
  const toast = await this.toastController.create({
    message: this.messageResponseData.msg,
    duration: 2000,
    position: 'top',
    cssClass: 'toast_alert-color'
  });
  toast.present();
}



}


