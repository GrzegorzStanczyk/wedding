import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class StateService {
  private navigationStateSource = new Subject<void>();
  private contactFormStateSource = new Subject<void>();
  private formFocusStateSource = new Subject<boolean>();
  public navigationState$ = this.navigationStateSource.asObservable();
  public contactFormState$ = this.contactFormStateSource.asObservable();
  public formFocusState$ = this.formFocusStateSource.asObservable();

  constructor() {}

  toggleNavigation() {
    this.navigationStateSource.next();
  }

  toggleContactForm() {
    this.contactFormStateSource.next();
  }

  toggleFocusState(state: boolean) {
    this.formFocusStateSource.next(state);
  }
}
