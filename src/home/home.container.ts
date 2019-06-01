import { html, customElement, property, LitElement } from 'lit-element';
import './home-banner.component';
import './home-tags.component';
import './home-feed-navigation.component';
import '../shared/article-list/article-list.container';

import { store, RootState } from '../store';
import { TagsState, tagsSelector } from './home-tags.reducer';
import { connect } from 'pwa-helpers/connect-mixin';
import { isLoggedIn } from '../login';


@customElement('app-home')
export class HomeContainer extends connect(store)(LitElement) {

  @property() private tags: string[] = [];
  @property() private tagsIsLoading = false;
  @property() private isLoggedIn = false;

  createRenderRoot() {
    return this;
  }

  protected render() {
    return html`
      <div class="home-page">
        ${!this.isLoggedIn ?
          html`<app-home-banner token="testtoken" appName="conduit"></app-home-banner>` : ''
        }
        <div class="container page">
          <div class="row">
            <div class="col-md-9">
              <app-home-feed-navigation></app-home-feed-navigation>
              <app-article-list></app-article-list>
            </div>
            <div class="col-md-3">
              <div class="sidebar">
                <app-home-tags .tags=${this.tags} .isLoading=${this.tagsIsLoading}></app-home-tags>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  stateChanged(state: RootState) {
    const tagsState: TagsState | undefined = tagsSelector(state);

    if (!tagsState) { return; }
    this.tags = tagsState.tags;
    tagsState.isFetching ? this.tagsIsLoading = true : this.tagsIsLoading = false;

    this.isLoggedIn = isLoggedIn(state);
  }
}

