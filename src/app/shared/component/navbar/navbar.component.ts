import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly router: Router
  ) {
    this.isAuthenticated = this.authenticationService.isLoggedIn();
  }

  public handleLogout() {
    this.authenticationService.logout();
    this.isAuthenticated = false;
    this.router.navigateByUrl('/auth');
  }

  ngOnInit(): void {}
}
