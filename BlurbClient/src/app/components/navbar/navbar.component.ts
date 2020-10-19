import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import { Blurb } from 'src/app/models/blurb.model';
import { BlurbRepository } from 'src/app/models/blurb.repository';
import { Media } from 'src/app/models/media.model';
import { MediaType } from 'src/app/models/mediatype.model';
import { Privacy } from 'src/app/models/privacy.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

// Navebar should contain links to
// useredit page, logout, search, and see blurbs
export class NavbarComponent implements OnInit {
  isAuthenticated: boolean;
  blurb: FormGroup;
  mediaType: MediaType = new MediaType();
  blurbPrivacy: Privacy = new Privacy();
  user: User = JSON.parse(localStorage.loggedInUser);

  constructor(
    public oktaAuth: OktaAuthService,
    public router: Router,
    private blurbRepo: BlurbRepository
  ) {
    // Subscribe to authentication state changes
    this.oktaAuth.$authenticationState.subscribe(
      (isAuthenticated: boolean) => (this.isAuthenticated = isAuthenticated)
    );
    this.blurb = new FormGroup({
      type: new FormControl(),
      name: new FormControl(),
      score: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(2),
      ]),
      message: new FormControl(),
      note: new FormControl(),
      privacyBlurb: new FormControl(),
    });
  }

  async ngOnInit() {
    // Get the authentication state for immediate use
    this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    let user: User = JSON.parse(localStorage.loggedInUser);

    this.blurb.get('message').setValue(user.name);
  }

  onSubmit() {
    let loggedInUser: User = JSON.parse(localStorage.loggedInUser);
    let m: Media = {
      name: this.blurb.get('name').value,
      type: this.mediaType[this.blurb.get('type').value],
    };
    let b: Blurb = {
      message: this.blurb.get('message').value,
      score: +this.blurb.get('score').value,
      privacy: this.blurbPrivacy[this.blurb.get('privacyBlurb').value],
      name: m.name,
      userId: loggedInUser.userId,
      media: m,
      notes: [],
    };

    console.log(b, this.blurbPrivacy.Public);

    this.blurbRepo.addBlurb(b);
  }

  // This should take in the user's id (Maybe in cookies?)
  // Uses the id to redirect them to the edit user page
  // Or the see user page
  RedirectProfile() {
    console.log('Not Implemented!');
  }

  // This should take in the user's list of followed users
  // and redirect them to the seeblurbs page
  RedirectBlurbs() {
    console.log('Not Implemented!');
  }

  // This should take in the user's input and search
  // the movie names for the blurbs or the users
  // Maybe split this into search users vs search
  // blurbs?
  SearchBlurb() {
    console.log('Not Implemented!');
  }
}
