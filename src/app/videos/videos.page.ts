import { UserService } from './../api/user.service';
import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: "app-videos",
  templateUrl: "./videos.page.html",
  styleUrls: ["./videos.page.scss"]
})
export class VideosPage implements OnInit {
  apiData:any=[];
  constructor(private userservice:UserService, public sanitizer: DomSanitizer) {}
  ngOnInit() {
    this.getVideos();
  }
  getVideos(){
    this.userservice.presentLoading();
    this.userservice.getvideos().subscribe((data:any=[])=>{
      this.userservice.loadingDismiss();

      for(let i =0;i<data.videos.length;i++){
        this.apiData.push(data.videos[i]);
     
      }   
     
      
    });
  }
  videoUrl(index1){
    return this.sanitizer.bypassSecurityTrustResourceUrl( this.apiData[index1].tbl_video_name + "?rel=0&showinfo=0&autohide=1");
  }
}
