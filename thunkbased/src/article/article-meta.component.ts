import { customElement, html, LitElement, property } from 'lit-element';
import { Article } from '../models';

@customElement('app-article-meta')
export class AppArticleMetaComponent extends LitElement {
  @property({ attribute: false }) article?: Article;
  @property({ attribute: false }) isOwner = false;

  createRenderRoot() {
    return this;
  }

  protected render() {
    if (this.article !== undefined) {
      return html`
        <div class="article-meta">
          <a href=${`/@${this.article.author.username}`}>
            <img
              src=${this.article.author.image}
              alt=${this.article.author.username}
            />
          </a>

          <div class="info">
            <a href=${`/@${this.article.author.username}`} class="author">
              ${this.article.author.username}
            </a>
            <span class="date">
              ${new Date(this.article.createdAt).toDateString()}
            </span>
          </div>
          ${this.isOwner
            ? this.ArticleOwnerActions(this.article.slug)
            : this.NotArticleOwnerActions(this.article)}
        </div>
      `;
    } else {
      return;
    }
  }

  ArticleOwnerActions = (articleSlug: string) => {
    return html`
      <span>
        <a
          class="btn btn-sm btn-outline-secondary"
          href="/editor/${articleSlug}"
        >
          <i class="ion-edit"></i> Edit Article
        </a>

        <button
          @click="${this.deleteClicked}"
          class="btn btn-sm btn-outline-danger"
        >
          <i class="ion-trash-a"></i> Delete Article
        </button>
      </span>
    `;
  }

  NotArticleOwnerActions = (article: Article) => {
    return html`
      <span>
        <button
          class="btn btn-sm action-btn ${article.author.following
            ? 'btn-secondary'
            : 'btn-outline-secondary'}"
          @click=${this.toggleFollowing}
        >
          <i class="ion-plus-round"></i>
          &nbsp; ${article.author.following ? 'Unfollow' : 'Follow'}
          ${article.author.username}
        </button>
        <button
          class="btn btn-sm ${article.favorited
            ? 'btn-primary'
            : 'btn-outline-primary'}"
          @click=${this.toggleFavorite}
        >
          <i class="ion-heart"></i> ${article.favorited
            ? 'Unfavorite'
            : 'Favorite'}
          Article
          <span class="counter">(${article.favoritesCount})</span>
        </button>
      </span>
    `;
  }

  deleteClicked() {
    const event = new CustomEvent('delarticle');
    this.dispatchEvent(event);
  }

  toggleFollowing() {
    const event = new CustomEvent('toggle-following');
    this.dispatchEvent(event);
  }

  toggleFavorite() {
    const event = new CustomEvent('toggle-favorite');
    this.dispatchEvent(event);
  }
}
