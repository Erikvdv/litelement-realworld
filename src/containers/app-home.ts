import { html, customElement, property, LitElement } from 'lit-element';
import '../components/home/home-banner';
import '../components/home/home-tags';
import '../components/home/home-feed-navigation';
import '../components/articles/app-article-list';
import '../components/articles/article-list-pagination';

import { fetchArticleList, articleListSetPage } from '../actions/article-list';
import { store, RootState } from '../store';
import tags, { TagsState, tagsSelector } from '../reducers/tags';
import { connect } from 'pwa-helpers/connect-mixin';
import articleList, { ArticleListState, articleListStateSelector, pageCountSelector } from '../reducers/article-list';
import { Article } from '../models/article.model';
import { fetchTags } from '../actions/tags';


store.addReducers({
  tags,
  articleList
});

@customElement('app-home')
export class AppHome extends connect(store)(LitElement) {

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
        <home-banner token="testtoken" appName="conduit"></home-banner>
        <div class="container page">
          <div class="row">
            <div class="col-md-9">
              <home-feed-navigation></home-feed-navigation>
              <app-article-list .articleList=${this.articleList}></app-article-list>
              <app-article-list-pagination
                .pageCount=${this.pageCount}
                .activePage=${this.activePage}
                @page-selected="${(e: any) => { this.setPage(e.detail.page, this.pageSize); }}">
              </app-article-list-pagination>
            </div>
            <div class="col-md-3">
              <div class="sidebar">
                <home-tags .tags=${this.tags} .isLoading=${this.tagsIsLoading}></home-tags>
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
