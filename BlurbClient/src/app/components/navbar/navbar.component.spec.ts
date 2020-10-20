import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule, By } from '@angular/platform-browser';
import { Routes, RouterModule, RouterLink, RouterLinkWithHref, Router } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { BlurbRepository } from 'src/app/models/blurb.repository';
import { MediaRepository } from 'src/app/models/media.repository';
import { MediaTagRepository } from 'src/app/models/mediatag.repository';
import { NoteRepository } from 'src/app/models/note.repository';
import { TagRepository } from 'src/app/models/tag.repository';
import { UserRepository } from 'src/app/models/user.repository';
import { BlurbService } from 'src/app/services/blurb.service';
import { MediaService } from 'src/app/services/media.service';
import { MediaTagService } from 'src/app/services/mediatag.service';
import { NoteService } from 'src/app/services/note.service';
import { TagService } from 'src/app/services/tag.service';
import { UserService } from 'src/app/services/user.service';
import { FollowersComponent } from '../followers/followers.component';
import { HomeComponent } from '../home/home.component';
import { LandingComponent } from '../landing/landing.component';
import { LoginComponent } from '../login/login.component';
import { SignupComponent } from '../signup/signup.component';
import { UserComponent } from '../user/user.component';
import { ViewuserComponent } from '../viewuser/viewuser.component';
import { RouterTestingModule } from '@angular/router/testing';

import { NavbarComponent } from './navbar.component';
import { RouterLinkDirectiveStub } from '../testing/router-link-directive-stub';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    const appRoutes: Routes = [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
    ];

    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        UserComponent,
        NavbarComponent,
        LoginComponent,
        SignupComponent,
        HomeComponent,
        LandingComponent,
        FollowersComponent,
        ViewuserComponent,
      ],
      imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes),
        MatIconModule,
      ],
      providers: [
        UserService,
        UserRepository,
        BlurbService,
        BlurbRepository,
        MediaService,
        MediaRepository,
        MediaTagService,
        MediaTagRepository,
        TagService,
        TagRepository,
        NoteService,
        NoteRepository,
      ],
    }).compileComponents().then(() => {
      fixture = TestBed.createComponent(NavbarComponent);
      component = fixture.componentInstance;});
  });

  it('Routerlinks', () => {
    expect(component).toBeTruthy();
  });
});
