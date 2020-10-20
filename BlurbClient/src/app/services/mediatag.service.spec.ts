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
import { MediaTag } from '../models/mediatag.model';
import { MediaTagRepository } from '../models/mediatag.repository';
import { NoteRepository } from '../models/note.repository';
import { TagRepository } from '../models/tag.repository';
import { UserRepository } from '../models/user.repository';
import { BlurbService } from './blurb.service';
import { MediaService } from './media.service';
import { MediaTagService } from './mediatag.service';
import { NoteService } from './note.service';
import { TagService } from './tag.service';
import { UserService } from './user.service';

describe('MediaTagService', () => {
  let service: MediaTagService;
  let valueServiceSpy: jasmine.SpyObj<MediaTagService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MediaTagService', ['getMediaTag']);

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
        UserRepository,
        BlurbService,
        BlurbRepository,
        MediaService,
        MediaRepository,
        MediaTagService,
        { provide: MediaTagService, useValue: spy },
        MediaTagRepository,
        TagService,
        TagRepository,
        NoteService,
        NoteRepository,
      ],
    })
  });

  it('Get MediTag Works', () => {
    let mediaTag: Observable<MediaTag>;
    service = TestBed.inject(MediaTagService)
    valueServiceSpy = TestBed.inject(MediaTagService) as jasmine.SpyObj<MediaTagService>;
    const stubValue = mediaTag;
    valueServiceSpy.getMediaTag.and.returnValue(stubValue);


    expect(service.getMediaTag())
    .toBe(stubValue, 'service returned stub value');
  });
});