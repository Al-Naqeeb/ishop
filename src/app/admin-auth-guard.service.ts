import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { map,switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth : AuthService, private router : Router) {}
  canActivate():Observable<boolean>{
    
    return this.auth.appUser$.pipe(map(user => user.isAdmin ==='true'));
    
  }
}
