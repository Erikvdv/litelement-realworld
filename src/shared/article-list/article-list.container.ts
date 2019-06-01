import { LitElement, html, property, customElement } from 'lit-element';
import { Article } from '../../models';
import './article-list-article-preview.component';
import { repeat } from 'lit-html/directives/repeat.js';
import { connect } from 'pwa-helpers/connect-mixin';
import { store, RootState } from '../../store';
import { articleListStateSelector, pageCountSelector } from './article-list.reducer';
import { articleListSetPage } from './article-list.actions';


@customElement('app-article-list')
export class AppArticleListContainer extends connect(store)(LitElement) {
  @property() private articleList: Article[] = [];
  @property() private pageCount = 0;
  @property() private activePage = 0;
  @property() private pageSize = 0;

  createRenderRoot() {
    return this;
  }

  protected render() {
    return html`
        ${repeat(this.articleList, (article) => html`
        <app-article-list-article-preview .article=${article}></app-article-list-article-preview>
        `)
      }
      <app-article-list-pagination
        .pageCount=${this.pageCount}
        .activePage=${this.activePage}
        @page-selected="${(e: any) => { this.setPage(e.detail.page, this.pageSize); }}">
      </app-article-list-pagination>
      `;
  }

  stateChanged(state: RootState) {

    const articleListState = articleListStateSelector(state);
    if (!articleListState) { return; }

    this.articleList = articleListState.articleList;
    this.activePage = articleListState.activePage;
    this.pageSize = articleListState.pageSize;
    this.pageCount = pageCountSelector(state);
  }

  setPage(page: number, pageSize: number) {
    store.dispatch(articleListSetPage(page, pageSize));
  }

}
