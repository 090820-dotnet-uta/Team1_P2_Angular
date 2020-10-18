import { Component, OnInit } from '@angular/core';
import { Blurb } from 'src/app/models/blurb.model';
import { BlurbRepository } from 'src/app/models/blurb.repository';
import { User } from 'src/app/models/user.model';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.css'],
})
export class ViewuserComponent implements OnInit {
  user: User;
  blurbsByUserArr = [];

  moment = moment;

  constructor(
    private blurbRepo: BlurbRepository,
    private router: ActivatedRoute
  ) {
    this.router.params.subscribe((p) => {
      this.blurbRepo
        .getBlurbsByUser(p['id'])
        .subscribe((b) => (this.blurbsByUserArr = b));
    });
  }

  ngOnInit(): void {}
}
