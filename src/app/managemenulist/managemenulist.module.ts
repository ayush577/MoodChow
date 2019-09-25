import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';

import { ManagemenulistPage } from './managemenulist.page';

const routes: Routes = [
  {
    path: '',
    component: ManagemenulistPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),HttpClientModule
  ],
  declarations: [ManagemenulistPage]
})
export class ManagemenulistPageModule {}
