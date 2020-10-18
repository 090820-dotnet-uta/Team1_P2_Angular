import { Component, OnInit } from '@angular/core';
import { Blurb } from 'src/app/models/blurb.model';
import { BlurbRepository } from 'src/app/models/blurb.repository';
import { User } from 'src/app/models/user.model';
import * as moment from 'moment';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.css'],
})
export class ViewuserComponent implements OnInit {
  user: User;
  blurbsByUserArr = [];

  moment = moment;

  constructor(private blurbRepo: BlurbRepository) {
    this.blurbRepo
      .getBlurbsByUser(1)
      .subscribe((b) => (this.blurbsByUserArr = b));
  }

  ngOnInit(): void {}
}
