import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormControl } from "@angular/forms";
import { debounceTime } from "rxjs/operators";
import { Location } from '@angular/common';
import { environment } from '../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Router,ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  items: any = [];
  searchTerm: string = "";
  // itemsGet: any;
  searchControl: FormControl;
  searching: any = false;
  temp;

  searchResponse: any = {};
  searchData: any = [];
  



  constructor( public navCtrl: NavController,private location :Location,private router: Router,private httpClient:HttpClient,private route: ActivatedRoute ) { 

    this.getArrayRestaurant();
    this.searchControl = new FormControl();

  }

  ngOnInit() {

    

  }

  goback()
    {
      this.location.back();
    }

  filterItems(searchTerm) {

    console.log( 'FilterItems', searchTerm );

    return this.items.filter(item => {

      return item.tbl_restaurant_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
      
    });

  }


  ionViewWillEnter() {
    
    // this.setFilteredItems();

    this.searchControl.valueChanges.pipe(debounceTime(700)).subscribe(search => {

      console.log( search );

      this.searching = false;
      this.setFilteredItems(search);

      console.log( search );

  });


}

onSearchInput(){
    this.searching = true;
}

setFilteredItems(item) {

 this.temp= this.items;
  this.temp = this.filterItems(item);
  console.log( this.items );
  


}


getArrayRestaurant(){

  this.searching = true;

  this.httpClient.post( environment.weburl+ "showrestaurantlistonsearch", { headers: {'Content-Type' : 'application/json; charset= UTF-8', 'Access-Control-Allow-Methods' : '*'}})

  .subscribe(

    responseData => {

      this.searchResponse = responseData;
      console.log( this.searchResponse );

      // this. = this.searchResponse.menusdata;

      this.searchData = this.searchResponse.showrestaurantlistonsearch;
      console.log( this.searchData );

      this.items = this.searchData;
      console.log( 'Hh', this.items );

      this.temp= this.items;
      console.log( 'temp', this.temp );

      this.searching = false;

    },
     error => {

        this.searching = false;

    },
    () => {

      this.searching = false;

    }

  )


}






}
