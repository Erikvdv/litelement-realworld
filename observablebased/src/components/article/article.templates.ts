import { html } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { Article, Errors } from '../../models';
import * as marked from 'marked';
import { Comment } from '../../models/comment.model';
import { User } from '../../models/user.model';
import { RequestStatus } from '../../models/request-status.model';

const CommentTemplate = (
  comment: Comment,
  isOwner: boolean,
  deleteComment: (comment: Comment) => void,
) => html`
  <div class="card">
    <div class="card-block">
      <p class="card-text">
        ${comment.body}
      </p>
    </div>
    <div class="card-footer">
      <a class="comment-author" href=${`/profile/${comment.author.username}`}>
        <img src=${comment.author.image} class="comment-author-img" />
      </a>
      &nbsp;
      <a class="comment-author" href=${`/profile/${comment.author.username}`}>
        ${comment.author.username}
      </a>
      <span class="date-posted">${comment.createdAt}</span>
      <span class="mod-options" ?hidden=${!isOwner}>
        <i
          class="ion-trash-a"
          @click="${(ev: Event) => {
            ev.preventDefault();
            deleteComment(comment);
          }}"
        ></i>
      </span>
    </div>
  </div>
`;

const ArticleOwnerActionsTemplate = (
  articleSlug: string,
  deleteArticle: (slug: string) => void,
) => {
  return html`
    <span>
      <a class="btn btn-sm btn-outline-secondary" href="/editor/${articleSlug}">
        <i class="ion-edit"></i> Edit Article
      </a>
      <button
        @click="${() => {
          deleteArticle(articleSlug);
        }}"
        class="btn btn-sm btn-outline-danger"
      >
        <i class="ion-trash-a"></i> Delete Article
      </button>
    </span>
  `;
};

const NotArticleOwnerActionsTemplate = (
  article: Article,
  toggleFavorite: () => void,
) => html`
  <span>
    <button
      class="btn btn-sm action-btn ${article.author.following
        ? 'btn-secondary'
        : 'btn-outline-secondary'}"
      @click=${() => toggleFavorite()}
    >
      <i class="ion-plus-round"></i>
      &nbsp; ${article.author.following ? 'Unfollow' : 'Follow'}
      ${article.author.username}
    </button>
    <button
      class="btn btn-sm ${article.favorited
        ? 'btn-primary'
        : 'btn-outline-primary'}"
      @click=${() => toggleFavorite()}
    >
      <i class="ion-heart"></i> ${article.favorited ? 'Unfavorite' : 'Favorite'}
      Article
      <span class="counter">(${article.favoritesCount})</span>
    </button>
  </span>
`;

const ArticleMetaTemplate = (
  article: Article,
  isOwner: boolean,
  toggleFavorite: () => void,
  deleteArticle: (slug: string) => void,
) => html`
  <div class="article-meta">
    <a href=${`/@${article.author.username}`}>
      <img src=${article.author.image} alt=${article.author.username} />
    </a>
    <div class="info">
      <a href=${`/@${article.author.username}`} class="author">
        ${article.author.username}
      </a>
      <span class="date">
        ${new Date(article.createdAt).toDateString()}
      </span>
    </div>
    ${isOwner
      ? ArticleOwnerActionsTemplate(article.slug, deleteArticle)
      : NotArticleOwnerActionsTemplate(article, toggleFavorite)}
  </div>
`;

const PostCommentBoxTemplate = (
  addCommentStatus: RequestStatus,
  newCommentUpdated: (comment: string) => void,
  submitComment: (comment: string) => void,
  newComment: string,
  user?: User,
  errors?: Errors,
) => {
  if (user) {
    return html`
      <div>
        ${errors
          ? html`
              <app-list-errors .errors=${errors}
                ><app-list-errors></app-list-errors
              ></app-list-errors>
            `
          : ``}
        <form class="card comment-form">
          <fieldset ?disabled=${addCommentStatus === RequestStatus.fetching}>
            <div class="card-block">
              <textarea
                class="form-control"
                placeholder="Write a comment..."
                .value=${newComment}
                rows="3"
                @keyup="${(ev: KeyboardEvent) => {
                  newCommentUpdated((<HTMLInputElement>ev.target).value);
                }}"
              >
${newComment}</textarea
              >
            </div>
            <div class="card-footer">
              <img src="${user.image}" class="comment-author-img" />
              <button
                class="btn btn-sm btn-primary"
                type="submit"
                @click="${(ev: Event) => {
                  ev.preventDefault();
                  submitComment(newComment);
                }}"
              >
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
        <a href="/login"> Sign in </a> or <a href="/register">sign up</a> to add
        comments on this article.
      </div>
    `;
  }
};

export const ArticleTemplate = (
  article: Article,
  isOwner: boolean,
  comments: Comment[],
  addCommentStatus: RequestStatus,
  toggleFavorite: () => void,
  toggleFollowing: () => void,
  deleteArticle: (slug: string) => void,
  deleteComment: (comment: Comment) => void,
  newCommentUpdated: (comment: string) => void,
  newComment: string,
  submitComment: (comment: string) => void,
  user?: User,
) => html`
  <div class="article-page">
    <div class="banner">
      <div class="container">
        <h1>${article.title}</h1>
        ${ArticleMetaTemplate(article, isOwner, toggleFavorite, deleteArticle)}
        <app-article-meta
          .article=${article}
          .isOwner=${isOwner}
          @toggle-favorite="${() => {
            toggleFavorite();
          }}"
          @toggle-following="${() => {
            toggleFollowing();
          }}"
          @delarticle="${() => {
            deleteArticle(article.slug);
          }}"
        ></app-article-meta>
      </div>
    </div>
    <div class="container page">
      <div class="row article-content">
        <div class="col-md-12">
          <div>
            ${unsafeHTML(
              marked(article.body, {
                sanitize: true,
              }),
            )}
          </div>
          <ul class="tag-list">
            ${article.tagList.map(
              (tag: string) => html`
                <li class="tag-default tag-pill tag-outline">
                  ${tag}
                </li>
              `,
            )}
          </ul>
        </div>
      </div>
      <hr />
      <div class="article-actions">
        ${ArticleMetaTemplate(article, isOwner, toggleFavorite, deleteArticle)}
      </div>
      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          ${PostCommentBoxTemplate(
            addCommentStatus,
            newCommentUpdated,
            submitComment,
            newComment,
            user,
            undefined,
          )}
          ${comments.map((comment: Comment) =>
            CommentTemplate(
              comment,
              comment.author.username === (user ? user.username : undefined),
              deleteComment,
            ),
          )}
        </div>
      </div>
    </div>
  </div>
`;
