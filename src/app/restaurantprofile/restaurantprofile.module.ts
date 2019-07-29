import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { RestaurantprofilePage } from './restaurantprofile.page';

const routes: Routes = [
  {
    path: '',
    component: RestaurantprofilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),HttpClientModule
  ],
  declarations: [RestaurantprofilePage]
})
export class RestaurantprofilePageModule {

 

}
