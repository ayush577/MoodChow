import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { RestaurantmenuPage } from './restaurantmenu.page';

const routes: Routes = [
  {
    path: '',
    component: RestaurantmenuPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),HttpClientModule
  ],
  declarations: [RestaurantmenuPage]
})
export class RestaurantmenuPageModule {}
