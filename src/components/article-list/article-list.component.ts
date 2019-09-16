import {
  LitElement,
  customElement,
  property,
  PropertyValues,
} from 'lit-element';

import { connect } from 'pwa-helpers/connect-mixin';
import store from '../../store';
import { RootState } from 'typesafe-actions';
import { ArticleListQuery } from '../../models';
import { ArticleListTemplate } from './article-list.templates';
import {
  articleSetFavorite,
  articleUnsetFavorite,
  articleListSetPage,
  articleListSetQuery,
} from './article-list.actions';

@customElement('app-article-list')
export class ArticleListComponent extends connect(store)(LitElement) {
  @property({ attribute: false }) articleListQuery: ArticleListQuery | undefined;

  @property() private state = store.getState();

  createRenderRoot() {
    return this;
  }

  protected render() {
    return ArticleListTemplate(
      this.state.articleList.isFetching,
      this.state.articleList.articleList,
      this.deleteFavorite,
      this.markFavorite,
      Math.ceil(
        this.state.articleList.articleCount / this.state.articleList.pageSize,
      ),
      this.state.articleList.activePage,
      this.selectPage,
    );
  }

  protected firstupdated() {
    if (this.articleListQuery) {
      store.dispatch(articleListSetQuery(this.articleListQuery));
    }
  }

  protected updated(changedProps: PropertyValues) {
    if (changedProps.has('articleListQuery') && this.articleListQuery) {
      store.dispatch(articleListSetQuery(this.articleListQuery));
    }
  }

  stateChanged(state: RootState) {
    this.state = state;
  }

  deleteFavorite = (slug: string) => {
    store.dispatch(articleUnsetFavorite.request(slug));
  }

  markFavorite = (slug: string) => {
    store.dispatch(articleSetFavorite.request(slug));
  }

  selectPage = (page: number) => {
    store.dispatch(articleListSetPage(page));
  }
}
