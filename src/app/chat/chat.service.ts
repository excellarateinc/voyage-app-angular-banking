import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class ChatService {

  constructor(private http: Http) { }

    getChannels(): Observable<any> {
      return this.http.get(`${environment.API_URL}/chats/channels`)
        .map(response => response.json())
        .catch(error => Observable.throw(error.json()));
    }

}
