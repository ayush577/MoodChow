import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { ClientorderPage } from './clientorder.page';

const routes: Routes = [
  {
    path: '',
    component: ClientorderPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),HttpClientModule
  ],
  declarations: [ClientorderPage]
})
export class ClientorderPageModule {}
