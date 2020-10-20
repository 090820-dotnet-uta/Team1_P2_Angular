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
import { FullQueryObj } from '../components/home/FullQueryObj';
import { HomeComponent } from '../components/home/home.component';
import { LandingComponent } from '../components/landing/landing.component';
import { LoginComponent } from '../components/login/login.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { SignupComponent } from '../components/signup/signup.component';
import { UserComponent } from '../components/user/user.component';
import { ViewuserComponent } from '../components/viewuser/viewuser.component';
import { Blurb } from '../models/blurb.model';
import { BlurbRepository } from '../models/blurb.repository';
import { MediaRepository } from '../models/media.repository';
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

describe('BlurbService', () => {
  let service: BlurbService;
  let valueServiceSpy: jasmine.SpyObj<BlurbService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('BlurbService', ['getBlurb']);

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
        { provide: BlurbService, useValue: spy },
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

  it('Get Blurb Works', () => {
    let blurb: Observable<Blurb>;
    service = TestBed.inject(BlurbService)
    valueServiceSpy = TestBed.inject(BlurbService) as jasmine.SpyObj<BlurbService>;
    const stubValue = blurb;
    valueServiceSpy.getBlurb.and.returnValue(stubValue);


    expect(service.getBlurb(1))
    .toBe(stubValue, 'service returned stub value');
  });

  // it('Get Blurbs Works', () => {
  //   let blurb: Observable<Blurb[]>;
  //   service = TestBed.inject(BlurbService)
  //   valueServiceSpy = TestBed.inject(BlurbService) as jasmine.SpyObj<BlurbService>;
  //   const stubValue = blurb;
  //   valueServiceSpy.getBlurbs.and.returnValues(stubValue);


  //   expect(service.getBlurbs())
  //   .toBe(stubValue, 'service returned stub value');
  // });

  // it('Get Blurb By User Works', () => {
  //   let blurb: Observable<Blurb[]>;
  //   let fullQ: FullQueryObj;
  //   service = TestBed.inject(BlurbService)
  //   valueServiceSpy = TestBed.inject(BlurbService) as jasmine.SpyObj<BlurbService>;
  //   const stubValue = blurb;
  //   valueServiceSpy.getBlurbsByUser.and.returnValue(stubValue);


  //   expect(service.getBlurbsByUser(fullQ,1,1))
  //   .toBe(stubValue, 'service returned stub value');
  // });

  // it('Add Blurb Works', () => {
  //   let blurb: Observable<Blurb>;
  //   let b: Blurb;
  //   service = TestBed.inject(BlurbService)
  //   valueServiceSpy = TestBed.inject(BlurbService) as jasmine.SpyObj<BlurbService>;
  //   const stubValue = blurb;
  //   valueServiceSpy.addBlurb.and.returnValue(stubValue);


  //   expect(service.addBlurb(b))
  //   .toBe(stubValue, 'service returned stub value');
  // });
});
