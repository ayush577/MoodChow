import { Component, OnInit } from '@angular/core';

import { Router,ActivatedRoute} from "@angular/router";
import { FormBuilder, FormGroup, AbstractControl , Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { ToastController } from '@ionic/angular';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-edituserprofile',
  templateUrl: './edituserprofile.page.html',
  styleUrls: ['./edituserprofile.page.scss'],
})
export class EdituserprofilePage implements OnInit {

  constructor(public toastController: ToastController,private router: Router,private formBuilder: FormBuilder,private route: ActivatedRoute,private httpClient:HttpClient) { }

  infoForm: FormGroup;
    loading = false;
    submitted = false;
    data: any ={};
    profileerror;
    profileerrormsg ="";
    profileResponse: any = {};
    messageResponseData: any = {};
    initProfileResponse: any = {};

  ngOnInit() {
    
    this.data.userid = localStorage.getItem('loginUser')
    
    if(!this.data.userid){

      this.router.navigate(['./login']);

    }

    this.infoForm = this.formBuilder.group({

      name: ['', [Validators.required]],

      email: ['', [Validators.required]],

      number: ['', [Validators.required]],

      address: ['', [Validators.required]]

    }
    )

    this.getProfileInfo();

  }

  get userdata(){


    if(this.infoForm.controls.name.errors && this.infoForm.controls.name.errors.required
      
      &&

    this.infoForm.controls.email.errors &&
    this.infoForm.controls.email.errors.required

      &&

    this.infoForm.controls.number.errors &&
    this.infoForm.controls.number.errors.required

      &&

    this.infoForm.controls.address.errors &&
    this.infoForm.controls.address.errors.required  

      ) {


        this.profileerrormsg = " All fields are required";

      } else if(
        this.infoForm.controls.name.errors && this.infoForm.controls.name.errors.required
      ) {

        this.profileerrormsg = "Please Enter Your Full Name";

      } else if(
        this.infoForm.controls.email.errors &&
        this.infoForm.controls.email.errors.required
      ){

        this.profileerrormsg = "Please Enter Your Email";

      } else if (

        this.infoForm.controls.number.errors &&
        this.infoForm.controls.number.errors.required

      ) {

        this.profileerrormsg = "Please Enter Your Mobile Number";

      } else if(

        this.infoForm.controls.address.errors &&
        this.infoForm.controls.address.errors.required  

      ){

        this.profileerrormsg = "Please Enter Your Complete Address";

      } 

      return this.infoForm.controls;



  }


  getProfileInfo(){

    this.httpClient.post( environment.weburl + "getuserprofile",
    this.data,{ headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Access-Control-Allow-Methods': 'POST'}})
    .subscribe( 

      responseData => {

        this.initProfileResponse = responseData;
        console.log( this.initProfileResponse );

      
      } ,
      error => {
          this.loading = false;
            // this.addresserrors = true;
            this.messageResponseData.msg = "Something Went Wrong";
            this.profilemsg();

      },
      () => {
          this.loading = false;
      }
     );


  }


  onSubmit(){

    this.profileerror = false;
    this.submitted = true;

    console.log( this.infoForm.controls );
    if( this.infoForm.invalid ){
      return;
    }

    this.loading = true;

    this.httpClient.post( environment.weburl2 + "updateuserprofile", this.data,{ headers: { 'Content-Type': 'application/json;charset=UTF-8', 'Access-Control-Allow-Methods':'POST'}})

    .subscribe(

      responseData => {

        this.profileResponse = responseData;
        console.log( this.profileResponse );

        if( this.profileResponse.status == 200 ){

          this.messageResponseData.msg = this.profileResponse.
          this.profilemsg();

        } else if( this.profileResponse.status == 400 ){

          this.messageResponseData.msg = this.profileResponse.
          this.profilemsg();

        }
        this.loading = false;

      },

      error => {

        this.loading = false;
        this.messageResponseData.msg = "Something Went Wrong";
        this.profilemsg();

      },
      () => {

        this.loading =false;

      }
    );
  }

  async profilemsg(){
      const toast = await this.toastController.create({

        message: this.messageResponseData.msg,
        duration: 3000,
        position: 'bottom'

      });
      toast.present();
    }
}
