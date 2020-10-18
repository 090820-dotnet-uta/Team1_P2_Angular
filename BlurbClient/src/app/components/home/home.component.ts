import { Component, OnInit } from '@angular/core';
import { Blurb } from '../../models/blurb.model';
import { BlurbRepository } from '../../models/blurb.repository';
import { CalcBkgColor } from '../../StaticFunctions';
import * as moment from 'moment';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Media } from 'src/app/models/media.model';
import { Privacy } from 'src/app/models/privacy.model';
import { MediaType } from 'src/app/models/mediatype.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

// home should let the user see all the blurbs from people they follow
// will contain infinite scrolling
export class HomeComponent implements OnInit {
  user: User;
  edit = true;
  blurb: FormGroup;
  mediaType: MediaType = new MediaType();
  blurbPrivacy: Privacy = new Privacy();

  constructor(private blurbRepo: BlurbRepository, private router: Router) {
    this.user = JSON.parse(localStorage.loggedInUser);
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

  moment = moment;
  calcBkgColor = CalcBkgColor;

  ngOnInit(): void {}

  get blurbs(): Blurb[] {
    return this.blurbRepo.getBlurbs();
  }

  toggleEdit(){
    this.edit = !this.edit;
  }

  onSubmit(blurb: Blurb){
    let loggedInUser: User = JSON.parse(localStorage.loggedInUser);
    let m: Media = {
      name: this.blurb.get('name').value,
      type: this.mediaType[this.blurb.get('type').value],
    };
    let b: Blurb = blurb;
    b.media = m;
    b.message = this.blurb.get('message').value;
    b.score = +this.blurb.get('score').value;
    b.privacy = this.blurbPrivacy[this.blurb.get('privacyBlurb').value];
    b.userId = loggedInUser.userId;
    b.name = m.name;
    b.notes = [];

    console.log(b, this.blurbPrivacy.Public);
    
    this.blurbRepo.editBlurb(b);
  }
}
