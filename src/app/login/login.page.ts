import { Component, OnInit } from '@angular/core';

import { Router,ActivatedRoute} from "@angular/router";
import { FormBuilder, FormGroup, AbstractControl , Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { ToastController } from '@ionic/angular';
import { Events } from '@ionic/angular';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(public toastController: ToastController,private router: Router,private formBuilder: FormBuilder,private route: ActivatedRoute,private httpClient:HttpClient, public events: Events) { 
    
  }

  loginForm: FormGroup;
    loading= false;
    submitted = false;
    data:any = {};
    loginerrors;
    loginerrorsmsg='';
    loginResponse: any={};
    messageResponseData: any={};
    resturantsId = [];


    passwordType: string = 'password';
    passwordIcon: string = 'eye-off';


  ngOnInit() {

    let loginUser = localStorage.getItem('loginUser');        
    if(loginUser){
      this.router.navigate(['./home']); 
    }    

    this.data.usertoken = localStorage.getItem( 'usertoken');

    // this.data.usertoken = "narutisdajd";


    this.loginForm = this.formBuilder.group({

        email: ['', [Validators.required, Validators.email]],

        password: ['', [Validators.required, Validators.minLength(6)]]

    });

  }

  get f(){

      if( this.loginForm.controls.email.errors && this.loginForm.controls.email.errors.required 
                          && 
      this.loginForm.controls.password.errors && this.loginForm.controls.password.errors.required){

        this.loginerrorsmsg="All fields are required";

      } else if( this.loginForm.controls.email.errors && this.loginForm.controls.email.errors.required 
                          ||
      this.loginForm.controls.email.errors &&
      this.loginForm.controls.email.errors.email
        ) {

        this.loginerrorsmsg="Email is invalid";

      } else if( this.loginForm.controls.password.errors && this.loginForm.controls.password.errors.minLength || this.loginForm.controls.password.errors && this.loginForm.controls.password.errors.required ){

          this.loginerrorsmsg="Password must be at least 6 characters";

      }

      return this.loginForm.controls;

  }


  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  onSubmit(){

    this.loginerrors = false;
    this.submitted = true;


    if(this.loginForm.invalid){
      return;
    }

    this.loading = true;

    this.httpClient.post( environment.weburl+ "loginuser", this.data, { headers: {'Content-Type' : 'application/json; charset= UTF-8', 'Access-Control-Allow-Methods' : '*'}})
    .subscribe(

      responseData => {

        this.loginResponse = responseData;
        console.log( this.loginResponse );

        this.resturantsId = this.loginResponse.restaurantid;
        console.log( this.resturantsId );

        if( this.loginResponse.status == 200 ){

          if( this.loginResponse.userid){

            localStorage.setItem('loginUser', this.loginResponse.userid);

            // localStorage.setItem('RestaurantId', this.loginResponse.resturantsId[i]);
            if( this.loginResponse.restaurantid ){
            localStorage.setItem('RestaurantId',JSON.stringify(this.loginResponse.restaurantid));
            }

            this.router.navigate([ '/home' ]);

          } else {

            this.messageResponseData.msg = this.loginResponse.error;
            this.loginmessage();
             
          }
        } else if( this.loginResponse.status == 400 ){

              // this.loginerrors = true;
              this.messageResponseData.msg = this.loginResponse.error;
              this.loginmessage();
              this.router.navigate(['/login']);

        }
        this.loading = false;

      },
      error => {

        this.loading = false;
        // this.loginerrors = true;
        this.loginerrorsmsg="Error something went wrong";

      },
      () => {
         this.loading = false;
      }

    )

  }

  async loginmessage(){

    const toast = await this.toastController.create({
      message: this.messageResponseData.msg,
      duration: 2000,
      position: 'top',
      animated: true,
      cssClass: 'toast_alert-color'
    });
    toast.present();

  }

}
