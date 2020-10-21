import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule, By } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { BlurbRepository } from 'src/app/models/blurb.repository';
import { MediaRepository } from 'src/app/models/media.repository';
import { UserRepository } from 'src/app/models/user.repository';
import { BlurbService } from 'src/app/services/blurb.service';
import { MediaService } from 'src/app/services/media.service';
import { UserService } from 'src/app/services/user.service';
import { FollowersComponent } from '../followers/followers.component';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SignupComponent } from '../signup/signup.component';
import { UserComponent } from '../user/user.component';
import { ViewuserComponent } from './viewuser.component';

describe('ViewuserComponent', () => {
  let component: ViewuserComponent;
  let fixture: ComponentFixture<ViewuserComponent>;

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
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(ViewuserComponent);
        component = fixture.componentInstance;
      });
  });

  it('blurbsByUserArr is empty by default', () => {
    // spyOn(component, 'toggleBooksFilter');

    // let button = fixture.nativeElement.query(By.css('.book'));
    // button.triggerEventHandler('click', null);

    // expect(component.sortSettings.includeBooks).toBeFalse();
    expect(component.blurbsByUserArr.length).toEqual(0);
  });

  it('followers is empty by default', () => {
    // spyOn(component, 'toggleBooksFilter');

    // let button = fixture.nativeElement.query(By.css('.book'));
    // button.triggerEventHandler('click', null);

    // expect(component.sortSettings.includeBooks).toBeFalse();
    expect(component.followers.length).toEqual(0);
  });

  it('following is empty by default', () => {
    // spyOn(component, 'toggleBooksFilter');

    // let button = fixture.nativeElement.query(By.css('.book'));
    // button.triggerEventHandler('click', null);

    // expect(component.sortSettings.includeBooks).toBeFalse();
    expect(component.following.length).toEqual(0);
  });

  it('following is empty by default', () => {
    // spyOn(component, 'toggleBooksFilter');

    // let button = fixture.nativeElement.query(By.css('.book'));
    // button.triggerEventHandler('click', null);

    // expect(component.sortSettings.includeBooks).toBeFalse();
    expect(component.avatarLetter.length).toEqual(0);
  });

  // it('toggleMovieFilter Works', () => {
  //   spyOn(component, 'toggleMovieFilter');

  //   let button = fixture.debugElement.nativeElement.querySelector('button');
  //   button.toggleMovieFilter();

  //   expect(component.toggleMovieFilter).toHaveBeenCalled();
  // });

  // it('toggleTVFilter Works', () => {
  //   spyOn(component, 'toggleTVFilter');

  //   let button = fixture.debugElement.nativeElement.querySelector('button');
  //   button.toggleTVFilter();

  //   expect(component.toggleTVFilter).toHaveBeenCalled();
  // });

  // it('toggleGamesFilter Works', () => {
  //   spyOn(component, 'toggleGamesFilter');

  //   let button = fixture.debugElement.nativeElement.querySelector('button');
  //   button.toggleGamesFilter();

  //   expect(component.toggleGamesFilter).toHaveBeenCalled();
  // });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
