import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

// Navebar should contain links to 
// useredit page, logout, search, and see blurbs
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
