import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seeblurbs',
  templateUrl: './seeblurbs.component.html',
  styleUrls: ['./seeblurbs.component.css']
})

// Seeblurbs should let the user see all the blurbs from people they follow
// will contain infinite scrolling
export class SeeblurbsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
