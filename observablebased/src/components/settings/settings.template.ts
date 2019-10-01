import { html } from 'lit-html';
import { Errors } from '../../models';
import { User } from '../../models/user.model';

export const settingsTemplate = (
  user: User,
  userImageUpdated: (userImage: string) => void,
  usernameUpdated: (username: string) => void,
  bioUpdated: (username: string) => void,
  emailUpdated: (email: string) => void,
  passwordUpdated: (password: string) => void,
  submit: (user: User) => void,
  logout: () => void,
  errors?: Errors,
) => html`
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>
          ${errors
            ? html`
                <app-list-errors .errors=${errors}> </app-list-errors>
              `
            : ``}
          <form>
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control"
                  type="text"
                  value=${user.image ? user.image : ''}
                  placeholder="URL of profile picture"
                  @keyup="${(ev: KeyboardEvent) => {
                    userImageUpdated((<HTMLInputElement>ev.target).value);
                  }}"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="text"
                  value=${user.username}
                  @keyup="${(ev: KeyboardEvent) => {
                    usernameUpdated((<HTMLInputElement>ev.target).value);
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
                    bioUpdated((<HTMLInputElement>ev.target).value);
                  }}"
                >
${user.bio}</textarea
                >
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="email"
                  placeholder="Email"
                  value=${user.email}
                  @keyup="${(ev: KeyboardEvent) => {
                    emailUpdated((<HTMLInputElement>ev.target).value);
                  }}"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="New Password"
                  value=${user.password}
                  @keyup="${(ev: KeyboardEvent) => {
                    passwordUpdated((<HTMLInputElement>ev.target).value);
                  }}"
                />
              </fieldset>
              <button
                class="btn btn-lg btn-primary pull-xs-right"
                type="submit"
                @click="${(ev: Event) => {
                  ev.preventDefault();
                  submit(user);
                }}"
              >
                Update Settings
              </button>
            </fieldset>
          </form>
          <!-- Line break for logout button -->
          <hr />
          <button class="btn btn-outline-danger" @click=${() => logout()}>
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
`;
