import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserService } from '../api/user.service';
import { SupportPage } from '../support/support.page';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.page.html',
  styleUrls: ['./aboutus.page.scss'],
})
export class AboutusPage implements OnInit {
  apidata;

  constructor(private location: Location, public authService:UserService) {
   

    this.aboutus();
   }

  ngOnInit() {
  }
  goback() {
    this.location.back();
  }
  aboutus(){
    this.authService.aboutus().subscribe((data:any)=>{
      console.log("api reponse",data.success.about_desc);
      this.apidata = data.success.about_desc;

      
    })
  }
}
