import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute} from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ToastController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.page.html',
  styleUrls: ['./userprofile.page.scss'],
})
export class UserprofilePage implements OnInit {


  data:any = {};
  loading = false;
  userProfileResponse: any = {};
  messageResponseData: any = {};
  userInfo: any = {};
  profileImageResponse: any ={};


  constructor(public toastController: ToastController,private router: Router,private route: ActivatedRoute,private httpClient:HttpClient, public actionSheetController: ActionSheetController, private camera: Camera) { }

  ngOnInit() {

    this.data.userid = localStorage.getItem('loginUser');
    if(!this.data.userid){
      this.router.navigate(['/login']);
    }

    this.getUserProfile();

  }

  getUserProfile(){

    this.loading = true;

    this.httpClient.post( environment.weburl+ "getuserprofile", this.data, { headers: {'Content-Type' : 'application/json; charset= UTF-8','Access-Control-Allow-Methods' : '*'}})
    .subscribe( 

      responseData => {

        this.userProfileResponse = responseData;
        console.log( this.userProfileResponse ); 

        this.userInfo = this.userProfileResponse.userprofile

      },
      error => {

        this.loading = false;
        this.messageResponseData.msg = this.userProfileResponse.error;
        this.userProfileMessage();

      },
      () => {

        this.loading = false;
      
      }
    )

  }

  profileUpdate(){

    this.loading = true;

    // https://dev.hawkscode.com.au/moodchow/Webservice/
  
    this.httpClient.put( environment.weburl + "updateprofileimage", this.data, { headers: {'Content-type': 'application/json; charset=UTF-8', 'Access-Control-Allow-Methods' : 'PUT'}})
  
        .subscribe( 
  
            responseData => {
  
              this.profileImageResponse=responseData; 
              console.log( this.profileImageResponse );
  
              if( this.profileImageResponse.status == 200 ){
  
                this.messageResponseData.msg = this.data.success;
                this.userProfileMessage();
  
              } else {
  
                this.messageResponseData.msg = this.data.errors;
                this.userProfileMessage();
  
              } 
  
              this.loading = false;
  
            },
  
            error => {
  
              this.loading = false;
              
              this.messageResponseData.msg = this.data.errors;
              this.userProfileMessage();
  
            });
  
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
    this.userProfileMessage();
  
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
    this.userProfileMessage();
   
  });
  
  }
  

  async userProfileMessage(){

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
