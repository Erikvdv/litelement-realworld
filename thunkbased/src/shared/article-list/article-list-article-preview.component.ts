import { LitElement, html, property, customElement } from 'lit-element';
import { Article } from '../../models';
import { repeat } from 'lit-html/directives/repeat';

@customElement('app-article-list-article-preview')
export class ArticleListArticlePreviewComponent extends LitElement {
    @property() article: Article | undefined;

    createRenderRoot() {
        return this;
    }

    protected render() {
        if (this.article !== undefined) {
            return html`
                <div class="article-preview">
                    ${this.ArticleMeta(this.article)}
                    ${this.ArticleSummary(this.article)}
                </div>
            `;
        } else {
            return;
        }
    }

    ArticleMeta = (article: Article) => {
        return html`
            <div class="article-meta">
                <a href="${`/profile/=${article.author.username}`}">
                    <img
                        src=${article.author.image}
                        alt=${article.author.username}
                    />
                </a>

                <div class="info">
                    <a
                        class="author"
                        href="${`/profile/=${article.author.username}`}"
                    >
                        ${article.author.username}
                    </a>
                    <span class="date">
                        ${new Date(article.createdAt).toDateString()}
                    </span>
                </div>

                <div class="pull-xs-right">
                    <button
                        class=${`btn btn-sm
                ${article.favorited ? `btn-primary` : `btn-outline-primary`}
                `}
                        @click=${() =>
                            article.favorited
                                ? this.deleteFavorite(article.slug)
                                : this.markFavorite(article.slug)}
                    >
                        <i class="ion-heart"></i> ${article.favoritesCount}
                    </button>
                </div>
            </div>
        `;
    }

    ArticleSummary = (article: Article) => {
        return html`
            <a href="/article/${article.slug}" class="preview-link">
                <h1>${article.title}</h1>
                <p>${article.description}</p>
                <span>Read more...</span>
                <ul class="tag-list">
                    ${repeat(
                        article.tagList,
                        tag => html`
                            <li class="tag-default tag-pill tag-outline">
                                ${tag}
                            </li>
                        `,
                    )}
                </ul>
            </a>
        `;
    }

    markFavorite(slug: string) {
        const event = new CustomEvent('mark-favorite', {
            detail: {
                slug: slug,
            },
        });
        this.dispatchEvent(event);
    }

    deleteFavorite(slug: string) {
        const event = new CustomEvent('delete-favorite', {
            detail: {
                slug: slug,
            },
        });
        this.dispatchEvent(event);
    }
}
