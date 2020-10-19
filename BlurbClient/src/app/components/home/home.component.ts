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
import { Settings } from './Settings';
import { FullQueryObj } from './FullQueryObj';
import { GetTypeIcon } from '../../StaticFunctions';
import {
  ScoreSelectedTxt,
  PrivacySelectedTxt,
  TypeSelectedTxt,
} from '../../StaticFunctions';

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
  filterSettingsVisible = false;
  blurb: FormGroup;
  blurbsList: Blurb[];
  mediaType: MediaType = new MediaType();
  blurbPrivacy: Privacy = new Privacy();
  sortSettings: Settings = new Settings(
    0, //0 is sort by most recent
    true,
    true,
    true,
    true,
    true,
    true,
    true
  );
  fullQueryObj: FullQueryObj = new FullQueryObj(this.sortSettings, -1, 10); //SinceId = -1 because -1 makes you start at the beginning
  typeSelectedTxt = TypeSelectedTxt;
  scoreSelectedTxt = ScoreSelectedTxt;
  privacySelectedTxt = PrivacySelectedTxt;

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
    this.blurbRepo
      .fullQuery(this.fullQueryObj, this.user.userId)
      .subscribe((p) => {
        this.blurbsList = p;
        console.log(`blurbs array: ${p}`);
      });
  }

  moment = moment;
  calcBkgColor = CalcBkgColor;
  getTypeIcon = GetTypeIcon;

  ngOnInit(): void {}

  get blurbs(): Blurb[] {
    return this.blurbRepo.getBlurbs();
  }

  toggleEdit() {
    this.edit = !this.edit;
  }

  onSubmit(blurb: Blurb) {
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

  //not used anymore
  toggleFilterSettingsVisible() {
    this.filterSettingsVisible = !this.filterSettingsVisible;
  }

  updateSortSetting(setting: number) {
    if (Number.isInteger(setting) && setting >= 0 && setting <= 3) {
      this.sortSettings.sortSetting = setting;
    }
    this.fullQueryObj.updateSettings(this.sortSettings);
    this.blurbRepo
      .fullQuery(this.fullQueryObj, this.user.userId)
      .subscribe((p) => {
        this.blurbsList = p;
        console.log(`blurbs array: ${p}`);
      });
  }

  toggleMovieFilter() {
    this.sortSettings.includeMovies = !this.sortSettings.includeMovies;
    this.fullQueryObj.updateSettings(this.sortSettings);
    this.blurbRepo
      .fullQuery(this.fullQueryObj, this.user.userId)
      .subscribe((p) => {
        this.blurbsList = p;
        console.log(`blurbs array: ${p}`);
      });
  }

  toggleGamesFilter() {
    this.sortSettings.includeGames = !this.sortSettings.includeGames;
    this.fullQueryObj.updateSettings(this.sortSettings);
    this.blurbRepo
      .fullQuery(this.fullQueryObj, this.user.userId)
      .subscribe((p) => {
        this.blurbsList = p;
        console.log(`blurbs array: ${p}`);
      });
  }

  toggleTVFilter() {
    this.sortSettings.includeTV = !this.sortSettings.includeTV;
    this.fullQueryObj.updateSettings(this.sortSettings);
    this.blurbRepo
      .fullQuery(this.fullQueryObj, this.user.userId)
      .subscribe((p) => {
        this.blurbsList = p;
        console.log(`blurbs array: ${p}`);
      });
  }

  toggleBooksFilter() {
    this.sortSettings.includeBooks = !this.sortSettings.includeBooks;
    this.fullQueryObj.updateSettings(this.sortSettings);
    this.blurbRepo
      .fullQuery(this.fullQueryObj, this.user.userId)
      .subscribe((p) => {
        this.blurbsList = p;
        console.log(`blurbs array: ${p}`);
      });
  }

  toggleFollowersFilter() {
    this.sortSettings.includeFollowing = !this.sortSettings.includeFollowing;
    this.fullQueryObj.updateSettings(this.sortSettings);
    this.blurbRepo
      .fullQuery(this.fullQueryObj, this.user.userId)
      .subscribe((p) => {
        this.blurbsList = p;
        console.log(`blurbs array: ${p}`);
      });
  }

  toggleSelfFilter() {
    this.sortSettings.includeSelf = !this.sortSettings.includeSelf;
    this.fullQueryObj.updateSettings(this.sortSettings);
    this.blurbRepo
      .fullQuery(this.fullQueryObj, this.user.userId)
      .subscribe((p) => {
        this.blurbsList = p;
        console.log(`blurbs array: ${p}`);
      });
  }

  toggleUnfollowedFilter() {
    this.sortSettings.includeUnfollowed = !this.sortSettings.includeUnfollowed;
    this.fullQueryObj.updateSettings(this.sortSettings);
    this.blurbRepo
      .fullQuery(this.fullQueryObj, this.user.userId)
      .subscribe((p) => {
        this.blurbsList = p;
      });
  }

  //Adds the next 10 blurbs to the currently loaded list
  loadNextBlurbs(span: number) {
    if (Number.isInteger(span) && span > 0) {
      this.blurbRepo
        .fullQuery(this.fullQueryObj, this.user.userId)
        .subscribe((p) => {
          this.blurbsList = this.blurbsList.concat(p);
        });
    }
  }
}
