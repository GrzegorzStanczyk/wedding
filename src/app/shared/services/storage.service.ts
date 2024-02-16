import { Injectable } from '@angular/core';
import { Message } from '../interfaces/message';
import { Project } from '../interfaces/project';

@Injectable()
export class StorageService {
  public lastProject: Project | null = null;
  public projectCounter: number | null = null;
  public contactMessage: Message = {
    title: '',
    email: '',
    message: '',
    honey: '',
  };

  storeMessage(message: Message) {
    this.contactMessage = message;
  }

  getMessage(): Message {
    return this.contactMessage;
  }
}
