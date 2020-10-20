import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { BlurbRepository } from 'src/app/models/blurb.repository';
import { MediaRepository } from 'src/app/models/media.repository';
import { MediaTagRepository } from 'src/app/models/mediatag.repository';
import { NoteRepository } from 'src/app/models/note.repository';
import { TagRepository } from 'src/app/models/tag.repository';
import { User } from 'src/app/models/user.model';
import { UserRepository } from 'src/app/models/user.repository';
import { BlurbService } from 'src/app/services/blurb.service';
import { MediaService } from 'src/app/services/media.service';
import { MediaTagService } from 'src/app/services/mediatag.service';
import { NoteService } from 'src/app/services/note.service';
import { TagService } from 'src/app/services/tag.service';
import { UserService } from 'src/app/services/user.service';
import { AppRoutingModule } from '../../app-routing.module';
import { FollowersComponent } from '../followers/followers.component';
import { HomeComponent } from '../home/home.component';
import { LandingComponent } from '../landing/landing.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { SignupComponent } from '../signup/signup.component';
import { UserComponent } from '../user/user.component';
import { ViewuserComponent } from '../viewuser/viewuser.component';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

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
      fixture = TestBed.createComponent(LoginComponent);
      component = fixture.componentInstance;});
  });

  beforeEach(() => {
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('On Submit Works', () => {
    spyOn(component, 'onSubmit');

    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('After Submit Works', () => {
    spyOn(component, 'afterSubmit');

    let user: User;

    component.afterSubmit(user);

    expect(component.afterSubmit).toHaveBeenCalledWith(user);
  });
});
