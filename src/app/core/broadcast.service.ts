import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { User } from './user/user.model';

@Injectable()
export class BroadcastService {

  // Observable string sources
  private inMobileForm = new Subject<boolean>();

  // Observable string streams
  inMobileForm$ = this.inMobileForm.asObservable();

      // Observable string sources
  private profileUpdated = new Subject<User>();

  // Observable string streams
  profileUpdated$ = this.profileUpdated.asObservable();

  // Service message commands
  changeMobileFormStatus(inMobileForm: boolean) {
    this.inMobileForm.next(inMobileForm);
  }

  // Service message commands
  emitProfileUpdated(user: User) {
    this.profileUpdated.next(user);
  }
}
