import { Injectable } from '@angular/core';
import {Subject} from "rxjs/Subject";

@Injectable()
export class LiveMessageService {
  private sub = new Subject<any>();

  public item$ = this.sub.asObservable();

  display(payload) {
    this.sub.next(payload);
  }

}
