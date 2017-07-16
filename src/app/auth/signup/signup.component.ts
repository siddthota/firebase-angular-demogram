import {Component, NgZone, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import * as firebase from 'firebase';
import {NotificationService} from "../../shared/notification.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  displayVerificationMessage: boolean = false;

  constructor(private notifier: NotificationService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){

    const name = form.value['user-name'];
    const email = form.value.email;
    const password = form.value.password;

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(userData => {

        userData.sendEmailVerification();

        this.displayVerificationMessage = true;

        return firebase.database().ref('users/' + userData.uid).set({
          email: email,
          uid: userData.uid,
          registrationDate: new Date().toString(),
          name: name
        });


      })
      .catch(err => {
        this.notifier.display('error', err);
      });


  }

}
