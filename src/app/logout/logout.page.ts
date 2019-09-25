import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    localStorage.removeItem('loginUser');
    localStorage.removeItem('RestaurantId');

    // localStorage.clear();
    
    this.router.navigate(['/login']);

  }

}
