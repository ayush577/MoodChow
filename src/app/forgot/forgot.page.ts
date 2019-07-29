import { Component, OnInit } from '@angular/core';

import { Router,ActivatedRoute} from "@angular/router";
import { FormBuilder, FormGroup, AbstractControl , Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { ToastController } from '@ionic/angular';
import { Location } from '@angular/common';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {

  constructor(public toastController: ToastController,private router: Router,private formBuilder: FormBuilder,private route: ActivatedRoute,private httpClient:HttpClient,private location: Location) { }

  forgotForm: FormGroup;
    loading = false;
    submitted = false;
    data: any = {};
    forgoterrors;
    forgoterrorsmsg='';
    forgotResponse: any = {};
    messageResponseData: any = {};
    

  ngOnInit() {

    this.data.userid = localStorage.getItem('loginUser');        
      if(this.data.userid){
        this.router.navigate(['./home']); 
      } 
      
      this.forgotForm = this.formBuilder.group( { 

        email: [ '', [Validators.required , Validators.email]]

       } );

  }

  get f() {

    if( this.forgotForm.controls.email.errors && this.forgotForm.controls.email.errors.required){

      this.forgoterrorsmsg=" Please Enter Valid email address";

    }

      return this.forgotForm.controls;

  }

  onSubmit(){

    this.forgoterrors = false;
    this.submitted = true;

    if( this.forgotForm.invalid ){
      return;
    }
    

    this.loading = true;

    this.httpClient.post( environment.weburl+ "forgetpassword", this.data, { headers: {'Content-Type' : 'application/json; charset= UTF-8', 'Access-Control-Allow-Methods' : 'POST'}})
    .subscribe( 
        responseData => {

          this.forgotResponse = responseData;
          console.log( this.forgotResponse );

          if( this.forgotResponse.status == 200 ){
            
            this.messageResponseData.msg = this.forgotResponse.success;
            this.forgotmessage();
            this.router.navigate(['/login'])

          } else if ( this.forgotResponse.status == 400 ) {

              this.messageResponseData.msg = this.forgotResponse.error;
              this.forgotmessage();
              this.router.navigate(['/forgot'])

          }

          this.loading = false;

        },

        error => {

          this.loading = false;
          this.forgoterrorsmsg = "Error Something Went Wrong";

        },
        () =>{

          this.loading = false;

        }
     )
  }

  backbutton(){
    this.location.back();
  }

  async forgotmessage(){

    const toast = await this.toastController.create({
      message: this.messageResponseData.msg,
      duration: 3000,
      position: 'top',
      animated: true,
      cssClass: 'toast_alert-color'
    });
    toast.present();

  }

}
