import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute} from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { ToastController, AlertController } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-multipleimageupload',
  templateUrl: './multipleimageupload.page.html',
  styleUrls: ['./multipleimageupload.page.scss'],
})
export class MultipleimageuploadPage implements OnInit {

  data:any = {};
  loading = false;
  photos : any = {};
  picture : any = {};
  base64Image : string;
  messageResponseData: any = {}

  constructor(public toastController: ToastController,private router: Router,private route: ActivatedRoute,private httpClient:HttpClient, public actionSheetController: ActionSheetController, private camera: Camera,private alertCtrl : AlertController) { }

  ngOnInit() {

    this.data.userid = localStorage.getItem('loginUser');
    if(!this.data.userid){
      this.router.navigate(['/login']);
    }

    this.photos = [];

  }

  async deletePhoto(index) {
    let confirm = await this.alertCtrl.create({
        header: 'Sure you want to delete this photo? There is NO undo!',
        message: '',
        buttons: [
          {
            text: 'No',
            handler: () => {
              console.log('Disagree clicked');
            }
          }, {
            text: 'Yes',
            handler: () => {
              console.log('Agree clicked');
              this.photos.splice(index, 1);
            }
          }
        ]
      });
    await confirm.present();
  }


   async imageOptions() {
    const actionSheet = await this.actionSheetController.create({
      header: '',
      buttons: [{
        text: 'Open Camera',
        role: 'destructive',
        icon: 'md-camera',
        handler: () => {
                this.takePhoto();
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


  takePhoto() {
  
      const options: CameraOptions = {
        sourceType         : this.camera.PictureSourceType.CAMERA,
        destinationType    : this.camera.DestinationType.DATA_URL,
        quality            : 80,
        targetWidth        : 150,
        allowEdit:          true,
        targetHeight       : 150,
        encodingType       : this.camera.EncodingType.JPEG,
        correctOrientation : true
     }
     this.camera.getPicture(options).then((imageData) => {    
      this.base64Image = 'data:image/jpeg;base64,' + imageData;   this.photos.push(this.base64Image);
      this.picture = this.photos;
      this.picture.reverse();

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
    this.base64Image = 'data:image/jpeg;base64,' + imageData;   
      this.photos.push(this.base64Image);
      this.photos.reverse();
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
