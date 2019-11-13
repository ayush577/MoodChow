import { UserService } from "./../api/user.service";
import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { Location } from "@angular/common";

@Component({
  selector: "app-videos",
  templateUrl: "./videos.page.html",
  styleUrls: ["./videos.page.scss"]
})
export class VideosPage implements OnInit {
  apiData: any = [];
  constructor(
    private userservice: UserService,
    public sanitizer: DomSanitizer,
    private location: Location
  ) {}
  ngOnInit() {
    this.getVideos();
  }
<<<<<<< HEAD
  getVideos(){
    
    this.userservice.getvideos().subscribe((data:any=[])=>{
      
=======

  goback() {
    this.location.back();
  }

  getVideos() {
    this.userservice.presentLoading();
    this.userservice.getvideos().subscribe((data: any = []) => {
      this.userservice.loadingDismiss();
>>>>>>> 11c9c09c92a7dc858cb3a712af17e740f92d27d3

      for (let i = 0; i < data.videos.length; i++) {
        this.apiData.push(data.videos[i]);
<<<<<<< HEAD
     
      }   

      
     
      
=======
      }
>>>>>>> 11c9c09c92a7dc858cb3a712af17e740f92d27d3
    });
    
  }
<<<<<<< HEAD
  videoUrl(index1){
    
    return this.sanitizer.bypassSecurityTrustResourceUrl( this.apiData[index1].tbl_video_name + "?rel=0&showinfo=0&autohide=1");
    
=======
  videoUrl(index1) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      this.apiData[index1].tbl_video_name + "?rel=0&showinfo=0&autohide=1"
    );
>>>>>>> 11c9c09c92a7dc858cb3a712af17e740f92d27d3
  }
}
