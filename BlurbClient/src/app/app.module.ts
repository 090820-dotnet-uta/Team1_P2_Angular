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
import { MediaTagService } from './services/mediatag.service';
import { MediaTagRepository } from './models/mediatag.repository';
import { TagService } from './services/tag.service';
import { TagRepository } from './models/tag.repository';
import { NoteService } from './services/note.service';
import { NoteRepository } from './models/note.repository';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { EdituserComponent } from './components/edituser/edituser.component';
import { HomeComponent } from './components/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LandingComponent } from './components/landing/landing.component';
import { ProtectedComponent } from './components/protected/protected.component';
import {
  OKTA_CONFIG,
  OktaAuthModule,
  OktaCallbackComponent,
  OktaAuthGuard,
} from '@okta/okta-angular';
import { Router, RouterModule, Routes } from '@angular/router';
import { FollowersComponent } from './components/followers/followers.component';

const config = {
  issuer: 'https://dev-5859084.okta.com/oauth2/default',
  redirectUri: window.location.origin + '/login/callback',
  clientId: '0oaatkg49eXgLauJt5d5',
  pkce: true,
};

export function onAuthRequired(oktaAuth, injector) {
  const router = injector.get(Router);

  // Redirect the user to your custom login page
  router.navigate(['/login']);
}

const appRoutes: Routes = [
  {
    path: 'login/callback',
    component: OktaCallbackComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [OktaAuthGuard],
    data: {
      onAuthRequired,
    },
  },
];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    EdituserComponent,
    HomeComponent,
    LandingComponent,
    ProtectedComponent,
    FollowersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    OktaAuthModule,
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
    { provide: OKTA_CONFIG, useValue: config },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
