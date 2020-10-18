import { Component, OnInit } from '@angular/core';
import { Blurb } from 'src/app/models/blurb.model';
import { BlurbRepository } from 'src/app/models/blurb.repository';
import { User } from 'src/app/models/user.model';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRepository } from 'src/app/models/user.repository';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.css'],
})
export class ViewuserComponent implements OnInit {
  user: User;
  currentUser: User = JSON.parse(localStorage.loggedInUser);
  blurbsByUserArr = [];

  moment = moment;

  constructor(
    private blurbRepo: BlurbRepository,
    private userRepo: UserRepository,
    private router: ActivatedRoute
  ) {
    this.router.params.subscribe((p) => {
      this.blurbRepo
        .getBlurbsByUser(p['id'])
        .subscribe((b) => (this.blurbsByUserArr = b));
    });
    
    this.router.params.toPromise().then(p => this.user.userId = p['id'])
  }

  ngOnInit(): void {}
}
