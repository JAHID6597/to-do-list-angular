import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { AuthenticationService } from '../../../shared/service/authentication/authentication.service';
import { SignTypeEnum } from '../enum/sign-type.enum';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.css'],
})
export class SignComponent implements OnInit {
  signType: string = SignTypeEnum.SIGNIN;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly authenticationService: AuthenticationService,
    private readonly toastService: ToastService
  ) {}

  ngOnInit(): void {
    const pathType =
      this.activatedRoute.snapshot.routeConfig?.path?.toLowerCase();
    this.signType =
      pathType === SignTypeEnum.SIGNUP
        ? SignTypeEnum.SIGNUP
        : SignTypeEnum.SIGNIN;
  }

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  public signin() {
    this.authenticationService.signIn(this.form.value).subscribe({
      next: (result) => {
        if (result.access_token) {
          this.authenticationService.setToken(result.access_token);
          this.router.navigateByUrl('/item');
        }
      },
      error: (error) => {
        console.log(error.message);
        this.toastService.error('Invalid credentials.');
      },
    });
  }

  public signup() {
    this.authenticationService.signUp(this.form.value).subscribe({
      next: (result) => {
        if (result.access_token) {
          this.router.navigateByUrl('/item');
        }
      },
      error: (error) => {
        console.log(error.message);
        this.toastService.error('Signup Failed.');
      },
    });
  }

  submit() {
    if (this.form.valid) {
      if (this.signType === SignTypeEnum.SIGNIN) {
        this.signin();
      }
      if (this.signType === SignTypeEnum.SIGNUP) {
        this.signup();
      }
    }
  }
}
