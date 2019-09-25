import { Component, OnInit } from '@angular/core';

import { Router,ActivatedRoute} from "@angular/router";
import { FormBuilder, FormGroup, AbstractControl , Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { ToastController } from '@ionic/angular';

import { environment } from '../../environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(public toastController: ToastController,private router: Router,private formBuilder: FormBuilder,private route: ActivatedRoute,private httpClient:HttpClient) { }

  registerForm: FormGroup;
    loading = false;
    submitted = false;
    data:any = {};
    registererrors;
    registererrorsmsg='';
    registerResponse: any={};
    messageResponseData: any={};

    passwordType1: string = 'password';
    passwordIcon1: string = 'eye-off';

    passwordType2: string = 'password';
    passwordIcon2: string = 'eye-off';

  ngOnInit() {

    let loginUser = localStorage.getItem('loginUser');        
    if(loginUser){
      this.router.navigate(['./home']); 
    }   
    
    this.data.usertoken = localStorage.getItem( 'usertoken');

    this.registerForm = this.formBuilder.group({ 

      fullname: ['', [Validators.required]],

      email: ['', [Validators.required, Validators.email]],
      
      phonenumber: ['', [Validators.required,Validators.maxLength(10), Validators.minLength(10)]],

      password: ['', [Validators.required, Validators.minLength(6)]], 

      confirmpassword: ['', [Validators.required, Validators.minLength(6)]],
  },
  {
    validator: this.MatchPassword // Inject the provider method
  }
  ); 

  }

  get f(){

    if(this.registerForm.controls.fullname.errors 
              && 
      this.registerForm.controls.email.errors && this.registerForm.controls.email.errors.required 
              &&
      this.registerForm.controls.phonenumber.errors && this.registerForm.controls.phonenumber.errors.required
              &&
      this.registerForm.controls.password.errors && this.registerForm.controls.password.errors.required
              &&
      this.registerForm.controls.confirmpassword.errors && this.registerForm.controls.confirmpassword.errors.required 
      ){

      this.registererrorsmsg="All fields are required";        
        
        }  else if( this.registerForm.controls.fullname.errors && this.registerForm.controls.fullname.errors.required ){

          this.registererrorsmsg="Please Enter Your Name";
        
        } 
         else if(this.registerForm.controls.email.errors && this.registerForm.controls.email.errors.required){

          this.registererrorsmsg="Email is invalid"; 
  
      }  else if(this.registerForm.controls.phonenumber.errors){

        this.registererrorsmsg="Enter 10-digit contact number";       
        
      }  else if(this.registerForm.controls.password.errors &&    this.registerForm.controls.password.errors.minlength || 
      this.registerForm.controls.password.errors && this.registerForm.controls.password.errors.required ){

      this.registererrorsmsg="Password must be atleast 6 characters";       
      
      }  else if(this.registerForm.controls.confirmpassword.errors && this.registerForm.controls.confirmpassword.errors.minlength || this.registerForm.controls.confirmpassword.errors &&
        this.registerForm.controls.confirmpassword.errors.required ){

        this.registererrorsmsg="Password did not match";       
        
        }

      return this.registerForm.controls;

  }


  private MatchPassword(AC: AbstractControl){

    const password = AC.get('password').value

    const confirmpassword = AC.get('confirmpassword').value

    if(password != confirmpassword) {
        console.log('Password Does not Match');
        AC.get('confirmpassword').setErrors( { MatchPassword: true } )
    } else {
        console.log('Password Match')
        AC.get('confirmpassword').setErrors(null);
    }
}

hideShowPassword1() {
  this.passwordType1 = this.passwordType1 === 'text' ? 'password' : 'text';
  this.passwordIcon1 = this.passwordIcon1 === 'eye-off' ? 'eye' : 'eye-off';
}

hideShowPassword2() {
  this.passwordType2 = this.passwordType2 === 'text' ? 'password' : 'text';
  this.passwordIcon2 = this.passwordIcon2 === 'eye-off' ? 'eye' : 'eye-off';
}


onSubmit(){
  this.registererrors = false;
  this.submitted= true;

  // stop here if form is invalid
  if (this.registerForm.invalid) {
    return;
  }
  
  this.loading = true;

  this.httpClient.post(environment.weburl+"registerdata",
  this.data,{headers: {'Content-Type': 'application/json;charset=UTF-8', 'Access-Control-Allow-Methods': 'POST'}})
  .subscribe(
    responseData => {

      this.registerResponse=responseData;
      console.log( this.registerResponse );

      if(this.registerResponse.status==200)
        {  
          if(this.registerResponse.userid){
            localStorage.setItem('loginUser', this.registerResponse.userid);
            this.router.navigate(['/registeraddress']);
          }
          else{
            this.messageResponseData.msg="Some Went Wrong"
            this.msgdisplaybox();
          }
        } else if(this.registerResponse.status==400){ 
          this.registererrors=true;
          this.messageResponseData.msg=this.registerResponse.error
          this.msgdisplaybox();
          this.router.navigate(['/login']);
        }
         this.loading = false;
       },
       error => { 
           this.loading = false;
            this.registererrors=true;
             this.registererrorsmsg="Error something went wrong";
       },
       () => { 
            this.loading = false;
       });

    }

    async msgdisplaybox() {
      const toast = await this.toastController.create({
        message: this.messageResponseData.msg,
        duration: 2000,
        position: 'top',
        cssClass: 'toast_alert-color'
      });
      toast.present();
    }
  

}




