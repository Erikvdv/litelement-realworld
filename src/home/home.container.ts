import { html, customElement, property, LitElement } from 'lit-element';
import './home-banner.component';
import './home-tags.component';
import './home-feed-navigation.component';
import '../shared/article-list/article-list.component';
import '../shared/article-list/article-list-pagination.component';

import { fetchArticleList, articleListSetPage } from '../shared/article-list/article-list.actions';
import { store, RootState } from '../store';
import tags, { TagsState, tagsSelector } from './home-tags.reducer';
import { connect } from 'pwa-helpers/connect-mixin';
import articleList, { ArticleListState, articleListStateSelector, pageCountSelector } from '../shared/article-list/article-list.reducer';
import { Article } from '../models/article.model';
import { fetchTags } from './home-tags.actions';


store.addReducers({
  tags,
  articleList
});

@customElement('app-home')
export class AppHomeContainer extends connect(store)(LitElement) {

  @property() private tags: string[] = [];
  @property() private tagsIsLoading = false;
  @property() private articleList: Article[] = [];
  @property() private pageCount = 0;
  @property() private activePage = 0;
  @property() private pageSize = 0;

  createRenderRoot() {
    return this;
  }

  protected render() {
    return html`
      <div class="home-page">
        <app-home-banner token="testtoken" appName="conduit"></app-home-banner>
        <div class="container page">
          <div class="row">
            <div class="col-md-9">
              <app-home-feed-navigation></app-home-feed-navigation>
              <app-article-list .articleList=${this.articleList}></app-article-list>
              <app-article-list-pagination
                .pageCount=${this.pageCount}
                .activePage=${this.activePage}
                @page-selected="${(e: any) => { this.setPage(e.detail.page, this.pageSize); }}">
              </app-article-list-pagination>
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
    const articleListState: ArticleListState | undefined = articleListStateSelector(state);

    if (!tagsState || !articleListState) { return; }

    this.tags = tagsState.tags;
    tagsState.isFetching ? this.tagsIsLoading = true : this.tagsIsLoading = false;

    this.articleList = articleListState.articleList;
    this.activePage = articleListState.activePage;
    this.pageSize = articleListState.pageSize;
    this.pageCount = pageCountSelector(state);
  }

  setPage(page: number, pageSize: number) {
    store.dispatch(articleListSetPage(page, pageSize));
  }
}

export { fetchTags, fetchArticleList };
