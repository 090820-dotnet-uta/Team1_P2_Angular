import { Component, OnInit } from '@angular/core';
import { Blurb } from '../../models/blurb.model';
import { BlurbRepository } from '../../models/blurb.repository';
import * as moment from 'moment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

// home should let the user see all the blurbs from people they follow
// will contain infinite scrolling
export class HomeComponent implements OnInit {
  constructor(private blurbRepo: BlurbRepository) {}

  moment = moment;

  ngOnInit(): void {}

  get blurbs(): Blurb[] {
    return this.blurbRepo.getBlurbs();
  }
}
