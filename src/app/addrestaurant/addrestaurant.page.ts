import { Component, OnInit } from '@angular/core';

import { Router,ActivatedRoute} from "@angular/router";
import { FormBuilder, FormGroup, AbstractControl, FormControl , Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { ToastController } from '@ionic/angular';

import { environment } from '../../environments/environment';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-addrestaurant',
  templateUrl: './addrestaurant.page.html',
  styleUrls: ['./addrestaurant.page.scss'],
})
export class AddrestaurantPage implements OnInit {

  customPopoverOptions: any;
  customPopoverOptions1: any;
  customPopoverOptions2: any;
  customPopoverOptions3: any;
  data:any = {};
  isSearch_clicked : Boolean = false;
  days="mon";
  count:any=0;
  catagory:any;
  subCatagory:any;
  catagory_id:any;
  cityData:any;
  stateData:any;
  state_id:any;
  R_info=[];
  errormsg:any;
  userid:any={};
  messageResponseData: any ={};

  constructor(public toastController: ToastController,private router: Router,private formBuilder: FormBuilder,private route: ActivatedRoute,private httpClient:HttpClient,public actionSheetController: ActionSheetController, private camera: Camera) {
    this.customPopoverOptions = {
      header: 'Select Category',
      cssClass: 'select_popover',
      animated: true,
    };
    this.customPopoverOptions1 = {
      header: 'Select Category',
      cssClass: 'select_popover',
      animated: true,
    };
    this.customPopoverOptions2 = {
      header: 'Select State',
      cssClass: 'select_popover',
      animated: true,
    };
    this.customPopoverOptions3 = {
      header: 'Select City',
      cssClass: 'select_popover',
      animated: true,
    };
    this.getCatagories();
    this.getState();
   }

  //form 1 
   RestaurantForm1 = new FormGroup({
    store_name: new FormControl('',[Validators.required] ),
    owner_name: new FormControl('',[Validators.required]),
    owner_email: new FormControl('',[Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
    owner_phn_no: new FormControl('',[Validators.required,Validators.maxLength(10),Validators.minLength(10)]),
    category: new FormControl('',Validators.required),
    sub_category: new FormControl('',Validators.required),
  });

  //form 2
  RestaurantForm2 = new FormGroup({
  city: new FormControl('',Validators.required ),
  state: new FormControl('',Validators.required),
  zip_code: new FormControl('',[Validators.required,Validators.minLength(5),,Validators.maxLength(5)]),
  restaurant_address: new FormControl('',Validators.required),
  });


  validation_messages = {
    'store_name': [
        { type: 'required', message: 'Restaurant name is required.' },
        { type: 'minlength', message: 'Restaurant name must be at least 3 characters long.' },
      ],
    'owner_name': [
        { type: 'required', message: 'Owner name is required.' },
        { type: 'minlength', message: 'Owner name must be at least 4 characters long.' },
      ], 
    'owner_email': [
        { type: 'required', message: 'Owner email is required.' },
        { type: 'minlength', message: 'Owner email must be at least 4 characters long.' },
        { type: 'maxlength', message: 'Owner email cannot be more than 25 characters long.' },
        { type: 'pattern', message: 'Owner email must contain valid email pattern.' }
      ], 
    'owner_phn_no': [
        { type: 'required', message: 'Phone number is required.' },
        { type: 'minlength', message: 'Phone number must be at least 10 characters long.' },
        { type: 'maxlength', message: 'Phone number cannot be more than 10 characters long.' }
      ], 
    'category': [
        { type: 'required', message: 'Category is required.' }
      ],
    'sub_category': [
        { type: 'required', message: 'Sub Category is required.' }
      ],
    'city': [
        { type: 'required', message: 'City is required.' }
      ],
    'state': [
        { type: 'required', message: 'State is required.' }
      ],
    'zip_code': [
        { type: 'required', message: 'Zip code is required.' },
        { type: 'minlength', message: 'Zip code must be at least 3 characters long.' },
        { type: 'maxlength', message: 'Zip code cannot be more than 12 characters long.' }
      ],
    'restaurant_address': [
        { type: 'required', message: 'Please fill the address of Restaurant.' }
      ]
    
    }




  ngOnInit() {

    this.userid.userid = localStorage.getItem('loginUser');
    if( !this.userid.userid ){
      this.router.navigate(['./login']);
    }

  }

   //page switching 
   next0(){
    if(this.count==0){
      this.count=1;
    }
  }

  prev0(){
    if(this.count==1){
      this.count=0;
    } 
  }

  setCatId(id){
    this.catagory_id=id;
    this.getSubCatagories();
  }
 
  setStateId(id){
    this.state_id=id;
    this.getCity();
  }
  
  AddNewRestautant(){
    // this.userid = this.userid.userid;
    this.R_info={...this.RestaurantForm1.value,...this.RestaurantForm2.value,...this.userid};
    this.sendData(); 
    this.count=0;
    this.RestaurantForm1.reset();
    this.RestaurantForm2.reset();

    this.messageResponseData.msg = this
    // this.router.navigate([ '/setresturanttime' ]);
  }

   //API Integration for catagories 
   getCatagories(){
   
    return this.httpClient.get( environment.weburl2 + "getcategorydata",{ headers: {'Content-Type' : 'application/json; charset= UTF-8', 'Access-Control-Allow-Methods' : '*'}})
    .subscribe(catData=>{
      this.catagory=catData;
      this.catagory=this.catagory.categorydata;
     
    })
  }


  //API Integration for subCatagories 
  getSubCatagories(){
    let postData = {
      "tbl_category_id": this.catagory_id
    }
    // this.loading1.presentLoading("Loading...");
    return this.httpClient.post( environment.weburl2 + "getsubcategorydata",postData , { headers: {'Content-Type' : 'application/json; charset= UTF-8', 'Access-Control-Allow-Methods' : '*'} } )
    .subscribe(catData=>{
      this.subCatagory=catData;
      this.subCatagory=this.subCatagory.subcategorydata;
      //this.loading1.dismiss();
    })
  }

   //API Integration for state 
   getState(){
     
    return this.httpClient.get(environment.weburl2 + "getlocationsatedata",{ 
      headers: {'Content-Type' : 'application/json; charset= UTF-8', 'Access-Control-Allow-Methods' : '*'} 
     })
    .subscribe(stateData=>{
      this.stateData=stateData;
      this.stateData=this.stateData.statedata;
     
    })
  }


  //API Integration for city 
  getCity(){
    // this.loading1.presentLoading("Loading...");
   let postData = {
     "tbl_states_code": this.state_id
   }
   return this.httpClient.post(environment.weburl2 + "getlocationcitydata",postData)
   .subscribe(cityData=>{
     this.cityData=cityData;
     this.cityData=this.cityData.citydata;
     //this.loading1.dismiss();
   })
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
  //  if(this.data.image){
  //    this.profileUpdate();
  //    }
     
 }, (err) => {
     
  this.messageResponseData.msg = this.data.errors;
  this.addrestaurantmessage();

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
    // if(this.data.image){
    //   this.profileUpdate();
    //   }
 }, (err) => {
     
  this.messageResponseData.msg = this.data.errors;
  this.addrestaurantmessage();
 
});

}

 //API Integhration for send data to server for Add New Restaurant
 sendData(){
  // this.loading1.presentLoading("Loading...");
 return this.httpClient.post(environment.weburl2 +"addrestaurant",this.R_info, { headers: {'Content-Type' : 'application/json; charset= UTF-8', 'Access-Control-Allow-Methods' : '*'}})
 
 .subscribe( 
   
  responsedata=>{
   // this.loading1.dismiss();

          this.data = responsedata;
          console.log( this.data );


    if( this.data.status == 200 ){
      if( this.data.tbl_restaurant_id){
        
        this.messageResponseData.msg = this.data.success;
        this.addrestaurantmessage();
        localStorage.setItem('RestaurantId', this.data.tbl_restaurant_id);
        this.router.navigate(['/timemanage']);
      
      } else{

        this.messageResponseData.msg = this.data.error;
        this.addrestaurantmessage();

      } 
    } else if( this.data.status == 400 ){

      this.messageResponseData.msg = this.data.error;
      this.addrestaurantmessage();

    }

 },
 error => {
    // this.loading1.dismiss();
   console.log("this is the error from api side man  ",error );
   //this.taost.show(" Shit..! There was an error, Please try again.")
 })
}

async addrestaurantmessage() {
  const toast = await this.toastController.create({
    message: this.messageResponseData.msg,
    duration: 2000,
    position: 'top',
    animated: true
  });
  toast.present();
}



}
