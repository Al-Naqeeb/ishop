import { AuthService } from './../auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  appUser: any;

  constructor(private auth : AuthService) {
    auth.appUser$.subscribe(appUser => this.appUser = appUser)
   }

 
  logout(){
    this.auth.logout();
  }
}
