import { LitElement, html, property, PropertyValues, customElement } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { updateMetadata } from 'pwa-helpers/metadata';
import { installRouter } from 'pwa-helpers/router';
import { store, RootState } from '../store';
import '../shared/header/header.component';
import '../home/home.container';
import '../article/article.container';
import '../register/registration.container';
import '../login';

import { navigate } from './root.actions';
import { rootRoute } from './root.reducer';
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
        ${this._route === rootRoute.home ? html`<app-home></app-home>` : ''}
        ${this._route === rootRoute.article ? html`<app-article></app-article>` : '' }
        ${this._route === rootRoute.register ? html`<app-register></app-register>` : '' }
        ${this._route === rootRoute.login ? html`<app-login></app-login>` : '' }
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
    if (changedProps.has('_page')) {
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
