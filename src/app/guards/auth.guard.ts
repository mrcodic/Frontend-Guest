import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivateChild } from '@angular/router';
import { UserRole } from '../data-model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public router: Router) {}
  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const token = localStorage.getItem('Alkhalditoken');
    if (token != null && !this.tokenExpired(token)) {
      return true;
    } else {
      this.router.navigateByUrl('authentication/login');
      return false;
    }
  }
  private tokenExpired(token: string) {
    const expiry = JSON.parse(atob(token.split('.')[1])).exp;
    const xx = Math.floor(new Date().getTime() / 1000);

    return Math.floor(new Date().getTime() / 1000) >= expiry;
  }
}

// admin.guard.ts
@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivateChild {
  constructor(private authGuard: AuthGuard, private router: Router) {}
  canActivateChild(): boolean {
    if (
      this.authGuard.canActivate() &&
      localStorage.getItem('AlkhaldiRole') == UserRole.ADMIN
    ) {
      return true;
    } else {
      this.router.navigate(['authentication/login']); // Redirect to home or unauthorized page
      return false;
    }
  }
}

// author.guard.ts
@Injectable({
  providedIn: 'root',
})
export class AuthorGuard implements CanActivateChild {
  constructor(private authGuard: AuthGuard, private router: Router) {}

  canActivateChild(): boolean {
    if (
      this.authGuard.canActivate() &&
      localStorage.getItem('AlkhaldiRole') == UserRole.AUTHOR
    ) {
      return true;
    } else {
      this.router.navigate(['authentication/login']); // Redirect to home or unauthorized page
      return false;
    }
  }
}
