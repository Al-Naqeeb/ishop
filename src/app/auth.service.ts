import { AngularFireObject } from '@angular/fire/compat/database';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase/auth';
import { AppUser } from './models/app-user';
import { map,switchMap, } from 'rxjs/operators';
import {of} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$:Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private userService : UserService, 
    private router : Router){
    this.user$ = afAuth.authState;
   }
  login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.signInWithRedirect(new firebase.GoogleAuthProvider());  
  }
  logout(){
    this.afAuth.signOut().then(r => this.router.navigate(['/']) );
  }
  get appUser$() : Observable<any> {
    return this.user$
    .pipe(switchMap(user => {
      if(user)
      return this.userService.get(user.uid).valueChanges();

      return of(null);
    }));
  }
}
