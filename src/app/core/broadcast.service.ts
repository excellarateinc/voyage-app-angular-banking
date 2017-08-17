import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class BroadcastService {

  // Observable string sources
  private inMobileForm = new Subject<boolean>();

  // Observable string streams
  inMobileForm$ = this.inMobileForm.asObservable();

  // Service message commands
  changeMobileFormStatus(inMobileForm: boolean) {
    this.inMobileForm.next(inMobileForm);
  }
}
