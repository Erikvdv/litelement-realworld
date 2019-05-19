import { LitElement, html, property, PropertyValues, customElement } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin';
import { updateMetadata } from 'pwa-helpers/metadata';
import { installRouter } from 'pwa-helpers/router';

// This element is connected to the Redux store.
import { store, RootState } from '../store';
import '../components/app-header';
import '../containers/app-home';
import '../containers/app-article';

// These are the actions needed by this element.
import {
  navigate
} from '../actions/app-root';
import { rootRoute } from '../reducers/app-root';


@customElement('app-root')
export class AppRoot extends connect(store)(LitElement) {
  @property({type: String})
  appTitle = '';

  @property({type: String})
  private _route = '';

  createRenderRoot() {
    return this;
  }


  protected render() {
    return html`
      <!-- Header -->
      <app-header appName="${this.appTitle}" currentUser="">

      </app-header>
      <!-- Main content -->
      <main role="main" class="main-content">
        ${this._route === rootRoute.home ? html`<app-home></app-home>` : ''}
        ${this._route === rootRoute.article ? html`<app-article></app-article>` : '' }
      </main>
    `;
  }

  protected firstUpdated() {
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
        // This object also takes an image property, that points to an img src.
      });
    }
  }

  stateChanged(state: RootState) {
    this._route = state.app.route;
  }
}
