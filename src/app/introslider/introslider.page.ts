import { Component, OnInit, ViewChild } from '@angular/core';

import {IonSlides} from '@ionic/angular';

import { Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-introslider',
  templateUrl: './introslider.page.html',
  styleUrls: ['./introslider.page.scss'],
})
export class IntrosliderPage implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;

  skipMsg: string = "Skip";
  data:any ={}
  apiData:any=[];

  apiUrl="https://dev.hawkscode.com.au/moodchow/Webservice/getappwalkthrough";

  constructor(private router: Router,private http: HttpClient) { }

  ngOnInit() {

    this.http.post(`${this.apiUrl}`,{})
      .subscribe( 

        (responseData:any) => {

          
          // this.apiData = JSON.stringify(responseData);
          
          this.apiData = responseData.success;
          console.log("API Response",this.apiData);
          console.log("APIdata", this.apiData[0].imageurl);
          console.log(this.apiData.length);
          
          
          
        
          

          
          

        }
       
      )



    this.data.userid = localStorage.getItem('loginUser');

    this.data.introforuser = localStorage.getItem('introForUser')

    if(this.data.userid && this.data.introforuser){
      
      this.router.navigate(['/home']);

    } else if( this.data.introforuser ) {

      this.router.navigate(['/login']);

    }

    localStorage.setItem('introForUser','true');

  }

  skip(){
    this.router.navigate(['/login'])
  }

  slideChange(){

    // if( this.slides.isEnd()){
    //   this.skipMsg = "Alright, I Got it"
    // }

  }

  theEnd(){
    this.router.navigate(['/login'])
  }

}
