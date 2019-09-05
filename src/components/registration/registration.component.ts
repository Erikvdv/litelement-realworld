import { customElement, LitElement, property } from 'lit-element';

import { registrationTemplate } from './registration.templates';
import store from '../../core/store';
import { userRegistration } from '../../core/user/user.actions';
import { UserRegistration } from '../../models/user.model';
import { connect } from 'pwa-helpers/connect-mixin';
import { RootState } from 'typesafe-actions';

@customElement('app-registration')
export class RegistrationComponent extends connect(store)(LitElement) {
  @property() private formIsValid = false;
  @property() private userRegistration: UserRegistration = {
    email: '',
    username: '',
    password: '',
  };
  @property() private state = store.getState();

  createRenderRoot() {
    return this;
  }

  protected render() {
    return registrationTemplate(
      this.formIsValid,
      this.usernameUpdated,
      this.emailUpdated,
      this.passwordUpdated,
      this.submit,
      this.state.user.registrationErrors,
    );
  }

  stateChanged(state: RootState) {
    this.state = state;
  }

  validateForm() {
    this.userRegistration.email &&
    this.userRegistration.password &&
    this.userRegistration.username
      ? (this.formIsValid = true)
      : (this.formIsValid = false);
  }

  emailUpdated = (email: string) => {
    this.userRegistration.email = email;
    this.validateForm();
  }

  usernameUpdated = (username: string) => {
    this.userRegistration.username = username;
    this.validateForm();
  }

  passwordUpdated = (password: string) => {
    this.userRegistration.password = password;
    this.validateForm();
  }

  submit = () => {
    store.dispatch(userRegistration.request(this.userRegistration));
  }
}
