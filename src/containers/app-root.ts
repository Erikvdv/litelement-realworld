import { LitElement, html, property, PropertyValues, customElement } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { installOfflineWatcher } from 'pwa-helpers/network.js';
import { installRouter } from 'pwa-helpers/router.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';

// This element is connected to the Redux store.
import { store, RootState } from '../store';
import '../components/app-header';

// These are the actions needed by this element.
import {
  navigate,
  updateOffline
} from '../actions/app';


@customElement('app-root')
export class AppRoot extends connect(store)(LitElement) {
  @property({type: String})
  appTitle = '';

  @property({type: String})
  private _page = '';

  createRenderRoot() {
    return this;
  }


  protected render() {
    return html`
      <!-- Header -->
      <app-header appName="${this.appTitle}" currentUser="">
            <!-- appName={this.props.appName}
            currentUser={this.props.currentUser} /> -->
    
      </app-header>


      <!-- Main content -->
      <main role="main" class="main-content">
        <app-home ?active="${this._page === 'home'}"></app-home>
      </main>


    `;
  }

  protected firstUpdated() {
    installRouter((location) => store.dispatch(navigate(decodeURIComponent(location.pathname))));
    installOfflineWatcher((offline) => store.dispatch(updateOffline(offline)));
  }

  protected updated(changedProps: PropertyValues) {
    if (changedProps.has('_page')) {
      const pageTitle = this.appTitle + ' - ' + this._page;
      updateMetadata({
        title: pageTitle,
        description: pageTitle
        // This object also takes an image property, that points to an img src.
      });
    }
  }



  stateChanged(state: RootState) {
    this._page = state.app!.page;
  }
}
