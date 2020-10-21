import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
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
import { UserComponent } from '../user/user.component';
import { ViewuserComponent } from '../viewuser/viewuser.component';

import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

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
        fixture = TestBed.createComponent(SignupComponent);
        component = fixture.componentInstance;
      });
  });

  it('On Submit Works', () => {
    spyOn(component, 'onSubmit');

    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
