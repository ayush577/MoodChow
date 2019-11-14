import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { Location } from "@angular/common";

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {

  apidata;

  constructor(public authService:UserService,private location: Location) { 
  this.support();
  }

  ngOnInit() {
  }


    support(){
      console.log("Method Called");
      this.authService.support().subscribe((data:any)=>{
        console.log("api reponse",data);
        this.apidata = data.success.support_desc;

        
      })
      
    }

    goback() {
      this.location.back();
    }
}
