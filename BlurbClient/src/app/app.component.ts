import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  user: User;

  constructor(public router: Router) {
    
  }

  async ngOnInit() {
   
  }
}
