import { customElement, LitElement, property } from 'lit-element';

import('../shared/list-errors/list-errors.component');

import { Errors } from '../../models';
import { loginTemplate } from './login.templates';
import { UserLogin } from './login.models';
import store from '../../core/store';
import { userLogin } from '../../core/user/user.actions';
// import store from '../../core/store';

@customElement('app-login')
export class LoginComponent extends LitElement {
  @property() private formIsValid = false;
  @property() private userLogin: UserLogin = { email: '', password: '' };
  @property() private errors?: Errors;

  createRenderRoot() {
    return this;
  }

  protected render() {
    return loginTemplate(
      this.formIsValid,
      this.emailUpdated,
      this.passwordUpdated,
      this.submit,
      this.errors,
    );
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
