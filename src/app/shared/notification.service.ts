import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";

@Injectable()
export class NotificationService {
  private sub = new Subject<any>();

  public item$ = this.sub.asObservable();

  display(type, message) {
    this.sub.next({type, message});
  }

}
