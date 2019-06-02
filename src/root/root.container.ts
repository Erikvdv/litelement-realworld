import { LitElement, html, property, PropertyValues, customElement } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { updateMetadata } from 'pwa-helpers/metadata';
import { installRouter } from 'pwa-helpers/router';

import { store, RootState } from '../store';
import '../shared/header/header.component';

import { navigate } from './root.actions';
import { RootRoute } from './root.reducer';
import { UserResponse } from '../models/user.model';
import { loginRefresh } from '../login/login.actions';
import { userName } from '../login';


@customElement('app-root')
export class AppRoot extends connect(store)(LitElement) {
  @property({type: String})
  appTitle = '';

  @property()
  private _route = '';

  @property()
  private username = '';

  createRenderRoot() {
    return this;
  }

  protected render() {
    return html`
      <!-- Header -->
      <app-header appName="${this.appTitle}" .currentUser=${this.username}>

      </app-header>
      <!-- Main content -->
      <main role="main" class="main-content">
        ${this._route === RootRoute.home ? html`<app-home></app-home>` : ''}
        ${this._route === RootRoute.article ? html`<app-article></app-article>` : '' }
        ${this._route === RootRoute.register ? html`<app-registration></app-registration>` : '' }
        ${this._route === RootRoute.login ? html`<app-login></app-login>` : '' }
      </main>
    `;
  }

  protected firstUpdated() {
    const userString = localStorage.getItem('user');
    if (userString) {
      const userResponse: UserResponse = JSON.parse(userString);
      store.dispatch(loginRefresh(userResponse.user));
    }
    installRouter(() => {
      store.dispatch(navigate());
    });
  }

  protected updated(changedProps: PropertyValues) {
    if (changedProps.has('_route')) {
      const pageTitle = this.appTitle + ' - ' + this._route;
      updateMetadata({
        title: pageTitle,
        description: pageTitle
      });
    }
  }

  stateChanged(state: RootState) {
    this._route = state.app.route;

    this.username = userName(state);
  }
}
