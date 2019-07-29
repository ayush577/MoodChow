import { Component, OnInit} from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { FormBuilder, FormGroup, AbstractControl , Validators } from '@angular/forms';
import { Router, ActivatedRoute} from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {

  constructor(private modalController: ModalController,
    private navParams: NavParams, private router: Router,private route: ActivatedRoute, private httpClient:HttpClient, private formBuilder: FormBuilder) { }

    filterForm: FormGroup;
    Category = 'sorttab';
    loading= false;
    submitted = false;
    data:any = {};
    filterResponse: any={};
    filterName = [];
    homeResponse: any={};
    selectValue: any ={};
    filterdata: any ={};



  ngOnInit() {


    this.filterForm = this.formBuilder.group({

      sorting : ['', Validators.required],

      filtering : ['', Validators.required]

    });

    this.httpClient.post( environment.weburl2+ "getcategorydata", 
      { headers : { '*' : 'application/json; charset= UTF-8', 'Access-Control-Allow-Methods' : '*', 'Access-Control-Allow-Origin': '*'}})
      .subscribe(

        responseData => {

          this.filterResponse = responseData;
          console.log( this.filterResponse );

          this.filterName = this.filterResponse.categorydata;

        },
        error => {

          this.loading = false;

        },
        () => {
          this.loading = false;
        }

      )

      console.log( this.options );

  }


  checkFilter(){
    if(this.filterdata.filterCat){
        if(this.filterdata.filterCat.length>0){
          return false;
        }
        else{
          return true;
        }
    }
    else{
      return true;
    }
    
  }

  clearFilter(){
    this.filterdata.filterCat=[];
    this.filterdata.filterSot=[];
    for(let i=0;i<this.filterName.length;i++){
      this.filterName[i].checked=false;
     }
  }


  options = [
    { value: 'relevance', tbl_category_name: 'Relevance',checked:true},
    { value: 'rating', tbl_category_name: 'Rating',checked:false}
  ];

 

  segmentChanged(ev: any) {
    console.log('Segment changed', ev);
  }

  dismissPop() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }


  getsorting(){ 

     this.filterdata.filterSot = []; 
     alert( 'Its work' );
     for(let i=0;i<this.options.length;i++){
        if(this.options[i].checked==true){
            this.filterdata.filterSot.push(this.options[i].value);
        }
    } 
    console.log(this.filterdata)
  }

  getrestaurantcategorycheck(){
    this.filterdata.filterCat=[];
    for(let i=0;i<this.filterName.length;i++){
        if(this.filterName[i].checked==true){
            this.filterdata.filterCat.push(this.filterName[i].tbl_category_id);
        }
    }

   
   }


  onSubmit(){ 
      localStorage.setItem('productFilter',JSON.stringify(this.filterdata));
    
  }

  

 
}
