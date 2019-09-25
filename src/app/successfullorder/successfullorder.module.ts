import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { SuccessfullorderPage } from './successfullorder.page';

const routes: Routes = [
  {
    path: '',
    component: SuccessfullorderPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),HttpClientModule
  ],
  declarations: [SuccessfullorderPage]
})
export class SuccessfullorderPageModule {}
