import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import _ from 'lodash';
import {FirebaseApiService} from "../shared/firebase-api.service";
import {NotificationService} from "../shared/notification.service";

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit, OnDestroy {
  allRef: any;
  all: any = [];
  loadMoreRef: any;

  constructor(private fire: FirebaseApiService, private notifier: NotificationService) { }

  ngOnInit() {
    this.allRef = firebase.database().ref('allposts').limitToFirst(2);
    this.allRef.on('child_added', data => {
      this.all.push({
        key: data.key,
        data: data.val()
      });
    });

  }

  onLoadMore() {
    if (this.all.length > 0) {
      const lastLoadedPost = _.last(this.all);
      const lastLoadedPostKey = lastLoadedPost.key;

      this.loadMoreRef = firebase.database().ref('allposts').startAt(null, lastLoadedPostKey).limitToFirst(2+1)

      this.loadMoreRef.on('child_added', data => {

        if (data.key === lastLoadedPostKey) {
          return;
        } else {
          this.all.push({
            key: data.key,
            data: data.val()
          });
        }

      });

    }
  }

  onFavoritesClicked(imageData) {
    this.fire.addImageToFavorites(imageData)
      .then(() => {
        this.notifier.display('success', 'Image was successfully added to favorities');
      })
      .catch(err => {
        this.notifier.display('error', err);
      });
  }

  ngOnDestroy() {
    this.allRef.off();
    if (this.loadMoreRef) {
      this.loadMoreRef.off();
    }
  }

}
