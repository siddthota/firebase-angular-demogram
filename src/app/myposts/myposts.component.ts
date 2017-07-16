import {Component, OnDestroy, OnInit} from '@angular/core';
import {FirebaseApiService} from "../shared/firebase-api.service";
import {NotificationService} from "../shared/notification.service";
import * as firebase from 'firebase';

@Component({
  selector: 'app-myposts',
  templateUrl: './myposts.component.html',
  styleUrls: ['./myposts.component.css']
})
export class MypostsComponent implements OnInit, OnDestroy {
  personalPostsRef: any;
  postLists: any = [];

  constructor(private fire: FirebaseApiService, private notifier: NotificationService) { }

  ngOnInit() {

    const uid = firebase.auth().currentUser.uid;
    this.personalPostsRef = this.fire.getUserPostsRef(uid);
    this.personalPostsRef.on('child_added', data => {
      this.postLists.push({
        key: data.key,
        data: data.val()
      })
    });
  }

  onFileSelection(event) {
    const fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      const file: File = fileList[0];
      this.fire.uploadFile(file)
        .then(data => {
          this.notifier.display('success', 'Picture Successfully uploaded!!');
          return this.fire.handleImageUpload(data);
        })
        .catch(err => {
          this.notifier.display('error', err);
        })
    }
  }

  ngOnDestroy() {
    this.personalPostsRef.off();
  }
}
