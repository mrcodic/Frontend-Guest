import { Component, OnInit } from '@angular/core';
import { delay } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from '../../../service/loading.service';
import { Router } from '@angular/router';
import {
  AuthRoles,
  ILoginRequest,
  LoginRequest,
} from '../../../data-model/authentication.model';
import { AuthenticationService } from '../../../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public show: boolean = false;
  public loginForm: FormGroup;
  title = 'angular-boilerplate';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private authService: AuthenticationService,
    private _loading: LoadingService
  ) {
    const userData = localStorage.getItem('user');
    // if (userData?.length != null) {
    //   router.navigate(['/authentication/adminpanel']);
    // }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  ngOnInit() {
    this.listenToLoading();
  }

  /**
   * Listen to the loadingSub property in the LoadingService class. This drives the
   * display of the loading spinner.
   */
  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
      });
  }
  showPassword() {
    this.show = !this.show;
  }

  // Simple Login
  // login() {
  //   if (
  //     this.loginForm.value['email'] == 'Test@gmail.com' &&
  //     this.loginForm.value['password'] == 'test123'
  //   ) {
  //     let user = {
  //       email: 'Test@gmail.com',
  //       password: 'test123',
  //       name: 'test user',
  //     };

  //     localStorage.setItem('user', JSON.stringify(user));
  //     this.router.navigate(['/authentication/adminpanel']);
  //   }
  // }
  login() {
    let loginData: ILoginRequest = new LoginRequest();
    loginData.password = this.loginForm.value.password;
    loginData.email = this.loginForm.value.email;
    if (this.loginForm.valid) {
      this.authService.login(loginData).subscribe((res) => {
        if (res?.result?.token) {
          this.authService.handleAuthData(
            res.result.token,
            res.result.user._id,
            res.result.user.userName,
            res.result.user.role,
            res.result.user.image
          );
          localStorage.getItem('AlkhaldiRole') == AuthRoles.ADMIN
            ? this.router.navigate(['/authentication/adminpanel/dashboard'])
            : localStorage.getItem('AlkhaldiRole') == AuthRoles.AUTHOR
            ? this.router.navigate(['/authentication/authorpanel/all-blogs'])
            : null;
        }
      });
    }
  }
}
