import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import {NotificationService} from "../../shared/notification.service";
import {FirebaseApiService} from "../../shared/firebase-api.service";
import {UserService} from "../../shared/user.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  emailVerificationMessage: boolean = false;

  constructor(private notifier: NotificationService,
              private fire : FirebaseApiService,
              private user: UserService,
              private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => {
        if (!user.emailVerified) {
          this.emailVerificationMessage = true;
          this.logout();
          return null;
        } else {
          return this.fire.getUserFromDatabase(user.uid);
        }

      })
      .then(userFromDatabase => {
        if (userFromDatabase) {
          this.user.set(userFromDatabase);
          this.router.navigate(['/allposts']);
        }

      })
      .catch(err => {
        this.notifier.display('error', err);
      });

  }

  logout() {
    firebase.auth().signOut()
      .catch(err => {
        this.notifier.display('error', err);
      });
  }


}
