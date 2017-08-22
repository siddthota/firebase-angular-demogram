import {EventEmitter, Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {LiveMessageService} from "./livemessages.service";

@Injectable()
export class UserService {
  statusChange = new EventEmitter<any>();

  constructor(private liveMessages: LiveMessageService) { }

  set(userFromDatabase) {
    localStorage.setItem('user', JSON.stringify(userFromDatabase));
    this.statusChange.emit(userFromDatabase);

    const messaging = firebase.messaging();

    messaging.requestPermission()
      .then(() => {

        firebase.messaging().getToken()
          .then(token => {
            console.log('Token received: ', token);
            const updates = {};

            messaging.onMessage(payload => {
              console.log(payload);
              this.liveMessages.display(payload['notification']);
            });

            updates['/users/' + userFromDatabase.uid + "/messageToken"] = token;
            return firebase.database().ref().update(updates);
          })
          .catch(err => {
            console.log(err);
          })

      })
      .catch(err => {
        console.log(err);
      })


  }

  destroy(){
    localStorage.removeItem('user');
    this.statusChange.emit(null);
    console.log('user removed from localstorage');
  }

  getProfile() {
    const user = localStorage.getItem('user');
    return JSON.parse(user);
  }


}
