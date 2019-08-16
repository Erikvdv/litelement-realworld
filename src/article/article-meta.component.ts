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
                        <a
                            href=${`/@${this.article.author.username}`}
                            class="author"
                        >
                            ${this.article.author.username}
                        </a>
                        <span class="date">
                            ${new Date(this.article.createdAt).toDateString()}
                        </span>
                    </div>
                    ${this.isOwner
                        ? this.ArticleOwnerActions(this.article.slug)
                        : this.NotArticleOwnerActions()}
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

    NotArticleOwnerActions = () => {
        return html`
            <span>
                <app-follow-button
                    [profile]="article.author"
                    (toggle)="onToggleFollowing($event)"
                >
                </app-follow-button>

                <app-favorite-button
                    [article]="article"
                    (toggle)="onToggleFavorite($event)"
                >
                    ${this.article!.favorited ? 'Unfavorite' : 'Favorite'}
                    Article
                    <span class="counter"
                        >(${this.article!.favoritesCount})</span
                    >
                </app-favorite-button>
            </span>
        `;
    }

    deleteClicked() {
        console.log('delete clicked');
        const event = new CustomEvent('delarticle');
        this.dispatchEvent(event);
    }
}
