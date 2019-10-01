import { html } from 'lit-html';
import { Errors } from '../../models';

export const loginTemplate = (
  isValid: boolean,
  emailUpdated: (email: string) => void,
  passwordUpdated: (password: string) => void,
  submit: () => void,
  errors?: Errors,
) => html`
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
          ${errors
            ? html`
                <app-list-errors .errors=${errors}
                  ><app-list-errors></app-list-errors
                ></app-list-errors>
              `
            : ``}

          <form id="loginForm">
            <fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="email"
                  placeholder="Email"
                  @keyup="${(ev: KeyboardEvent) => {
                    emailUpdated((<HTMLInputElement>ev.target).value);
                  }}"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  @keyup="${(ev: KeyboardEvent) => {
                    passwordUpdated((<HTMLInputElement>ev.target).value);
                  }}"
                />
              </fieldset>
              <button
                class="btn btn-lg btn-primary pull-xs-right"
                type="submit"
                ?disabled=${!isValid}
                @click="${(ev: Event) => {
                  ev.preventDefault();
                  submit();
                }}"
              >
                Sign in
              </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
`;
