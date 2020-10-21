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
import { LoginComponent } from '../components/login/login.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { SignupComponent } from '../components/signup/signup.component';
import { UserComponent } from '../components/user/user.component';
import { ViewuserComponent } from '../components/viewuser/viewuser.component';
import { BlurbRepository } from '../models/blurb.repository';
import { Media } from '../models/media.model';
import { MediaRepository } from '../models/media.repository';
import { UserRepository } from '../models/user.repository';
import { BlurbService } from './blurb.service';
import { MediaService } from './media.service';
import { UserService } from './user.service';

describe('MediaService', () => {
  let service: MediaService;
  let valueServiceSpy: jasmine.SpyObj<MediaService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MediaService', ['getMedia']);

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
        { provide: MediaService, useValue: spy },
        MediaRepository,
      ],
    });
  });

  it('Get Media Works', () => {
    let media: Observable<Media>;
    service = TestBed.inject(MediaService);
    valueServiceSpy = TestBed.inject(MediaService) as jasmine.SpyObj<
      MediaService
    >;
    const stubValue = media;
    valueServiceSpy.getMedia.and.returnValue(stubValue);

    expect(service.getMedia()).toBe(stubValue, 'service returned stub value');
  });
});
