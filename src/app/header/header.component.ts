import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {UserService} from "../shared/user.service";
import {Router} from "@angular/router";

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

  constructor(private user: UserService, private router: Router) { }

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

  }

  onSignout() {
    firebase.auth().signOut()
      .then(() => {
        this.user.destroy();
        this.router.navigate(["/signin"]);
      });
  }
}
