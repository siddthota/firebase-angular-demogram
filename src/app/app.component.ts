import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {ToasterService} from "angular2-toaster";
import {LiveMessageService} from "./shared/livemessages.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private toasterService: ToasterService, private liveMessage: LiveMessageService) {
  }

  ngOnInit() {
    const config = {
      apiKey: "AIzaSyA0E4GmtgzBiCMY_hrkNlpUn3MspBr9t1s",
      authDomain: "fir-serverless-e7e56.firebaseapp.com",
      databaseURL: "https://fir-serverless-e7e56.firebaseio.com",
      projectId: "fir-serverless-e7e56",
      storageBucket: "fir-serverless-e7e56.appspot.com",
      messagingSenderId: "184423690002"
    };
    firebase.initializeApp(config);

    this.liveMessage.item$.subscribe(payload => {
      this.toasterService.pop('success', payload.title, payload.body);
    });

  }
}
