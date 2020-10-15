import { Component, OnInit } from '@angular/core';
import { Blurb } from 'src/app/models/blurb.model';
import { BlurbRepository } from 'src/app/models/blurb.repository';

@Component({
  selector: 'app-seeblurbs',
  templateUrl: './seeblurbs.component.html',
  styleUrls: ['./seeblurbs.component.css'],
})

// Seeblurbs should let the user see all the blurbs from people they follow
// will contain infinite scrolling
export class SeeblurbsComponent implements OnInit {
  constructor(private blurbRepo: BlurbRepository) {}

  ngOnInit(): void {}

  get blurbs(): Blurb[] {
    return this.blurbRepo.getBlurbs();
  }
}
