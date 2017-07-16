
import {HomeComponent} from "./home/home.component";
import {FollowingComponent} from "./following/following.component";
import {RouterModule, Routes} from "@angular/router";
import {FavoritesComponent} from "./favorites/favorites.component";
import {AllPostsComponent} from "./all-posts/all-posts.component";
import {SigninComponent} from "./auth/signin/signin.component";
import {SignupComponent} from "./auth/signup/signup.component";
import {NgModule} from "@angular/core";
import {MypostsComponent} from "./myposts/myposts.component";
import {RouteGuard} from "./auth/route-guard.service";

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'following', component: FollowingComponent, canActivate: [RouteGuard]},
  {path: 'favorites', component: FavoritesComponent, canActivate: [RouteGuard]},
  {path: 'allposts', component: AllPostsComponent, canActivate: [RouteGuard]},
  {path: 'myposts', component: MypostsComponent, canActivate: [RouteGuard]},
  {path: 'signin', component: SigninComponent},
  {path: 'signup', component: SignupComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
