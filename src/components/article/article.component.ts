import { LitElement, customElement, property, html } from 'lit-element';
import { connect } from 'pwa-helpers/connect-mixin';
import store from '../../store';
import { RootState } from 'typesafe-actions';
import { ArticleTemplate } from './article.templates';
import { deleteArticle, deleteComment, addComment } from './article.actions';
import { Comment } from '../../models/comment.model';
import { Article } from '../../models';
import { User } from '../../models/user.model';

@customElement('app-article')
export class ArticleComponent extends connect(store)(LitElement) {
  @property() private state = store.getState();
  @property() private newComment = '';

  createRenderRoot() {
    return this;
  }

  protected render() {
    if (this.state.article.selectedArticle) {
      return ArticleTemplate(
        this.state.article.selectedArticle,
        this.isArticleOwner(
          this.state.article.selectedArticle,
          this.state.user.user,
        ),
        this.state.article.comments,
        this.state.article.addCommentStatus,
        this.toggleFavorite,
        this.toggleFollowing,
        this.deleteArticle,
        this.deleteComment,
        this.newCommentUpdated,
        this.newComment,
        this.submitComment,
        this.state.user.user,
      );
    } else {
      return html`
        loading...
      `;
    }
  }

  stateChanged(state: RootState) {
    this.state = state;
  }

  toggleFavorite = () => {};

  toggleFollowing = () => {};

  deleteArticle = (slug: string) => {
    store.dispatch(deleteArticle.request(slug));
  }

  deleteComment = (comment: Comment) => {
    store.dispatch(deleteComment.request(comment.id));
  }

  newCommentUpdated = (comment: string) => {
    this.newComment = comment;
  }

  submitComment = (comment: string) => {
    store.dispatch(addComment.request(comment));
  }

  isArticleOwner(article?: Article, user?: User) {
    if (article === undefined || user === undefined) {
      return false;
    }
    return article.author.username === user.username ? true : false;
  }
}
