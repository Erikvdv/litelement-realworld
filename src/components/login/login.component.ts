import { customElement, LitElement, property } from 'lit-element';

import('../shared/list-errors/list-errors.component');

import { loginTemplate } from './login.templates';
import { UserLogin } from './login.models';
import store from '../../store';
import { userLogin } from '../../core/user/user.actions';
import { connect } from 'pwa-helpers/connect-mixin';
import { RootState } from 'typesafe-actions';
// import store from '../../core/store';

@customElement('app-login')
export class LoginComponent extends connect(store)(LitElement) {
  @property() private formIsValid = false;
  @property() private userLogin: UserLogin = { email: '', password: '' };
  @property() private state = store.getState();

  createRenderRoot() {
    return this;
  }

  protected render() {
    return loginTemplate(
      this.formIsValid,
      this.emailUpdated,
      this.passwordUpdated,
      this.submit,
      this.state.user.errors,
    );
  }

  stateChanged(state: RootState) {
    this.state = state;
  }

  validateForm() {
    this.userLogin.email && this.userLogin.password
      ? (this.formIsValid = true)
      : (this.formIsValid = false);
  }

  emailUpdated = (email: string) => {
    this.userLogin.email = email;
    this.validateForm();
  }

  passwordUpdated = (password: string) => {
    this.userLogin.password = password;
    this.validateForm();
  }

  submit = () => {
    store.dispatch(userLogin.request(this.userLogin));
  }
}
