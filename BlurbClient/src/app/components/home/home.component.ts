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
  currentBlurb: Blurb;
  edit = true;
  isAddingNote: boolean = false;
  hasGottenMovie: boolean = false;
  hasFoundMovieName: boolean = true;
  canGetMoreBlurbs: boolean = true;
  apiMovie;
  filterSettingsVisible: boolean = false;
  canFetchMoreBlurbs: boolean = true;
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

    if (!localStorage.loggedInUser) {
      this.router.navigateByUrl('/login');
    }

    this.blurbEditForm = new FormGroup({
      type: new FormControl(),
      name: new FormControl('', [Validators.required]),
      score: new FormControl(null, [Validators.required]),
      message: new FormControl('', [Validators.required]),
      note: new FormControl(),
      privacyBlurb: new FormControl(),
    });

    this.blurbAddForm = new FormGroup({
      type: new FormControl(null, [Validators.required]),
      name: new FormControl('', [Validators.required]),
      score: new FormControl(null, [Validators.required]),
      message: new FormControl('', [Validators.required]),
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

  checkEditModal(e: any) {
    console.log('it happend', e.target.classList);
    if (
      [...e.target.classList].includes('modal') ||
      [...e.target.classList].includes('complete-edit')
    ) {
      console.log('closing the modal!');
      setTimeout(() => {
        this.edit = true;
      }, 300);
    }
  }

  currentBlurbModal(blurb: Blurb) {
    this.currentBlurb = blurb;
  }

  checkMovie() {
    if (this.blurbAddForm.get('type').value == 'Movie') {
      fetch(
        `https://www.omdbapi.com/?t=${
          this.blurbAddForm.get('name').value
        }&apikey=4cac9bce`
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          if (res.Response == 'True') {
            this.hasFoundMovieName = true;
            this.hasGottenMovie = true;
            this.apiMovie = res;
          } else if (res.Response == 'False') {
            this.hasGottenMovie = true;
            this.hasFoundMovieName = false;
          }
        });
    }
  }

  toggleEdit() {
    this.edit = !this.edit;
    console.log(this.currentBlurb);
    let b: Blurb = this.currentBlurb;
    this.blurbEditForm.get('name').setValue(b.name);
    this.blurbEditForm.get('message').setValue(b.message);
    this.blurbEditForm.get('score').setValue(+b.score);
    this.blurbEditForm.get('privacyBlurb').setValue(b.privacy);
    console.log(this.blurbEditForm.value);
  }

  onSubmitEdit() {
    if (this.blurbEditForm.invalid) return;
    this.edit = false;
    let loggedInUser: User = JSON.parse(localStorage.loggedInUser);
    let m: Media = {
      name: this.blurbEditForm.get('name').value,
      type: this.mediaType[this.blurbEditForm.get('type').value],
    };
    console.log('Non edited blurb', this.currentBlurb);
    let b: Blurb = this.currentBlurb;
    b.media = m;

    if (this.blurbEditForm.get('message').value) {
      console.log('message working');
      b.message = this.blurbEditForm.get('message').value;
    } else {
      console.log('message else working');
      b.message = this.currentBlurb.message;
    }

    if (this.blurbEditForm.get('score').value >= 0) {
      console.log('score working');
      b.score = +this.blurbEditForm.get('score').value;
    } else {
      console.log('score esle working');
      b.score = this.currentBlurb.score;
    }

    if (this.blurbEditForm.get('privacyBlurb').value) {
      console.log('privacy working');
      b.privacy = this.blurbPrivacy[
        this.blurbEditForm.get('privacyBlurb').value
      ];
    } else {
      console.log('privacy else working');
      b.privacy = this.currentBlurb.privacy;
    }

    b.userId = loggedInUser.userId;

    b.name = m.name;

    b.notes = [];

    console.log('Edited Blurb ', b);
    this.blurbRepo.editBlurb(this.currentBlurb);
  }

  onSubmitAdd() {
    if (this.blurbAddForm.invalid) return;
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
      this.blurbRepo
        .fullQuery(this.fullQueryObj, this.user.userId)
        .subscribe((p) => {
          this.blurbsList = p;
          console.log(`blurbs array:`, p);
        });
      // this.blurbsList.push(newBlurb);
    });
    // this.blurbsList = [];
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
      this.setSinceId(-1);
      this.fullQueryObj.updateSettings(this.sortSettings);
      this.blurbRepo
        .fullQuery(this.fullQueryObj, this.user.userId)
        .subscribe((p) => {
          this.blurbsList = p;
          console.log(`blurbs array: ${p}`);
        });
      this.canGetMoreBlurbs = true;
    }
  }

  toggleMovieFilter() {
    this.sortSettings.includeMovies = !this.sortSettings.includeMovies;
    this.fullQueryObj.updateSettings(this.sortSettings);
    this.setSinceId(-1);

    this.blurbRepo
      .fullQuery(this.fullQueryObj, this.user.userId)
      .subscribe((p) => {
        this.blurbsList = p;
        console.log(`blurbs array: ${p}`);
      });
    this.canGetMoreBlurbs = true;
  }

  toggleGamesFilter() {
    this.sortSettings.includeGames = !this.sortSettings.includeGames;
    this.fullQueryObj.updateSettings(this.sortSettings);
    this.setSinceId(-1);
    this.blurbRepo
      .fullQuery(this.fullQueryObj, this.user.userId)
      .subscribe((p) => {
        this.blurbsList = p;
        console.log(`blurbs array: ${p}`);
      });
    this.canGetMoreBlurbs = true;
  }

  toggleTVFilter() {
    this.sortSettings.includeTV = !this.sortSettings.includeTV;
    this.fullQueryObj.updateSettings(this.sortSettings);
    this.setSinceId(-1);
    this.blurbRepo
      .fullQuery(this.fullQueryObj, this.user.userId)
      .subscribe((p) => {
        this.blurbsList = p;
        console.log(`blurbs array: ${p}`);
      });
    this.canGetMoreBlurbs = true;
  }

  toggleBooksFilter() {
    this.sortSettings.includeBooks = !this.sortSettings.includeBooks;
    this.fullQueryObj.updateSettings(this.sortSettings);
    this.setSinceId(-1);
    this.blurbRepo
      .fullQuery(this.fullQueryObj, this.user.userId)
      .subscribe((p) => {
        this.blurbsList = p;
        console.log(`blurbs array: ${p}`);
      });
    this.canGetMoreBlurbs = true;
  }

  toggleFollowersFilter() {
    this.sortSettings.includeFollowing = !this.sortSettings.includeFollowing;
    this.fullQueryObj.updateSettings(this.sortSettings);
    this.setSinceId(-1);
    this.blurbRepo
      .fullQuery(this.fullQueryObj, this.user.userId)
      .subscribe((p) => {
        this.blurbsList = p;
        console.log(`blurbs array: ${p}`);
      });
    this.canGetMoreBlurbs = true;
  }

  toggleSelfFilter() {
    this.sortSettings.includeSelf = !this.sortSettings.includeSelf;
    this.fullQueryObj.updateSettings(this.sortSettings);
    this.setSinceId(-1);
    this.blurbRepo
      .fullQuery(this.fullQueryObj, this.user.userId)
      .subscribe((p) => {
        this.blurbsList = p;
        console.log(`blurbs array: ${p}`);
      });
    this.canGetMoreBlurbs = true;
  }

  toggleUnfollowedFilter() {
    this.sortSettings.includeUnfollowed = !this.sortSettings.includeUnfollowed;
    this.fullQueryObj.updateSettings(this.sortSettings);
    this.setSinceId(-1);
    this.blurbRepo
      .fullQuery(this.fullQueryObj, this.user.userId)
      .subscribe((p) => {
        this.blurbsList = p;
      });
    this.canGetMoreBlurbs = true;
  }

  //Sets the sinceId in the full query object to a given since Id
  //Provided that the sinceId exists in the current list of blurbs
  setSinceId(sinceId: number): boolean {
    if (Number.isInteger(sinceId)) {
      this.fullQueryObj.sinceId = sinceId;
      return true;
    }
    return false;
  }

  //Adds the next 10 blurbs to the currently loaded list
  loadBlurbs(span: number) {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      if (!this.canGetMoreBlurbs) return;
      console.log('at the bottom', this.canGetMoreBlurbs);
      // you're at the bottom of the page
      var sinceIdOk = this.setSinceId(
        this.blurbsList[this.blurbsList.length - 1].blurbId
      );
      console.log(
        `sinceId is: ${this.fullQueryObj.sinceId}, and it is: ${sinceIdOk}`
      );
      if (
        Number.isInteger(span) &&
        span > 0 &&
        sinceIdOk &&
        this.canFetchMoreBlurbs
      ) {
        this.canFetchMoreBlurbs = false;
        this.blurbRepo
          .fullQuery(this.fullQueryObj, this.user.userId)
          .subscribe((p) => {
            console.log(p);
            if (p.length === 0) {
              this.canGetMoreBlurbs = false;
            }
            this.blurbsList = this.blurbsList.concat(p);
            this.canFetchMoreBlurbs = true;
          });
      }
    }
  }
}
