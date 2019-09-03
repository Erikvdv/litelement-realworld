import { LitElement, html, property, customElement } from 'lit-element';

// import { updateMetadata } from 'pwa-helpers/metadata';
import { installRouter } from 'pwa-helpers/router';
import { connect } from 'pwa-helpers/connect-mixin';
import { router } from './root.router';
import store from '../../core/store';
import { RootState } from 'typesafe-actions';
import { mainTemplate, headerTemplate, footerTemplate } from './root.templates';
import { autoLoginInitiate } from '../../core/user/user.actions';
import { RequestStatus } from '../../models/request-status.model';

@customElement('app-root')
export class RootComponent extends connect(store)(LitElement) {
  @property({ type: String }) appTitle = '';
  @property() private state = store.getState();

  createRenderRoot() {
    return this;
  }

  protected render() {
    if (this.state.user.autoLoginStatus === RequestStatus.fetching) {
      return html`
        Loading...
      `;
    } else {
      return html`
        ${headerTemplate(
          'Conduit',
          this.state.user.user ? this.state.user.user.username : '',
        )}
        ${mainTemplate(this.state.navigation.rootRoute)} ${footerTemplate()}
      `;
    }
  }

  protected firstUpdated() {
    store.dispatch(autoLoginInitiate());
    installRouter(location => {
      console.log('location: ' + location);
      router.resolve({ pathname: location.pathname });
    });
    // this.navigate();
  }

  stateChanged(state: RootState) {
    this.state = state;
  }

  navigate() {
    installRouter(location => {
      console.log('location: ' + location);
      router.resolve({ pathname: location.pathname });
    });
  }
}
