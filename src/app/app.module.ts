import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { FollowingComponent } from './following/following.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AppRoutingModule } from "./app-routing.module";
import { MypostsComponent } from './myposts/myposts.component';
import { RouteGuard } from "./auth/route-guard.service";
import { FormsModule } from "@angular/forms";
import { NotificationComponent } from './notification/notification.component';
import { NotificationService } from "./shared/notification.service";
import { FirebaseApiService } from "./shared/firebase-api.service";
import { UserService } from "./shared/user.service";
import { PostComponent } from './shared/post/post.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AllPostsComponent,
    FollowingComponent,
    FavoritesComponent,
    SignupComponent,
    SigninComponent,
    MypostsComponent,
    NotificationComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [RouteGuard, NotificationService, FirebaseApiService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
