import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { UserRepository } from './models/user.repository';
import { UserComponent } from './components/user/user.component';
import { BlurbService } from './services/blurb.service';
import { BlurbRepository } from './models/blurb.repository';
import { MediaService } from './services/media.service';
import { MediaRepository } from './models/media.repository';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FollowersComponent } from './components/followers/followers.component';
import { ViewuserComponent } from './components/viewuser/viewuser.component';
import { MatIconModule } from '@angular/material/icon';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

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

@NgModule({
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
    InfiniteScrollModule,
  ],
  providers: [
    UserService,
    UserRepository,
    BlurbService,
    BlurbRepository,
    MediaService,
    MediaRepository,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
