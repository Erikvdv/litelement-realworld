import { html, customElement, LitElement, property } from 'lit-element'

import { store, RootState } from '../store'
import { connect } from 'pwa-helpers/connect-mixin'
import { Errors } from '../models/errors.model'
import '../shared/list-errors/list-errors.component'
import { registerUser } from './registration.actions'
import { UserRegistration } from './registration.models'
import { registrationStateSelector } from '.'

@customElement('app-registration')
export class RegistrationContainer extends connect(store)(LitElement) {
  @property() private formIsValid = false
  @property() private userRegistration: UserRegistration = {
    username: '',
    email: '',
    password: '',
  }
  @property() private errors?: Errors

  createRenderRoot() {
    return this
  }

  protected render() {
    return html`
      <div class="auth-page">
        <div class="container page">
          <div class="row">
            <div class="col-md-6 offset-md-3 col-xs-12">
              <h1 class="text-xs-center">Sign Up</h1>
              <p class="text-xs-center">
                <a href="/login">
                  Have an account?
                </a>
              </p>
              ${this.errors
                ? html`
                    <app-list-errors .errors=${this.errors}
                      ><app-list-errors></app-list-errors
                    ></app-list-errors>
                  `
                : ``}

              <form id="signUpForm">
                <fieldset>
                  <fieldset class="form-group">
                    <input
                      class="form-control form-control-lg"
                      type="text"
                      placeholder="Username"
                      @keyup="${(ev: KeyboardEvent) => {
                        this.userRegistration.username = (<HTMLInputElement>(
                          ev.target
                        )).value
                        this.validateForm()
                      }}"
                    />
                  </fieldset>
                  <fieldset class="form-group">
                    <input
                      class="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                      @keyup="${(ev: KeyboardEvent) => {
                        this.userRegistration.email = (<HTMLInputElement>(
                          ev.target
                        )).value
                        this.validateForm()
                      }}"
                    />
                  </fieldset>
                  <fieldset class="form-group">
                    <input
                      class="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      @keyup="${(ev: KeyboardEvent) => {
                        this.userRegistration.password = (<HTMLInputElement>(
                          ev.target
                        )).value
                        this.validateForm()
                      }}"
                    />
                  </fieldset>
                  <button
                    class="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    ?disabled=${!this.formIsValid}
                    @click="${(ev: Event) => {
                      ev.preventDefault()
                      this.submit()
                    }}"
                  >
                    Sign up
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    `
  }

  stateChanged(state: RootState) {
    const registrationState = registrationStateSelector(state)
    if (!registrationState) {
      return
    }
    this.errors = registrationState.errors
  }

  validateForm() {
    this.userRegistration.email &&
    this.userRegistration.username &&
    this.userRegistration.password
      ? (this.formIsValid = true)
      : (this.formIsValid = false)
  }

  submit() {
    store.dispatch(registerUser(this.userRegistration))
  }
}
