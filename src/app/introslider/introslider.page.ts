import { Component, OnInit, ViewChild } from '@angular/core';

import {IonSlides} from '@ionic/angular';

import { Router } from '@angular/router';

@Component({
  selector: 'app-introslider',
  templateUrl: './introslider.page.html',
  styleUrls: ['./introslider.page.scss'],
})
export class IntrosliderPage implements OnInit {

  @ViewChild(IonSlides) slides: IonSlides;

  skipMsg: string = "Skip";

  constructor(private router: Router) { }

  ngOnInit() {

    if(localStorage.getItem('introForUser')){
        this.router.navigate(['/login'])
    }

    localStorage.setItem('introForUser','true');




  }

  skip(){
    this.router.navigate(['/login'])
  }

  slideChange(){

    // if( this.slides.isEnd()){
    //   this.skipMsg = "Alright, I Got it"
    // }

  }

  theEnd(){
    this.router.navigate(['/login'])
  }

}
