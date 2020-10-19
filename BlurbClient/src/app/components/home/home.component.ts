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
  isAddingNote: boolean = false;
  filterSettingsVisible = false;
  blurbEditForm: FormGroup;
  blurbAddForm: FormGroup;
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
    this.user = localStorage.loggedInUser
      ? JSON.parse(localStorage.loggedInUser)
      : {};
    this.blurbEditForm = new FormGroup({
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

    this.blurbAddForm = new FormGroup({
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
        console.log(`blurbs array:`, p);
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

  onSubmitEdit(blurb: Blurb) {
    this.edit = false;
    let loggedInUser: User = JSON.parse(localStorage.loggedInUser);
    let m: Media = {
      name: this.blurbEditForm.get('name').value,
      type: this.mediaType[this.blurbEditForm.get('type').value],
    };
    let b: Blurb = blurb;
    b.media = m;
    b.message = this.blurbEditForm.get('message').value;
    b.score = +this.blurbEditForm.get('score').value;
    b.privacy = this.blurbPrivacy[this.blurbEditForm.get('privacyBlurb').value];
    b.userId = loggedInUser.userId;
    b.name = m.name;
    b.notes = [];

    console.log(b, this.blurbPrivacy.Public);

    this.blurbRepo.editBlurb(b);
  }

  onSubmitAdd() {
    let loggedInUser: User = JSON.parse(localStorage.loggedInUser);
    let m: Media = {
      name: this.blurbAddForm.get('name').value,
      type: this.mediaType[this.blurbAddForm.get('type').value],
    };
    let b: Blurb = {
      message: this.blurbAddForm.get('message').value,
      score: +this.blurbAddForm.get('score').value,
      privacy: this.blurbPrivacy[this.blurbAddForm.get('privacyBlurb').value],
      name: m.name,
      userId: loggedInUser.userId,
      media: m,
      notes: this.isAddingNote ? this.blurbAddForm.get('note').value : [],
    };

    console.log(b, this.blurbPrivacy.Public);

    this.blurbRepo.addBlurb(b).subscribe((newBlurb) => {
      console.log(newBlurb);
      this.blurbsList.push(newBlurb);
    });

    this.ngOnInit();
  }

  onDelete(blurb: Blurb) {
    console.log('Trying to delete: ', blurb);
    if (blurb.userId == this.user.userId)
      this.blurbRepo.deleteBlurb(blurb.blurbId).subscribe((p) => {
        console.log(`Delete succeeded: ${p}`);
        if (p) {
          this.blurbsList = this.blurbsList.filter(
            (b) => b.blurbId != blurb.blurbId
          );
        }
      });
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

  //Sets the sinceId in the full query object to a given since Id
  //Provided that the sinceId exists in the current list of blurbs
  setSinceId(sinceId: number): boolean {
    if (
      Number.isInteger(sinceId) &&
      this.blurbsList.map((a) => a.userId).includes(sinceId)
    ) {
      this.fullQueryObj.sinceId = sinceId;
      return true;
    }
    return false;
  }

  //Adds the next 10 blurbs to the currently loaded list
  loadBlurbs(span: number) {
    var sinceIdOk = this.setSinceId(
      this.blurbsList[this.blurbsList.length - 1].userId
    );
    if (Number.isInteger(span) && span > 0 && sinceIdOk) {
      this.blurbRepo
        .fullQuery(this.fullQueryObj, this.user.userId)
        .subscribe((p) => {
          this.blurbsList = this.blurbsList.concat(p);
        });
    }
  }
}
