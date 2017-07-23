import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {UserService} from "../shared/user.service";
import {Router} from "@angular/router";
import {FirebaseApiService} from "../shared/firebase-api.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  name: string;
  email: string;
  uid: string;

  constructor(private user: UserService,
              private router: Router,
              private fire: FirebaseApiService
  ) { }

  ngOnInit() {
    this.user.statusChange.subscribe(userData => {
      if (userData){
        this.isLoggedIn = true;
        this.name = userData.name;
        this.email = userData.email;
        this.uid = userData.uid;
      } else {
        this.isLoggedIn = false;
        this.name = null;
        this.email = null;
        this.uid = null;
      }

    });

    firebase.auth().onAuthStateChanged(userData => {
      if (userData && userData.emailVerified) {
        if (this.isLoggedIn) {
          console.log('User is Logged in and menu options should be visible');
        } else {
          console.log('User is Logged in i.e never explicitly logged out but the state in our header is incorrect');
          this.fire.getUserFromDatabase(userData.uid)
            .then(userDataFromDatabase => {
              this.user.set(userDataFromDatabase);
              this.router.navigate(["/allposts"]);
            })
        }
      }
    });

  }

  onSignout() {
    firebase.auth().signOut()
      .then(() => {
        this.user.destroy();
        this.router.navigate(["/signin"]);
      });
  }
}
