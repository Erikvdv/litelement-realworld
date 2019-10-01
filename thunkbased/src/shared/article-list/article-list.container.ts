import { LitElement, html, property, customElement, PropertyValues } from 'lit-element';
import { Article, ArticleListQuery } from '../../models';
import './article-list-article-preview.component';
import { repeat } from 'lit-html/directives/repeat.js';
import { connect } from 'pwa-helpers/connect-mixin';
import { store, RootState } from '../../store';
import { articleListStateSelector, pageCountSelector } from './article-list.reducer';
import { articleListSetPage, fetchArticleList, setFavorite, deleteFavorite } from './article-list.actions';
import { getToken } from '../../login';


@customElement('app-article-list')
export class ArticleListContainer extends connect(store)(LitElement) {
  @property() articleListQuery: ArticleListQuery | undefined;
  @property() private articleList: Article[] = [];
  @property() private pageCount = 0;
  @property() private activePage = 0;
  @property() private token = '';

  createRenderRoot() {
    return this;
  }

  protected render() {
    return html`
        ${repeat(this.articleList, (article) => html`
        <app-article-list-article-preview
          .article=${article}
          @mark-favorite=${(e: any) => { this.markFavorite(e.detail.slug); }}
          @delete-favorite=${(e: any) => { this.deleteFavorite(e.detail.slug); }}
        ></app-article-list-article-preview>
        `)
      }
      <app-article-list-pagination
        .pageCount=${this.pageCount}
        .activePage=${this.activePage}
        @page-selected="${(e: any) => { this.setPage(e.detail.page); }}">
      </app-article-list-pagination>
      `;
  }

  protected firstupdated() {
    store.dispatch(fetchArticleList(this.articleListQuery, this.token));
  }

  protected updated(changedProps: PropertyValues) {
    if (changedProps.has('articleListQuery')) {
      store.dispatch(fetchArticleList(this.articleListQuery, this.token));
    }
  }


  stateChanged(state: RootState) {
    const articleListState = articleListStateSelector(state);
    if (!articleListState) { return; }
    this.token = getToken(state);
    this.articleList = articleListState.articleList;
    this.activePage = articleListState.activePage;
    this.pageCount = pageCountSelector(state);
  }

  queryChanged = () => {
    store.dispatch(fetchArticleList(this.articleListQuery, this.token));
  }

  setPage(page: number) {
    store.dispatch(articleListSetPage(page, this.articleListQuery, this.token));
  }

  markFavorite(slug: string) {
    store.dispatch(setFavorite(slug, this.token));
  }

  deleteFavorite(slug: string) {
    store.dispatch(deleteFavorite(slug, this.token));
  }

}
