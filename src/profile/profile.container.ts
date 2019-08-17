import { html, customElement, property, LitElement } from 'lit-element';

import { store, RootState } from '../store';
import { connect } from 'pwa-helpers/connect-mixin';
import { userName, getToken } from '../login';
import { profileStateSelector } from './profile.reducer';
import { Errors, Profile, ArticleListQuery, ArticleListType } from '../models';
import { fetchArticleList } from '../shared/article-list/article-list.actions';

export enum SelectedTab {
  my = 'MY',
  favorited = 'FAVORITED',
}

export interface FeedNavigationInput {
  selectedTab: SelectedTab;
}

@customElement('app-profile')
export class ProfileContainer extends connect(store)(LitElement) {
  @property() private userName = '';
  @property() private errors?: Errors;
  @property() private profile?: Profile;
  @property() private token = '';
  @property({ attribute: false }) input: FeedNavigationInput = {
    selectedTab: SelectedTab.my,
  };
  @property() private articleListQuery: ArticleListQuery = {
    type: ArticleListType.my,
    filters: { limit: 10, offset: 0, author: this.userName },
  };

  createRenderRoot() {
    return this;
  }

  protected render() {
    if (this.profile === undefined) {
      return;
    }
    return html`
      <div class="profile-page">
        <div class="user-info">
          <div class="container">
            <div class="row">
              <div class="col-xs-12 col-md-10 offset-md-1">
                ${this.errors
                  ? html`
                      <app-list-errors .errors=${this.errors}>
                      </app-list-errors>
                    `
                  : ``}
                <img src=${this.profile.image} class="user-img" />
                <h4>${this.profile.username}</h4>
                <p>${this.profile.bio}</p>

                <app-follow-button
                  ?hidden=${this.profile.username === this.userName}
                  [profile]="profile"
                  (toggle)="onToggleFollowing($event)"
                >
                </app-follow-button>
                <a
                  href="/settings"
                  ?hidden=${this.profile.username !== this.userName}
                  class="btn btn-sm btn-outline-secondary action-btn"
                >
                  <i class="ion-gear-a"></i> Edit Profile Settings
                </a>
              </div>
            </div>
          </div>
        </div>

        <div class="container">
          <div class="row">
            <div class="col-xs-12 col-md-10 offset-md-1">
              <div class="articles-toggle">
                <ul class="nav nav-pills outline-active">
                  ${this.MyPostsTab(this.input)}
                  ${this.FavoritedPostsTab(this.input)}
                </ul>
              </div>

              <app-article-list
                .articleListQuery=${this.articleListQuery}
              ></app-article-list>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  MyPostsTab = (input: FeedNavigationInput) => {
    return html`
      <li class="nav-item" @click=${() => this.tabSelected(SelectedTab.my)}>
        <a
          href="/profile/${this.userName}"
          class=${input.selectedTab === SelectedTab.my
            ? 'nav-link active'
            : 'nav-link'}
        >
          My Posts
        </a>
      </li>
    `;
  }

  FavoritedPostsTab = (input: FeedNavigationInput) => {
    return html`
      <li
        class="nav-item"
        @click=${() => this.tabSelected(SelectedTab.favorited)}
      >
        <a
          href="/profile/${this.userName}"
          class=${input.selectedTab === SelectedTab.favorited
            ? 'nav-link active'
            : 'nav-link'}
        >
          Favorited Posts
        </a>
      </li>
    `;
  }

  tabSelected(tab: SelectedTab) {
    this.input = {
      ...this.input,
      selectedTab: tab,
    };
    tab === SelectedTab.favorited
      ? (this.articleListQuery.filters.favorited = this.userName)
      : (this.articleListQuery.filters.favorited = undefined);
    tab === SelectedTab.my
      ? (this.articleListQuery.filters.author = this.userName)
      : (this.articleListQuery.filters.author = undefined);
    this.articleListQuery.filters.offset = 0;
    store.dispatch(fetchArticleList(this.articleListQuery, this.token));
  }

  stateChanged(state: RootState) {
    const profileState = profileStateSelector(state);
    if (!profileState) {
      return;
    }
    if (profileState.profile !== undefined) {
      this.profile = profileState.profile;
    }
    this.errors = profileState.errors;
    this.userName = userName(state);
    this.token = getToken(state);
  }

  protected firstUpdated() {
    this.articleListQuery.filters.author = this.userName;
    store.dispatch(fetchArticleList(this.articleListQuery, this.token));
  }
}
