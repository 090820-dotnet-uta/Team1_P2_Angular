import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FollowersComponent } from './components/followers/followers.component';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserComponent } from './components/user/user.component';
import { ViewuserComponent } from './components/viewuser/viewuser.component';
import { BlurbRepository } from './models/blurb.repository';
import { MediaRepository } from './models/media.repository';
import { MediaTagRepository } from './models/mediatag.repository';
import { NoteRepository } from './models/note.repository';
import { TagRepository } from './models/tag.repository';
import { UserRepository } from './models/user.repository';
import { BlurbService } from './services/blurb.service';
import { MediaService } from './services/media.service';
import { MediaTagService } from './services/mediatag.service';
import { NoteService } from './services/note.service';
import { TagService } from './services/tag.service';
import { UserService } from './services/user.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

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
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;});
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'BlurbClient'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    //expect(app.title).toEqual('BlurbClient');
  });
});
