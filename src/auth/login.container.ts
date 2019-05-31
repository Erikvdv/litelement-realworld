import { html, customElement, LitElement, property } from 'lit-element';


import { store, RootState } from '../store';
import { connect } from 'pwa-helpers/connect-mixin';
import { UserLogin } from './auth.model';
import { Errors } from '../models/errors.model';
import '../components/shared/list-errors';
import { registrationStateSelector } from '.';
import { loginUser } from './login.actions';



@customElement('app-login')
export class AppLogin extends connect(store)(LitElement) {

  @property() private formIsValid = false;
  @property() private userLogin: UserLogin = {email: '', password: ''};
  @property() private errors?: Errors;

  createRenderRoot() {
    return this;
  }

  protected render() {
    return html`
        <div class="auth-page">
          <div class="container page">
            <div class="row">
              <div class="col-md-6 offset-md-3 col-xs-12">
                <h1 class="text-xs-center">Sign In</h1>
                <p class="text-xs-center">
                  <a href="/login">
                    Need an account?
                  </a>
                </p>
                ${this.errors ? html`<app-list-errors .errors=${this.errors} ><app-list-errors>` : ``}

                <form id="loginForm">
                  <fieldset>
                    <fieldset class="form-group">
                      <input class="form-control form-control-lg" type="email" placeholder="Email" @keyup="${(ev: KeyboardEvent) => {
                        this.userLogin.email = (<HTMLInputElement>ev.target).value;
                        this.validateForm();
                        }}" />
                    </fieldset>
                    <fieldset class="form-group">
                      <input class="form-control form-control-lg" type="password" placeholder="Password" @keyup="${(ev: KeyboardEvent) => {
                        this.userLogin.password = (<HTMLInputElement>ev.target).value;
                        this.validateForm();
                      }}" />
                    </fieldset>
                    <button class="btn btn-lg btn-primary pull-xs-right"
                      type="submit"
                      ?disabled=${!this.formIsValid}
                      @click="${(ev: Event) => {
                        ev.preventDefault();
                        this.submit(); } }">
                      Sign in
                    </button>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
    `;
  }


  stateChanged(state: RootState) {
    const registrationState = registrationStateSelector(state);
    if (!registrationState) { return; }
    this.errors = registrationState.errors;
  }

  validateForm() {
    (this.userLogin.email
      && this.userLogin.password) ? this.formIsValid = true : this.formIsValid = false;
  }

  submit() {
    store.dispatch(loginUser(this.userLogin));
  }

}

