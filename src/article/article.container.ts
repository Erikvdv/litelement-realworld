import { html, customElement, LitElement, property } from 'lit-element';


import { store, RootState } from '../store';
import { connect } from 'pwa-helpers/connect-mixin';
// import { Article } from '../models/article.model';
import article, { articleStateSelector } from './article.reducer';
import { fetchArticle } from './article.actions';
import { Article } from '../models';
import './article-meta.component';
import { repeat } from 'lit-html/directives/repeat';


store.addReducers({
  article
});

@customElement('app-article')
export class AppArticleContainer extends connect(store)(LitElement) {

  @property({ type: Object }) private article: Article | undefined;
  @property({ type: Object }) private articleIsLoading = false;


  createRenderRoot() {
    return this;
  }

  protected render() {
    if (this.article === undefined) {
      return;
    }
    if (this.articleIsLoading) {
      return;
    }
    return html`
        <div class="article-page">
          <div class="banner">
            <div class="container">
              <h1>${this.article.title}</h1>
              <app-article-meta .article=${this.article}></app-article-meta>
            </div>
          </div>
        </div>
        <div class="container page">
          <div class="row article-content">
            <div class="col-md-12">
              <div>${this.article.body}</div>
              <ul class="tag-list">
                ${repeat(this.article.tagList, (tag: string) => html`
                <li class="tag-default tag-pill tag-outline">${tag}</li>
                `)}
              </ul>
            </div>
          </div>
          <hr />
          <div class="article-actions">
            <app-article-meta .article=${this.article}></app-article-meta>
          </div>
        </div>
    `;
  }


  stateChanged(state: RootState) {
    if (!state) { return; }
    const articleState = articleStateSelector(state);

    if (!articleState) { return; }

    articleState.isFetching ? this.articleIsLoading = true : this.articleIsLoading = false;
    articleState.article ? this.article = articleState.article : this.article = undefined;

  }
}

export { fetchArticle };
