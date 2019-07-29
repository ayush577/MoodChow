import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { EdituserprofilePage } from './edituserprofile.page';

const routes: Routes = [
  {
    path: '',
    component: EdituserprofilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),ReactiveFormsModule,HttpClientModule
  ],
  declarations: [EdituserprofilePage]
})
export class EdituserprofilePageModule {}
