import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { AppRoutingModule } from '../app-routing.module';
import { AppComponent } from '../app.component';
import { FollowersComponent } from '../components/followers/followers.component';
import { HomeComponent } from '../components/home/home.component';
import { LandingComponent } from '../components/landing/landing.component';
import { LoginComponent } from '../components/login/login.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { SignupComponent } from '../components/signup/signup.component';
import { UserComponent } from '../components/user/user.component';
import { ViewuserComponent } from '../components/viewuser/viewuser.component';
import { BlurbRepository } from '../models/blurb.repository';
import { MediaRepository } from '../models/media.repository';
import { MediaTagRepository } from '../models/mediatag.repository';
import { NoteRepository } from '../models/note.repository';
import { TagRepository } from '../models/tag.repository';
import { User } from '../models/user.model';
import { UserRepository } from '../models/user.repository';
import { BlurbService } from './blurb.service';
import { MediaService } from './media.service';
import { MediaTagService } from './mediatag.service';
import { NoteService } from './note.service';
import { TagService } from './tag.service';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let valueServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('UserService', ['getUser']);

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

    TestBed.configureTestingModule({
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
        { provide: UserService, useValue: spy },
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
    })
  });

  it('Get User Works', () => {
    let media: Observable<User>;
    service = TestBed.inject(UserService)
    valueServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    const stubValue = media;
    valueServiceSpy.getUser.and.returnValue(stubValue);


    expect(service.getUser(1))
    .toBe(stubValue, 'service returned stub value');
  });
});
