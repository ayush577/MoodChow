import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { RegisteraddressPage } from './registeraddress.page';

const routes: Routes = [
  {
    path: '',
    component: RegisteraddressPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),ReactiveFormsModule,HttpClientModule
  ],
  declarations: [RegisteraddressPage]
})
export class RegisteraddressPageModule {}
