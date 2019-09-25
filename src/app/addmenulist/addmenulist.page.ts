import { Component, OnInit } from '@angular/core';

import { environment } from '../../environments/environment';
import { Router,ActivatedRoute} from "@angular/router";
import { FormBuilder, FormGroup, AbstractControl , Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { ToastController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-addmenulist',
  templateUrl: './addmenulist.page.html',
  styleUrls: ['./addmenulist.page.scss'],
})
export class AddmenulistPage implements OnInit {

  constructor(public toastController: ToastController,private router: Router,private formBuilder: FormBuilder,private route: ActivatedRoute,private httpClient:HttpClient,public actionSheetController: ActionSheetController, private camera: Camera) { }

  listForm: FormGroup;
  loading= false;
  submitted = false;
  data:any = {};
  messageResponseData: any={};
  addmenuerrorsmsg='';
  addRestauranterrormsg;
  profileImageResponse

  ngOnInit() {

    this.data.userid = localStorage.getItem('loginUser');
    if( !this.data.userid ){
      this.router.navigate(['/login']);
    }

    this.data.restaurantid = localStorage.getItem('RestaurantId')
    if(!this.data.restaurantid){
      this.router.navigate(['/addrestaurant']);
    }

    this.listForm = this.formBuilder.group({

      name: ['', [Validators.required]],

      description: ['', [ Validators.required, Validators.maxLength(50)] ],

      price: ['', [ Validators.required] ]

    });

  }

  get f(){

    if( this.listForm.controls.name.errors && this.listForm.controls.name.errors.required 
                        && 
    this.listForm.controls.description.errors && this.listForm.controls.description.errors.required
                        && 
    this.listForm.controls.price.errors && this.listForm.controls.price.errors.required
    
    ){

      this.addmenuerrorsmsg="All fields are required";

    } else if( this.listForm.controls.name.errors && this.listForm.controls.name.errors.required 
      ) {

      this.addmenuerrorsmsg="Please Enter Name";

    } else if( this.listForm.controls.description.errors && this.listForm.controls.description.errors.maxLength ){

        this.addmenuerrorsmsg="Please Enter Description ";

    } else if( 

      this.listForm.controls.price.errors && this.listForm.controls.price.errors.required

     ){

      this.addmenuerrorsmsg =" Please Enter Price";

     }

    return this.listForm.controls;

}

onSubmit(){

  this.submitted = true;

  if(this.listForm.invalid){
    return;
  }

  this.loading = true;
  
  this.addFoodDish();

}

addFoodDish(){

  this.httpClient.post( environment.weburl2 + "addmenu", this.data, {
    headers: {'Content-Type' : 'application/json; charset= UTF-8', 'Access-Control-Allow-Methods' : '*'}})
    .subscribe(

      responseData => {

        this.data = responseData;
        console.log( this.data );

        if( this.data.status == 200 ){

          this.messageResponseData.msg = this.data.success;
          this.addRestaurantMessage();
          this.listForm.reset(); 

        } else if( this.data.status == 400 ) {

          this.messageResponseData.msg = this.data.errors;
          this.addRestaurantMessage();

        }


      },
      error =>{

        this.loading = false;
        this.addRestauranterrormsg  = "Error something went wrong";

      },
      () => {

        this.loading = false;

      }

    )

}

async imageOptions() {
  const actionSheet = await this.actionSheetController.create({
    header: '',
    buttons: [{
      text: 'Open Camera',
      role: 'destructive',
      icon: 'md-camera',
      handler: () => {
              this.openCamera();
      }
    }, {
      text: 'Open Gallery',
      icon: 'md-image',
      handler: () => {

        this.openGallery();

      }
    }, {
      text: 'Cancel',
      icon: 'close',
      role: 'cancel',
      handler: () => {
        console.log('Cancel clicked');
      }
    }]
  });
  await actionSheet.present();
}


openCamera(){

  const options: CameraOptions = {
    sourceType         : this.camera.PictureSourceType.CAMERA,
    destinationType    : this.camera.DestinationType.DATA_URL,
    quality            : 80,
    targetWidth        : 150,
    allowEdit:          true,
    targetHeight       : 150,
    encodingType       : this.camera.EncodingType.JPEG, 
    saveToPhotoAlbum: false 
 }

 this.camera.getPicture(options).then((imageData) => {    
  this.data.image = 'data:image/jpeg;base64,' + imageData;       
 console.log(this.data.image);
   if(this.data.image){
     this.profileUpdate();
     }
     
 }, (err) => {
     
  this.messageResponseData.msg = this.data.errors;
  this.addRestaurantMessage();

 });

}

openGallery(){

  const options: CameraOptions = {
    sourceType         : this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType    : this.camera.DestinationType.DATA_URL,
    quality            : 80,
    targetWidth        : 150,
    allowEdit:          true,
    targetHeight       : 150,
    encodingType       : this.camera.EncodingType.JPEG,
    correctOrientation : true
 }
 this.camera.getPicture(options).then((imageData) => {    
  this.data.image = 'data:image/jpeg;base64,' + imageData;   
    if(this.data.image){
      this.profileUpdate();
      }
 }, (err) => {
     
  this.messageResponseData.msg = this.data.errors;
  this.addRestaurantMessage();
 
});

}


async addRestaurantMessage(){

  const toast = await this.toastController.create({
    message: this.messageResponseData.msg,
    duration: 2000,
    position: 'top',
    animated: true
  });
  toast.present();

}


profileUpdate(){

  this.loading = true;

  this.httpClient.put( environment.weburl2 + "addmenupic", this.data, { headers: {'Content-type': 'application/json; charset=UTF-8', 'Access-Control-Allow-Methods' : 'PUT'}})

      .subscribe( 

          responseData => {

            this.profileImageResponse=responseData; 
            console.log( this.profileImageResponse );

            if( this.profileImageResponse.status == 200 ){

              this.messageResponseData.msg = this.data.success;
              this.addRestaurantMessage();

            } else {

              this.messageResponseData.msg = this.data.errors;
              this.addRestaurantMessage();

            } 

            this.loading = false;

          },

          error => {

            this.loading = false;
            
            this.messageResponseData.msg = this.data.errors;
            this.addRestaurantMessage();

          });

}

}




