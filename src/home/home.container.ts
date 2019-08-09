import { html, customElement, property, LitElement } from 'lit-element';

import { store, RootState } from '../store';
import { HomeState, homeSelector } from './home.reducer';
import { connect } from 'pwa-helpers/connect-mixin';
import { isLoggedIn } from '../login';
import { ArticleListQuery, ArticleListType } from '../models';
import { fetchTags, setArticlesQuery, navigateArticles } from './home.actions';
import { HomeFeedNavigationInput, SelectedTab } from './home-feed-navigation.component';


@customElement('app-home')
export class HomeContainer extends connect(store)(LitElement) {

  @property() private tags: string[] = [];
  @property() private articleListQuery: ArticleListQuery | undefined;
  @property() private tagsIsLoading = false;
  @property() private isLoggedIn = false;
  @property() private feedNavigationInput: HomeFeedNavigationInput = {
    isLoggedIn: false, selectedTab: SelectedTab.all};

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
              <app-home-feed-navigation
                .input=${this.feedNavigationInput}
                @tab-selected=${(e: any) => { this.setTab(e.detail.tab); }}>
              </app-home-feed-navigation>
              <app-article-list .articleListQuery=${this.articleListQuery}></app-article-list>
            </div>
            <div class="col-md-3">
              <div class="sidebar">
                <app-home-tags
                  .tags=${this.tags}
                  .isLoading=${this.tagsIsLoading}
                  @tag-selected=${(e: any) => { this.setTag(e.detail.tag); }}
                  ></app-home-tags>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  protected firstUpdated() {
    store.dispatch(fetchTags());
    this.articleListQuery = {
      type: this.isLoggedIn ? ArticleListType.feed : ArticleListType.all,
      filters: {limit: 10, offset: 0}
    };
    store.dispatch(navigateArticles(this.articleListQuery, this.isLoggedIn));
  }

  connectedCallback() {
    super.connectedCallback();
    this.articleListQuery = undefined;
  }

  stateChanged(state: RootState) {
    const homeState: HomeState | undefined = homeSelector(state);

    if (!homeState) { return; }
    this.tags = homeState.tags;
    this.articleListQuery = homeState.articleListQuery;
    homeState.isFetching ? this.tagsIsLoading = true : this.tagsIsLoading = false;

    this.isLoggedIn = isLoggedIn(state);

    this.feedNavigationInput = {
      isLoggedIn: this.isLoggedIn,
      selectedTab: this.articleListQuery.type === ArticleListType.feed ?
                SelectedTab.feed : this.articleListQuery.filters.tag ? SelectedTab.tag : SelectedTab.all,
      selectedTag: this.articleListQuery.filters.tag
    };
  }

  setTag(tag: string) {
    store.dispatch(setArticlesQuery({
      type: ArticleListType.all,
      filters: {limit: 10, offset: 0, tag: tag}
    }));
  }

  setTab(tab: string) {
    store.dispatch(navigateArticles({
      type: (tab === SelectedTab.feed) ? ArticleListType.feed : ArticleListType.all,
      filters: {limit: 10, offset: 0}
    }, this.isLoggedIn));
  }
}

