import { html, customElement, LitElement, property, PropertyValues } from 'lit-element';
import { store, RootState } from '../store';
import { connect } from 'pwa-helpers/connect-mixin';
import { articleStateSelector } from './article.reducer';
import { Article, Errors } from '../models';
import './article-meta.component';
import { repeat } from 'lit-html/directives/repeat';
import { fetchComments, deleteComment, addComment } from './article.actions';
import { RequestStatus } from '../models/request-status.model';
import { userName, getToken, getUser } from '../login';
import { Comment } from '../models/comment.model';
import { User } from '../models/user.model';




@customElement('app-article')
export class ArticleContainer extends connect(store)(LitElement) {

  @property() private article: Article | undefined;
  @property() private articleIsLoading = false;
  @property() private comments: Comment[] = [];
  @property() private userName = '';
  @property() private token = '';
  @property() private user: User | undefined;
  @property() private newComment = '';
  @property() private errors?: Errors;
  @property() private addCommentStatus = RequestStatus.notStarted;


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
                ${this.PostCommentBox(this.user)}
                ${this.comments.map((comment: Comment) => {
                return html`
                  <app-article-comment
                    .comment=${comment}
                    .isOwner=${(this.userName === comment.author.username)}
                    @delete-comment="${() => this.deleteComment(this.article!.slug, comment.id, this.token)}">
                  </app-article-comment>
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
    articleState.errors ? this.errors = articleState.errors : this.errors = undefined;
    this.addCommentStatus = articleState.addCommentRequestStatus;
    this.user = getUser(state);
    this.userName = userName(state);
    this.token = getToken(state);
  }

  protected firstUpdated() {
    if (this.article) { store.dispatch(fetchComments(this.article.slug)); }

  }

  protected updated(changedProps: PropertyValues) {
    if (changedProps.has('article')) {
      if (this.article) { store.dispatch(fetchComments(this.article.slug)); }
    }
  }

  deleteComment(articleId: string, commentId: number, token: string) {
    store.dispatch(deleteComment(articleId, commentId, token));
  }

  PostCommentBox = (user?: User) => {
    if (user) {
      return html`
        <div>
          ${this.errors ? html`<app-list-errors .errors=${this.errors} ><app-list-errors>` : ``}
          <form class="card comment-form">
            <fieldset ?disabled=${this.addCommentStatus === RequestStatus.fetching}>
              <div class="card-block">
                <textarea class="form-control" placeholder="Write a comment..." .value=${this.newComment}
                  rows="3"
                  @keyup="${(ev: KeyboardEvent) => {
                        this.newComment = (<HTMLInputElement>ev.target).value;
                      }}"
                  >${this.newComment}</textarea>
              </div>
              <div class="card-footer">
                <img src="${user.image}" class="comment-author-img" />
                <button class="btn btn-sm btn-primary" type="submit"
                  @click="${(ev: Event) => {
                        ev.preventDefault();
                        this.submitComment(this.article!.slug, this.newComment, this.token);
                        } }">
                  Post Comment
                </button>
              </div>
            </fieldset>
          </form>
        </div>
        `;
    } else {
      return html`
        <div>
          <a href="/login" > Sign in </a> or <a href="/register">sign up</a > to add comments on this article.
        </div>
      `;
    }
  }

  submitComment(articleSlug: string, commentBody: string, token: string) {
    store.dispatch(addComment(articleSlug, commentBody, token));
    this.newComment = '';
  }

}
