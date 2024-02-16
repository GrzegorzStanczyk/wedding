import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Message } from '../interfaces/message';

@Injectable()
export class SendMessageService {
  private emailUrl = '/assets/mail.php';

  constructor(private http: HttpClient) {}

  sendEmail(message: Message): Observable<Message> | any {
    return this.http.post(this.emailUrl, message);
  }
}
