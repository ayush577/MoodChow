import { Component, OnInit } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { PickerOptions, PickerButton } from '@ionic/core';

import { Router,ActivatedRoute} from "@angular/router";
import { FormBuilder, FormGroup, AbstractControl , Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { ToastController } from '@ionic/angular';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-timemanage',
  templateUrl: './timemanage.page.html',
  styleUrls: ['./timemanage.page.scss'],
})
export class TimemanagePage implements OnInit {

  timeForm: FormGroup;
  loading= false;
  submitted = false;
  framework = '';
  selected = ['','',''];
  data: any ={};
  date : any ={};
  displayDateStart : any ={};
  displayDateEnd : any ={};
  messageResponseData: any ={};
  isToggled: boolean;
  timeerrorsmsg='';
  

  constructor(private pickerCtrl: PickerController,public toastController: ToastController,private router: Router,private formBuilder: FormBuilder,private route: ActivatedRoute,private httpClient:HttpClient) {  

  }

  ngOnInit() {

    this.data.userid=localStorage.getItem('loginUser');
    if(!this.data.userid){
      this.router.navigate(['/login']);
    }

    this.data.tbl_restaurant_id=localStorage.getItem('RestaurantId');
    if(!this.data.tbl_restaurant_id){
      this.router.navigate(['/addrestaurant']);
    } 

    this.timeForm = this.formBuilder.group({

      day: ['', [Validators.required]],

      opentime: [''],

      closetime: [''],

      status: ['']

  });

  this.isToggled = true;

  this.data.isToggled = true;

  }


  get f(){

    if( this.timeForm.controls.day.errors && this.timeForm.controls.day.errors.required 
                        &&
    this.timeForm.controls.opentime.errors && this.timeForm.controls.opentime.errors.required
                        &&
    this.timeForm.controls.closetime.errors && this.timeForm.controls.closetime.errors.required
      ){

        this.timeerrorsmsg="All fields are required";

      } else if(
        this.timeForm.controls.day.errors && this.timeForm.controls.day.errors.required 
      ){

        this.timeerrorsmsg="Please select day";

      } else if( 
        this.timeForm.controls.opentime.errors && this.timeForm.controls.opentime.errors.required 
      ){

        this.timeerrorsmsg="Please select opening time";

      }else if( 
        this.timeForm.controls.opentime.errors && this.timeForm.controls.opentime.errors.required 
      ){

        this.timeerrorsmsg="Please select closing time";

      }

    return this.timeForm.controls;

  }



  // async showBasicPicker() {
  //   let opts: PickerOptions = {
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         role: 'cancel'
  //       },
  //       {
  //         text: 'Done'
  //       }
  //     ],
  //     columns: [
  //       {
  //         name: 'framework',
  //         options: [
  //           { text: 'Sunday', value: 'sunday' },
  //           { text: 'Monday', value: 'monday' },
  //           { text: 'Tuesday', value: 'tuesday' },
  //           { text: 'Wednesday', value: 'wednesday' },
  //           { text: 'Thursday', value: 'thursday' },
  //           { text: 'Friday', value: 'friday' },
  //           { text: 'Saturday', value: 'saturday' },
  //         ]
  //       }
  //     ]
  //   };
  //   let picker = await this.pickerCtrl.create(opts);
  //   picker.present();
  //   picker.onDidDismiss().then(async data => {
  //     let col = await picker.getColumn('framework');
  //     this.framework = col.options[col.selectedIndex].text;
  //   });
  // }

  changeCheckOutStartTime(){
 /* this.displayDateStart = new Date('displaydatestart').toISOString()
  console.log( this.displayDateStart );*/
  }

  changeCheckOutStartEnd(){
   /*this.displayDateEnd = new Date('2017-01-01').toISOString()
    console.log( this.displayDateEnd ); */
    }

  notify() {

      console.log("Toggled: "+ this.isToggled);

    }

    // https://dev.hawkscode.com.au/moodchow/Websrvices/gettimedata
  
    onSubmit(){

      this.submitted = true;

      if( this.timeForm.invalid ){

        return;

      }

      this.loading = true;

      this.httpClient.post( environment.weburl2+ "gettimedata", this.data, { headers: {'Content-Type' : 'application/json; charset= UTF-8', 'Access-Control-Allow-Methods' : '*'}})
      
      .subscribe(

        responseData => {

          this.date = responseData;
          console.log( this.date );

          if( this.date.status == 200 ){
            
            this.messageResponseData.msg = this.date.success;
            this.timemessage();
              this.timeForm.reset();

          } else if( this.date.status == 400 ) {

            this.messageResponseData.msg = this.date.error;
            this.timemessage();

          }

        }

      )

    }


    async timemessage(){

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
