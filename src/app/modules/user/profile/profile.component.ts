import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IUser, IUserUpdate } from '../interface/user.interface';
import { UserService } from '../../../shared/service/user/user.service';
import { lastValueFrom } from 'rxjs';
import { ToastService } from 'angular-toastify';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  error: string = '';
  userProfile: IUser | undefined;
  constructor(
    private readonly userService: UserService,
    private readonly toastService: ToastService
  ) {}

  async ngOnInit(): Promise<void> {
    this.userProfile = await this.getAuthUser();

    this.form = new FormGroup({
      firstname: new FormControl(this.userProfile.firstname),
      lastname: new FormControl(this.userProfile.lastname),
      username: new FormControl(this.userProfile.username),
      oldPassword: new FormControl(''),
      newPassword: new FormControl(''),
      isActive: new FormControl(this.userProfile.isActive),
    });

    if (this.form.value.newPassword && this.form.value.oldPassword) {
      this.error = '';
    }
  }

  form: FormGroup = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    username: new FormControl(''),
    oldPassword: new FormControl(''),
    newPassword: new FormControl(''),
    isActive: new FormControl(''),
  });

  changeOldPassword() {
    if ((this.form.value.newPassword && this.form.value.oldPassword) ||
        (!this.form.value.newPassword && !this.form.value.oldPassword) ||
        this.form.value.oldPassword) {
      this.error = '';
    } else {
      this.error = 'For updating password must fill up passwords filled.';
    }
  }

  changeNewPassword() {
    if ((this.form.value.newPassword && this.form.value.oldPassword) ||
        (!this.form.value.newPassword && !this.form.value.oldPassword) ||
        this.form.value.oldPassword) {
      this.error = '';
    } else {
      this.error = 'For updating password must fill up passwords filled.';
    }
  }

  submit() {
    if (this.form.valid) {
      if (
        (this.form.value.newPassword && this.form.value.oldPassword) ||
        (!this.form.value.newPassword && !this.form.value.oldPassword) ||
        this.form.value.oldPassword
      ) {
        this.updateUser();
        this.error = '';
      } else {
        this.error = 'For updating password must fill up passwords filled.';
      }
    }
  }

  public async getAuthUser(): Promise<IUser> {
    return await lastValueFrom(this.userService.getAuthUser());
  }

  public updateUser() {
    this.userService.updateUser(this.form.value).subscribe({
      next: (result) => {
        if (result) {
          this.toastService.success('Successfully updated profile.');
        }
      },
      error: (error) => {
        console.log(error.message);
        this.toastService.error('Failed to updated profile.');
      },
    });
  }
}
