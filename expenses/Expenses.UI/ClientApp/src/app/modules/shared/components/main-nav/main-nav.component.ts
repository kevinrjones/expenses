import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authorization/authentication.service';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  public isLoggedIn: boolean;

  ngOnInit() {
    this.isAuthenticated();
  }

  isAuthenticated() {
    this.authenticationService.isLoggedIn().subscribe(res => {
      this.isLoggedIn = res;
    });
  }

  signout() {
    this.localStorageService.setItem('path_redirect', 'home');
    this.authenticationService.startSignout().subscribe(res => this.isAuthenticated());
  }

  signin() {
    this.localStorageService.setItem('path_redirect', 'home');
    this.authenticationService.startAuthentication().subscribe(res => this.isAuthenticated());
  }
  isActiveLink(link: string): boolean {
    return this.router.isActive(link, true);
  }
}
