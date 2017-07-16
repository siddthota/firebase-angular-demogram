import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class UserService {
  statusChange = new EventEmitter<any>();

  constructor() { }

  set(userFromDatabase) {
    localStorage.setItem('user', JSON.stringify(userFromDatabase));
    this.statusChange.emit(userFromDatabase);
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
