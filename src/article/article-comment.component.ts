import { customElement, html, LitElement, property } from 'lit-element'
import { Comment } from '../models/comment.model'

@customElement('app-article-comment')
export class AppArticleCommentComponent extends LitElement {
  @property() comment: Comment | undefined
  @property() isOwner = false

  createRenderRoot() {
    return this
  }

  protected render() {
    if (this.comment !== undefined) {
      return html`
        <div class="card">
          <div class="card-block">
            <p class="card-text">
              ${this.comment.body}
            </p>
          </div>
          <div class="card-footer">
            <a
              class="comment-author"
              href=${`/profile/${this.comment.author.username}`}
            >
              <img
                src=${this.comment.author.image}
                class="comment-author-img"
              />
            </a>
            &nbsp;
            <a
              class="comment-author"
              href=${`/profile/${this.comment.author.username}`}
            >
              ${this.comment.author.username}
            </a>
            <span class="date-posted">${this.comment.createdAt}</span>
            <span class="mod-options" ?hidden=${!this.isOwner}>
              <i class="ion-trash-a" @click="${this.deleteClicked}"></i>
            </span>
          </div>
        </div>
      `
    } else {
      return
    }
  }

  deleteClicked() {
    const event = new CustomEvent('delete-comment')
    this.dispatchEvent(event)
  }
}
