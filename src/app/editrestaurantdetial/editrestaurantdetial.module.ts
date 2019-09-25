import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { Camera } from '@ionic-native/camera/ngx';

import { EditrestaurantdetialPage } from './editrestaurantdetial.page';

const routes: Routes = [
  {
    path: '',
    component: EditrestaurantdetialPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),ReactiveFormsModule,HttpClientModule
  ],
  providers: [
    Camera
  ],
  declarations: [EditrestaurantdetialPage]
})
export class EditrestaurantdetialPageModule {}
