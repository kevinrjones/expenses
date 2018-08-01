import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authorization/authentication.service';

@Component({
  selector: 'app-auth-callback',
  templateUrl: './auth-callback.component.html',
  styleUrls: ['./auth-callback.component.scss']
})
export class AuthCallbackComponent implements OnInit {
  constructor(private authService: AuthenticationService) {}

  // todo: test
  ngOnInit() {
    this.authService.completeAuthentication();
  }
}
