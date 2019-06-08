import { html, customElement, LitElement, property, PropertyValues } from 'lit-element';
import { store, RootState } from '../store';
import { connect } from 'pwa-helpers/connect-mixin';
import { articleStateSelector } from './article.reducer';
import { Article } from '../models';
import './article-meta.component';
import { repeat } from 'lit-html/directives/repeat';
import { fetchComments } from './article.actions';
import { RequestStatus } from '../models/request-status.model';




@customElement('app-article')
export class ArticleContainer extends connect(store)(LitElement) {

  @property() private article: Article | undefined;
  @property() private articleIsLoading = false;
  @property() private comments: Comment[] = [];

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
          <div class="row">
            <div class="col-xs-12 col-md-8 offset-md-2">


              ${this.comments.map((comment: Comment) => {
                  return html`
                    <app-article-comment .comment=${comment}></app-article-comment>
                  `;
                })}

            </div>
          </div>
        </div>
        </div>

    `;
  }

  stateChanged(state: RootState) {
    const articleState = articleStateSelector(state);

    if (!articleState) { return; }
    articleState.articleRequestStatus === RequestStatus.fetching ? this.articleIsLoading = true : this.articleIsLoading = false;
    articleState.article ? this.article = articleState.article : this.article = undefined;

    articleState.comments ? this.comments = articleState.comments : this.comments = [];

  }

  protected firstUpdated() {
    if (this.article) { store.dispatch(fetchComments(this.article.slug)); }

  }

  protected updated(changedProps: PropertyValues) {
    if (changedProps.has('article')) {
      if (this.article) { store.dispatch(fetchComments(this.article.slug)); }
    }
  }
}
