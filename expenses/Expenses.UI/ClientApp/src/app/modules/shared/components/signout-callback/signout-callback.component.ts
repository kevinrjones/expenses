import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authorization/authentication.service';

@Component({
  selector: 'app-signout-callback',
  templateUrl: './signout-callback.component.html',
  styleUrls: ['./signout-callback.component.scss']
})
export class SignoutCallbackComponent implements OnInit {
  constructor(private authService: AuthenticationService) {}

  // todo: test
  ngOnInit() {
    this.authService.completeSignout();
  }
}
