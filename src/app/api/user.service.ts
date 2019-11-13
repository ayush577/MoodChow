import { Injectable } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class UserService {
  isLoading;
  apiUrl = "https://dev.hawkscode.com.au/moodchow/Webservice";
<<<<<<< HEAD

  constructor(private http: HttpClient,public loadingController: LoadingController) { }
=======
>>>>>>> 11c9c09c92a7dc858cb3a712af17e740f92d27d3

  constructor(
    private http: HttpClient,
    public loadingController: LoadingController
  ) {}

  async presentLoading() {
    //Loding Controller Start
    this.isLoading = true;
    return await this.loadingController
      .create({
        spinner: "crescent",
        // message: '<div class="loading"><img src="../../assets/loading.gif"></div>',
        mode: "md",
        cssClass: "custom-loading"
      })
      .then(a => {
        a.present();
      });
  }

  async loadingDismiss() {
    console.log("LOginf------");
    
    this.isLoading = false;
    return await this.loadingController
      .dismiss()
      .then(() => console.log("dismissed"));
  } // End Loding Controlller

  getvideos() {
    return this.http.post(`${this.apiUrl}/getallvideos`, {});
  }
}
