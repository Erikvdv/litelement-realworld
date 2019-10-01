import { html, customElement, property, LitElement } from 'lit-element';

import { store, RootState } from '../store';
import { connect } from 'pwa-helpers/connect-mixin';
import { userName, getToken, getUser } from '../login';
import { profileStateSelector } from './profile.reducer';
import { Errors } from '../models';
import { fetchProfile } from '.';
import { User } from '../models/user.model';
import { updateUser } from './profile.actions';
import { navigate } from '../root/root.actions';
import { logout } from '../login/login.actions';

@customElement('app-settings')
export class SettingsContainer extends connect(store)(LitElement) {
  @property() private userName = '';
  @property() private errors?: Errors;
  @property() private user?: User;
  @property() private token = '';

  createRenderRoot() {
    return this;
  }

  protected render() {
    if (this.user === undefined) {
      return;
    }
    return html`
      <div class="settings-page">
        <div class="container page">
          <div class="row">
            <div class="col-md-6 offset-md-3 col-xs-12">
              <h1 class="text-xs-center">Your Settings</h1>

              ${this.errors
                ? html`
                    <app-list-errors .errors=${this.errors}> </app-list-errors>
                  `
                : ``}

              <form>
                <fieldset>
                  <fieldset class="form-group">
                    <input
                      class="form-control"
                      type="text"
                      value=${this.user.image ? this.user.image : ''}
                      placeholder="URL of profile picture"
                      @keyup="${(ev: KeyboardEvent) => {
                        this.user!.image = (<HTMLInputElement>ev.target).value;
                      }}"
                    />
                  </fieldset>

                  <fieldset class="form-group">
                    <input
                      class="form-control form-control-lg"
                      type="text"
                      value=${this.user.username}
                      @keyup="${(ev: KeyboardEvent) => {
                        this.user!.username = (<HTMLInputElement>(
                          ev.target
                        )).value;
                      }}"
                      placeholder="Username"
                    />
                  </fieldset>

                  <fieldset class="form-group">
                    <textarea
                      class="form-control form-control-lg"
                      rows="8"
                      placeholder="Short bio about you"
                      @keyup="${(ev: KeyboardEvent) => {
                        this.user!.bio = (<HTMLInputElement>ev.target).value;
                      }}"
                    >
${this.user.bio}</textarea
                    >
                  </fieldset>

                  <fieldset class="form-group">
                    <input
                      class="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                      value=${this.user.email}
                      @keyup="${(ev: KeyboardEvent) => {
                        this.user!.email = (<HTMLInputElement>ev.target).value;
                      }}"
                    />
                  </fieldset>

                  <fieldset class="form-group">
                    <input
                      class="form-control form-control-lg"
                      type="password"
                      placeholder="New Password"
                      value=${this.user.password}
                      @keyup="${(ev: KeyboardEvent) => {
                        this.user!.password = (<HTMLInputElement>(
                          ev.target
                        )).value;
                      }}"
                    />
                  </fieldset>

                  <button
                    class="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    @click="${(ev: Event) => {
                      ev.preventDefault();
                      this.submit();
                    }}"
                  >
                    Update Settings
                  </button>
                </fieldset>
              </form>

              <!-- Line break for logout button -->
              <hr />

              <button class="btn btn-outline-danger" @click=${this.logout}>
                Or click here to logout.
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  protected firstUpdated() {
    store.dispatch(fetchProfile(this.userName));
  }

  stateChanged(state: RootState) {
    const profileState = profileStateSelector(state);
    if (!profileState) {
      return;
    }
    this.errors = profileState.errors;
    this.user = getUser(state);
    this.userName = userName(state);
    this.token = getToken(state);
  }

  logout() {
    localStorage.removeItem('user');
    store.dispatch(logout());
    window.history.pushState({}, '', '/');
    store.dispatch(navigate());
  }

  submit() {
    store.dispatch(updateUser(this.user, this.token));
  }
}
